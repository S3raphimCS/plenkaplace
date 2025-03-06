from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from server.api.v1.flatpages.serializers import FlatPageSerializer
from server.apps.flatpages.models import FlatPage


class FlatPagesViewSet(GenericViewSet):
    """Вьюсет для получения простых страниц только для чтения."""

    queryset = FlatPage.objects.all()
    serializer_class = FlatPageSerializer
    permission_classes = (permissions.AllowAny,)
    mt_tags = ('site-flatpages',)

    @action(methods=['get'], detail=False)
    def cookie_policy(self, request, *args, **kwargs):
        """Правила использования cookie."""
        instance = self.queryset.filter(title=self.action).first()
        serializer = self.serializer_class(instance)
        return Response(status=status.HTTP_200_OK, data=serializer.data)

    @action(methods=['get'], detail=False)
    def privacy_policy(self, request, *args, **kwargs):
        """Политика конфиденциальности."""
        instance = self.queryset.filter(title=self.action).first()
        serializer = self.serializer_class(instance)
        return Response(status=status.HTTP_200_OK, data=serializer.data)

    @action(methods=['get'], detail=False)
    def user_agreement(self, request, *args, **kwargs):
        """Пользовательское соглашение."""
        instance = self.queryset.filter(title=self.action).first()
        serializer = self.serializer_class(instance)
        return Response(status=status.HTTP_200_OK, data=serializer.data)
