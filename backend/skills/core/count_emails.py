"""
Skill: count_emails
Purpose: Fast count of emails matching filters, without loading content.
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

from sqlalchemy import func, select

from skills.base import SkillResult

SKILL_ID = "count_emails"
DESCRIPTION = "Compter les emails correspondant à des filtres"
TASK_TYPE = "email_query"

TOOL_SCHEMA = {
    "name": "count_emails",
    "description": (
        "Compte rapidement le nombre d'emails correspondant à des filtres, "
        "sans charger leur contenu. Utile pour les questions agrégées du type "
        "« combien de mails non lus », « combien d'échanges avec X cette semaine »."
    ),
    "when_to_use": [
        "Réponse à une question quantitative simple",
        "Aperçu rapide d'un volume avant recherche détaillée",
    ],
    "when_not_to_use": [
        "Obtenir la liste des emails — utiliser search_emails",
    ],
    "input_schema": {
        "type": "object",
        "properties": {
            "from_email": {"type": "string", "description": "Adresse email expéditeur"},
            "days_back": {
                "type": "integer",
                "description": "Limite aux N derniers jours",
                "minimum": 1,
                "maximum": 365,
            },
            "priority": {
                "type": "string",
                "enum": ["urgent", "important", "normal", "low"],
            },
            "topic": {"type": "string"},
            "unread_only": {
                "type": "boolean",
                "description": "Ne compter que les emails non lus",
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

        stmt = select(func.count(Email.id))

        from_email = (input_data.get("from_email") or "").strip()
        days_back = input_data.get("days_back")
        priority = input_data.get("priority")
        topic = input_data.get("topic")
        unread_only = bool(input_data.get("unread_only"))

        if from_email:
            stmt = stmt.where(Email.from_email.ilike(f"%{from_email}%"))
        if days_back:
            cutoff = datetime.now(timezone.utc) - timedelta(days=int(days_back))
            stmt = stmt.where(Email.received_at >= cutoff)
        if priority:
            stmt = stmt.where(Email.priority == priority)
        if topic:
            stmt = stmt.where(Email.topic == topic)
        if unread_only:
            stmt = stmt.where(Email.is_read.is_(False))

        total = (await db.execute(stmt)).scalar_one() or 0
        return SkillResult(success=True, data={"count": int(total)})

    except Exception as exc:
        return SkillResult(success=False, data=None, error=f"count_emails failed: {exc}")


def _get_db(context: Any):
    if context is None:
        return None
    if isinstance(context, dict):
        return context.get("db")
    return getattr(context, "db", None)
