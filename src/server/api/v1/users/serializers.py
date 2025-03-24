from rest_framework import serializers

from server.apps.users.models import ContactRequest


class ContactRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = ContactRequest
        exclude = ("is_processed",)
