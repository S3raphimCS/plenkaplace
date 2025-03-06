from django.urls import include, path

from server.api.v1.articles.urls import router as articles_router
from server.api.v1.flatpages.urls import router as flatpages_router
from server.api.v1.news.urls import router as news_router
from server.api.v1.shop.urls import router as shop_router


urlpatterns = [
    path("shop/", include(shop_router.urls)),
    path("flatpages/", include(flatpages_router.urls)),
    path("articles/", include(articles_router.urls)),
    path("news/", include(news_router.urls)),
]
