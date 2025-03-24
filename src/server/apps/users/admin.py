from django.contrib import admin

from server.apps.users.models import ContactRequest


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'contact_data', 'contact_preference', 'is_processed')
    list_editable = ('is_processed',)
