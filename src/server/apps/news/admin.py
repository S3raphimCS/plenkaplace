from django.contrib import admin

from server.apps.news.models import News, NewsImage


class NewsImageInline(admin.TabularInline):
    model = NewsImage
    extra = 0


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    inlines = [NewsImageInline]
    list_display = ("title", "published_date", "is_published")
    list_editable = ("is_published",)
