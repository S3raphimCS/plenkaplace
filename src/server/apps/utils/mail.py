from typing import Optional

from django.conf import settings
from django.core.mail import EmailMultiAlternatives

from server.apps.utils.shortcuts import put_context_to_template


class Email(EmailMultiAlternatives):
    def __init__(
            self,
            subject: str = "",
            body: str = "",
            to: Optional[list[str] | tuple[str]] = None,
            from_email: Optional[str] = None,
            reply_to: Optional[list[str] | tuple[str]] = None,
            connection=None,
            *,
            template: Optional[str] = None,
            context: Optional[dict] = None,
    ):
        if not to:
            to = [settings.EMAIL_HOST_USER]

        assert (template and context) or (
            not template and not context
        ), "Должны быть переданы оба параметра (template и context) или оба параметра должны отсутствовать"

        if template:
            body = put_context_to_template(template, context)

        super().__init__(
            subject,
            body,
            from_email,
            to,
            connection,
            reply_to,
        )

    def send(self, fail_silently: bool = False) -> int:
        """Обёртка над базовой send(). Для будущего расширения"""

        sent_sum = super().send(fail_silently=fail_silently)
        return sent_sum
