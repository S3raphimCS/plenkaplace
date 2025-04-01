from django.db.models import TextChoices


class FlatPageTitle(TextChoices):
    """Значения заголовка простой страницы."""

    PRIVACY_POLICY = "privacy_policy", "Политика конфиденциальности"
    USER_AGREEMENT = "user_agreement", "Пользовательское соглашение"
