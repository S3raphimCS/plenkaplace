from django.contrib.auth.models import AbstractUser
from django.db import models

from server.apps.users.enums import ContactRequestPreferenceChoices
from server.apps.users.managers import UserManager


class BaseUser(AbstractUser):
    """Модель Администратора"""

    objects = UserManager()

    username = None
    email = models.EmailField(verbose_name='Email', unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'Администратор'
        verbose_name_plural = 'Администраторы'


class ContactRequest(models.Model):
    name = models.CharField(max_length=50, verbose_name="Имя")
    contact_data = models.CharField(max_length=120, verbose_name="Контактные данные")
    message = models.TextField(verbose_name="Сообщение")
    contact_preference = models.CharField(max_length=30, verbose_name="Способ связи",
                                          choices=ContactRequestPreferenceChoices.choices)
    email = models.EmailField(verbose_name="Электронная почта")
    is_processed = models.BooleanField(default=False, verbose_name="Обработана")

    def __str__(self):
        return f"{self.email}"

    class Meta:
        verbose_name = "Заявка обратной связи"
        verbose_name_plural = "Заявки обратной связи"


class BotUser(models.Model):
    """Модель пользователя бота"""

    telegram_id = models.IntegerField(verbose_name="Telegram ID", unique=True)
    username = models.CharField(verbose_name="Username", max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(verbose_name="Дата и время создания", auto_now_add=True)

    def __str__(self):
        return f"{self.telegram_id}"

    class Meta:
        verbose_name = "Пользователь бота"
        verbose_name_plural = "Пользователи бота"