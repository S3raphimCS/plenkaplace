from rest_framework.throttling import UserRateThrottle


class SustainedRateThrottle(UserRateThrottle):
    scope = 'sustained'

    def parse_rate(self, rate):
        """Ограничение на количество запросов в секунду (2 запроса в 5 минут)."""
        return 2, 300
