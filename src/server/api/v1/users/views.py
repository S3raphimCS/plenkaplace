from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from server.api.v1.users.serializers import ContactRequestSerializer
from server.apps.users.models import ContactRequest


class ContactRequestViewSet(mixins.CreateModelMixin, GenericViewSet):
    """Вьюсет создания заявки на обратную связь."""
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer

    def get_throttles(self):
        if self.action == 'create':
            self.throttle_scope = 'contact_request.create'
        return super().get_throttles()
