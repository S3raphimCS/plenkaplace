from rest_framework.routers import DefaultRouter

from server.api.v1.flatpages.views import FlatPagesViewSet


router = DefaultRouter()
router.register("", FlatPagesViewSet, basename="flatpages")
