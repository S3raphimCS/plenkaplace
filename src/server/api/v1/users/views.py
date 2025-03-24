from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins

from server.api.v1.users.serializers import ContactRequestSerializer
from server.apps.users.models import ContactRequest


class ContactRequestViewSet(mixins.CreateModelMixin, GenericViewSet):
    """Вьюсет создания заявки на обратную связь."""
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
