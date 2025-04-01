from django.core.management import BaseCommand
from loguru import logger
from telebot import util

from server.bot.main import client_bot


class Command(BaseCommand):
    """Команда для запуска пулинга телеграм бота."""

    help = 'Запуск телеграм бота для PlenkaPlace'

    def handle(self, *args, **options):
        try:
            logger.info('Бот для PlenkaPlace запущен')
            client_bot.infinity_polling(allowed_updates=util.update_types)
        except KeyboardInterrupt:
            logger.error('Бот для PlenkaPlace остановлен')
        except Exception as exc:
            logger.error('Ошибка запуска бота для PlenkaPlace: {exc}'.format(exc=exc))
