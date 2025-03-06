from django.db.models import manager


class NewsPublishedManager(manager.Manager):
    """Менеджер вывода только опубликованных новостей."""

    def get_queryset(self):
        return super().get_queryset().filter(is_published=True)
