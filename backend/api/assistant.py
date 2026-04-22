"""
FastAPI router: /api/assistant — chat endpoint + conversation CRUD.
"""
from __future__ import annotations

import logging
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from db.database import get_db
from db.models import AssistantConversation, AssistantMessage
from services.assistant_chat import chat as run_chat

logger = logging.getLogger(__name__)

assistant_router = APIRouter(prefix="/assistant")


class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None


@assistant_router.post("/chat")
async def chat_endpoint(
    req: ChatRequest,
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    if not req.message or not req.message.strip():
        raise HTTPException(status_code=400, detail="message is required")
    try:
        return await run_chat(db, req.message.strip(), req.conversation_id)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc))
    except Exception as exc:
        import openai

        if isinstance(exc, openai.AuthenticationError):
            raise HTTPException(
                status_code=401,
                detail="Clé OPENAI_API_KEY invalide.",
            ) from exc
        if isinstance(exc, openai.RateLimitError):
            msg = str(exc).lower()
            if "quota" in msg or "billing" in msg or "insufficient" in msg:
                raise HTTPException(
                    status_code=402,
                    detail=(
                        "Le compte OpenAI est à court de crédits. "
                        "Rechargez sur https://platform.openai.com/settings/organization/billing "
                        "puis réessayez."
                    ),
                ) from exc
            raise HTTPException(
                status_code=429,
                detail="Trop de requêtes vers OpenAI. Réessayez dans un instant.",
            ) from exc
        if isinstance(exc, openai.BadRequestError):
            raise HTTPException(status_code=400, detail=str(exc)) from exc

        logger.exception("assistant chat failed")
        raise HTTPException(status_code=500, detail=f"assistant error: {exc}") from exc


@assistant_router.get("/conversations")
async def list_conversations(db: AsyncSession = Depends(get_db)) -> list[dict]:
    stmt = select(AssistantConversation).order_by(
        AssistantConversation.updated_at.desc()
    )
    rows = (await db.execute(stmt)).scalars().all()
    return [c.to_dict() for c in rows]


@assistant_router.get("/conversations/{conversation_id}")
async def get_conversation(
    conversation_id: int, db: AsyncSession = Depends(get_db)
) -> dict:
    from sqlalchemy.orm import selectinload

    stmt = (
        select(AssistantConversation)
        .where(AssistantConversation.id == conversation_id)
        .options(selectinload(AssistantConversation.messages))
    )
    conv = (await db.execute(stmt)).scalar_one_or_none()
    if conv is None:
        raise HTTPException(status_code=404, detail="conversation not found")
    return conv.to_dict(include_messages=True)


@assistant_router.delete("/conversations/{conversation_id}")
async def delete_conversation(
    conversation_id: int, db: AsyncSession = Depends(get_db)
) -> dict:
    conv = await db.get(AssistantConversation, conversation_id)
    if conv is None:
        raise HTTPException(status_code=404, detail="conversation not found")
    await db.execute(
        delete(AssistantMessage).where(
            AssistantMessage.conversation_id == conversation_id
        )
    )
    await db.delete(conv)
    await db.commit()
    return {"ok": True}
