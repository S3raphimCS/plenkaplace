from django.db import models

from server.apps.news import managers


class News(models.Model):
    """Модель новостей."""

    published_date = models.DateTimeField(verbose_name="Дата публикации", null=True, blank=True)
    is_published = models.BooleanField(default=False)
    title = models.CharField(max_length=255, verbose_name="Заголовок")
    preview = models.ImageField(upload_to='news/previews/%Y/%m/%d', null=True, blank=True)
    text = models.TextField(verbose_name="Текст новости")

    tags = models.TextField(blank=True, null=True)

    objects = models.Manager()
    published_objects = managers.NewsPublishedManager()

    def __str__(self):
        return f"Новость: {self.title}"

    class Meta:
        verbose_name = "Новость"
        verbose_name_plural = "Новости"


class NewsImage(models.Model):
    """Модель изображений новости."""

    news = models.ForeignKey(News, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='news/images/%Y/%m/%d')

    def __str__(self):
        return f"Фотография для новости: {self.news}"

    class Meta:
        verbose_name = "Изображение для новости"
        verbose_name_plural = "Изображения для новости"
