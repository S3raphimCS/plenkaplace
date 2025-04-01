from typing import Any, Optional

from django.template import loader


def put_context_to_template(
    template_name: str, context: Optional[dict[str, Any]] = None
) -> str:
    """Добавляет в шаблон переменные контекста"""

    content = loader.render_to_string(template_name, context)
    return content
