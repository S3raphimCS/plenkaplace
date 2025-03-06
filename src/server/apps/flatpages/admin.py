from django.contrib import admin

from server.apps.flatpages.models import FlatPage


@admin.register(FlatPage)
class FlatPageAdmin(admin.ModelAdmin):
    pass
