from django.db.models.signals import pre_save
from django.dispatch import receiver
from slugify import slugify

from server.apps.shop.models import Product


class ProductUpdateListener:

    @classmethod
    def register(cls):
        pre_save.connect(cls.create_product_slug, sender=Product)

    @receiver(pre_save, sender=Product)
    def create_product_slug(sender, instance, **kwargs):
        if not instance.slug:
            slug = slugify(instance.title)
            unique_slug = slug
            num = 1
            while Product.objects.filter(slug=unique_slug).exists():
                unique_slug = f"{slug}-{num}"
                num += 1
            instance.slug = unique_slug
