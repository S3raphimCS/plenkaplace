from django.contrib import admin

from server.apps.news.models import News


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    pass
