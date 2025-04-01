from ckeditor.fields import RichTextField
from django.db import models

from server.apps.articles.managers import ArticlePublishedManager


class Article(models.Model):
    """Модель статьи."""

    title = models.CharField(max_length=255, verbose_name="Название статьи")
    text = RichTextField(verbose_name="Текст статьи")
    preview = models.ImageField(verbose_name="Превью", upload_to='articles/previews/%Y/%m/%d', null=True, blank=True)
    is_published = models.BooleanField(default=False, verbose_name="Статус статьи")
    published_date = models.DateTimeField(verbose_name="Дата публикации статьи", auto_now_add=True, null=True, blank=True)

    objects = models.Manager()
    published_objects = ArticlePublishedManager()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"


class ArticleImage(models.Model):
    """Модель изображения статьи."""

    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="images", verbose_name="Статья")
    file = models.ImageField(upload_to="articles/images/%Y/%m/%d", verbose_name="Изображение")

    def __str__(self):
        return f"Изображение для статьи {self.article.title}"

    class Meta:
        verbose_name = "Изображение для статьи"
        verbose_name_plural = "Изображения для статьи"
