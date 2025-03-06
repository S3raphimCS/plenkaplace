from django.db.models import manager


class ArticlePublishedManager(manager.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_published=True)
