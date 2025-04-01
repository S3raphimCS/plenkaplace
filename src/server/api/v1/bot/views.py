import json

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from telebot.types import Update

from server.bot.main import client_bot


class ClientBotWebHookView(APIView):
    """Класс-вью обработки вебхука для бота."""

    # todo test
    def post(self, request, *args, **kwargs):
        """Принимает хук запросы."""
        json_string = request.body.decode('utf-8')
        data = json.loads(json_string)
        update = Update.de_json(data)
        client_bot.process_new_updates([update])

        return Response(status=status.HTTP_200_OK)
