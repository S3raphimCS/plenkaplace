from django.core.management import BaseCommand

from server.apps.shop.enums import DeliveryMethodChoices
from server.apps.shop.models import DeliveryMethod


class Command(BaseCommand):
    """Команда для создания типов продуктов."""

    help = 'Создание типов продуктов.'

    def handle(self, *args, **options):
        """Консольный вывод."""
        for value, label in DeliveryMethodChoices.choices:
            product_type, created = DeliveryMethod.objects.get_or_create(title=label)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Объект метода доставки {product_type.title} создан'))

        self.stdout.write(self.style.SUCCESS('Создание объектов методов доставки завершено.'))
