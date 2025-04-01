from django.db import models


class ContactRequestPreferenceChoices(models.TextChoices):
    """Предпочтения для связи с пользователем по заявке обратной связи."""

    TELEGRAM = "telegram", "Telegram"
    WHATSAPP = "whatsapp", "WhatsApp"
    EMAIL = "email", "Email"
