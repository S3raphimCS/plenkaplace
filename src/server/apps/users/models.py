from django.db import models

from server.apps.users.enums import ContactRequestPreferenceChoices


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
