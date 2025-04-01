import logging

from django.conf import settings
from telebot import TeleBot, logger
from telebot.types import WebAppInfo, MenuButtonWebApp

from server.bot.handlers.start import client_start


logger = logger
logger.setLevel(logging.DEBUG)

client_bot = TeleBot(
    settings.CLIENT_BOT_TOKEN,
    parse_mode='HTML',
)

web_app = WebAppInfo(url=settings.SITE_URL)
menu_button = MenuButtonWebApp(type="web_app", text="Сайт PlenkaPlace", web_app=web_app)
client_bot.set_chat_menu_button(menu_button=menu_button)

CLIENT_MESSAGE_HANDLERS_MAP = {
    client_start: {
        'commands': ['start'],
    },
}


def register_handlers():
    """Функция регистрации обработчиков бота."""
    for func, params in CLIENT_MESSAGE_HANDLERS_MAP.items():
        client_bot.register_message_handler(
            func,
            **params,
            pass_bot=True,
        )


register_handlers()
