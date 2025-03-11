from rest_framework.routers import DefaultRouter

from server.api.v1.articles.views import ArticleSiteViewSet


router = DefaultRouter()
router.register('', ArticleSiteViewSet, basename='articles')
