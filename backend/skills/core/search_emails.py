"""
Skill: search_emails
Purpose: Full-text search across the user's synced Gmail emails, filterable
         by sender, date range, priority, topic. Used by the assistant as a
         tool to answer questions about the inbox.
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

from sqlalchemy import or_, select

from skills.base import SkillResult

SKILL_ID = "search_emails"
DESCRIPTION = "Rechercher dans les emails synchronisés de l'utilisateur"
TASK_TYPE = "email_query"

TOOL_SCHEMA = {
    "name": "search_emails",
    "description": (
        "Recherche dans les emails Gmail synchronisés de l'utilisateur. "
        "La recherche porte sur les champs expéditeur, sujet, aperçu, corps et résumé IA. "
        "Filtres optionnels: expéditeur exact, période, priorité, topic. "
        "Retourne la liste des emails correspondants avec leurs métadonnées clés "
        "(id, expéditeur, sujet, date, priorité, topic, aperçu). "
        "Le body complet n'est PAS retourné — utilise read_email(id) pour l'obtenir."
    ),
    "when_to_use": [
        "L'utilisateur pose une question sur ses emails",
        "Besoin de lister des emails par expéditeur, sujet, période",
        "Résumer les échanges avec une personne ou une entreprise",
    ],
    "when_not_to_use": [
        "Obtenir le contenu complet d'un email précis — utiliser read_email",
        "Compter rapidement des emails sans en lister le contenu — utiliser count_emails",
    ],
    "input_schema": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": (
                    "Termes à chercher dans l'expéditeur, le sujet, l'aperçu, "
                    "le corps et le résumé IA. Laisser vide pour ne filtrer que "
                    "sur les autres critères."
                ),
            },
            "from_email": {
                "type": "string",
                "description": "Filtrer sur l'adresse email exacte de l'expéditeur",
            },
            "days_back": {
                "type": "integer",
                "description": "Limiter aux emails reçus dans les N derniers jours",
                "minimum": 1,
                "maximum": 365,
            },
            "priority": {
                "type": "string",
                "enum": ["urgent", "important", "normal", "low"],
                "description": "Filtrer sur la priorité classée par l'IA",
            },
            "topic": {
                "type": "string",
                "description": "Filtrer sur le topic (catégorie métier) classé par l'IA",
            },
            "limit": {
                "type": "integer",
                "description": "Nombre maximum d'emails à retourner (défaut 20, max 100)",
                "minimum": 1,
                "maximum": 100,
            },
        },
        "required": [],
    },
}


async def execute(input_data: dict, context: Any) -> SkillResult:
    try:
        from db.models import Email

        db = _get_db(context)
        if db is None:
            return SkillResult(success=False, data=None, error="No DB session in context")

        query_text = (input_data.get("query") or "").strip()
        from_email = (input_data.get("from_email") or "").strip()
        days_back = input_data.get("days_back")
        priority = input_data.get("priority")
        topic = input_data.get("topic")
        limit = min(int(input_data.get("limit") or 20), 100)

        stmt = select(Email)

        if query_text:
            like = f"%{query_text}%"
            stmt = stmt.where(
                or_(
                    Email.from_email.ilike(like),
                    Email.from_name.ilike(like),
                    Email.subject.ilike(like),
                    Email.snippet.ilike(like),
                    Email.body_plain.ilike(like),
                    Email.ai_summary.ilike(like),
                )
            )

        if from_email:
            stmt = stmt.where(Email.from_email.ilike(f"%{from_email}%"))

        if days_back:
            cutoff = datetime.now(timezone.utc) - timedelta(days=int(days_back))
            stmt = stmt.where(Email.received_at >= cutoff)

        if priority:
            stmt = stmt.where(Email.priority == priority)

        if topic:
            stmt = stmt.where(Email.topic == topic)

        stmt = stmt.order_by(Email.received_at.desc()).limit(limit)

        result = await db.execute(stmt)
        emails = result.scalars().all()

        rows = [
            {
                "id": e.id,
                "from_email": e.from_email,
                "from_name": e.from_name,
                "subject": e.subject,
                "snippet": e.snippet,
                "received_at": e.received_at.isoformat() if e.received_at else None,
                "priority": e.priority,
                "topic": e.topic,
                "ai_summary": e.ai_summary,
                "is_read": e.is_read,
            }
            for e in emails
        ]

        return SkillResult(
            success=True,
            data={"emails": rows, "count": len(rows)},
        )

    except Exception as exc:
        return SkillResult(success=False, data=None, error=f"search_emails failed: {exc}")


def _get_db(context: Any):
    if context is None:
        return None
    if isinstance(context, dict):
        return context.get("db")
    return getattr(context, "db", None)
