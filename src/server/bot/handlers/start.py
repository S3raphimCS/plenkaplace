from django.conf import settings
from telebot import TeleBot
from telebot.types import Message

from server.bot.utils import messages
from server.bot.utils.error_handler import ErrorHandler
from server.bot.utils.keyboards import KeyboardConstructor


@ErrorHandler.create()
def client_start(message: Message, bot: TeleBot):
    """Обработка команды '/start'."""
    tg_chat_id = message.chat.id
    keyboard = KeyboardConstructor().create_webapp_keyboard({"Наш сайт": settings.SITE_URL})
    return bot.send_message(
        chat_id=tg_chat_id,
        text=messages.CLIENT_START_BOT,
        reply_markup=keyboard,
    )
