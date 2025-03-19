from ckeditor.fields import RichTextField
from django.db import models
from rest_framework.exceptions import ValidationError

from server.apps.flatpages.enums import FlatPageTitle


class FlatPage(models.Model):
    """Модель плоской страницы."""

    title = models.CharField(choices=FlatPageTitle.choices, unique=True, max_length=255, verbose_name="Обозначение")
    description = models.CharField(
        max_length=255, verbose_name="Наименование"
    )
    text = RichTextField(null=True, verbose_name="Текст")

    class Meta:
        verbose_name = "Плоская страница"
        verbose_name_plural = "Плоские страницы"

    def __str__(self):
        return FlatPageTitle(self.title).label

    def save(self, *args, **kwargs):
        if not self.pk and self.title not in FlatPageTitle.values:
            raise ValidationError("Можно создавать записи только с определенными значениями title")
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        raise ValidationError("Удаление записей FlatPage запрещено")
