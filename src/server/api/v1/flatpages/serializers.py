from rest_framework import serializers

from server.apps.flatpages.models import FlatPage


class FlatPageSerializer(serializers.ModelSerializer):
    """Сериализатор простых страниц только для чтения."""

    class Meta:
        model = FlatPage
        fields = '__all__'
