from lib2to3.fixes.fix_input import context

from django.db.models.signals import post_save
from django.dispatch import receiver

from server.apps.shop.models import Order


class IncreaseMaxEmployeeRequestListener:

    @classmethod
    def register(cls):
        post_save.connect(cls.mail_after_order_creating, sender=Order)


    @staticmethod
    @receiver(post_save, sender=Order)
    def mail_after_order_creating(sender, instance, **kwargs):
        """Отправляет уведомление на почту, если создан новый заказ."""
        if instance.pk is None:
            return
        try:
            old_instance = sender.objects.get(pk=instance.pk)
        except sender.DoesNotExist:
            context = {
                'order_id': instance.id,
                'first_name': instance.first_name,
                'phone': instance.phone,
                'email': instance.email,
                'address': instance.address,
                'comment': instance.comment,
            }
            return

