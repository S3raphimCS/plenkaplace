from rest_framework import routers

from server.api.v1.users.views import ContactRequestViewSet


router = routers.DefaultRouter()
router.register("", ContactRequestViewSet, basename="contact")
