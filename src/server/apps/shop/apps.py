from django.apps import AppConfig


class ShopConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'server.apps.shop'
    verbose_name = 'Магазин'

    def ready(self):
        from server.apps.shop.signals import ProductUpdateListener
        ProductUpdateListener.register()
