from django_filters import rest_framework as filters

from server.apps.shop.models import Product


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class ProductFilter(filters.FilterSet):
    title = CharFilterInFilter(
        field_name="title",
        lookup_expr="in"
    )
    brand = CharFilterInFilter(
        field_name="brand__id",
        lookup_expr="in",
    )
    product_type = filters.CharFilter(field_name="product_type__title")
    is_available_for_purchasing = filters.BooleanFilter(field_name="is_available_for_purchasing")
    price = filters.RangeFilter(field_name="price")
    is_preorder = filters.BooleanFilter(field_name="is_preorder")

    class Meta:
        model = Product
        fields = ("title", "product_type", "is_available_for_purchasing", "is_preorder",  "price")
