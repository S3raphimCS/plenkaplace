from django.urls import path

from server.api.v1.bot.views import ClientBotWebHookView


urlpatterns = [
    path('client-webhook/', ClientBotWebHookView.as_view()),
]
