from django.contrib import admin

from server.apps.articles.models import Article, ArticleImage


class ArticleImageInline(admin.TabularInline):
    model = ArticleImage
    extra = 0


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    inlines = [ArticleImageInline]


@admin.register(ArticleImage)
class ArticleImageAdmin(admin.ModelAdmin):
    pass
