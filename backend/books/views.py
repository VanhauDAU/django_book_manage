from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from django_filters import rest_framework as filters

from books.models import Book
from books.serializers import BookListSerializer, BookSerializer


class BookFilter(filters.FilterSet):
    title = filters.CharFilter(field_name="title", lookup_expr="icontains")
    author = filters.CharFilter(field_name="author", lookup_expr="icontains")

    class Meta:
        model = Book
        fields = ["title", "author"]


class BookViewSet(ModelViewSet):
    queryset = Book.objects.all().order_by("id")
    serializer_class = BookSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    filterset_class = BookFilter
    search_fields = ["title", "author"]


@csrf_exempt
def home(request):
    if request.method == "GET":
        data_queryset = Book.objects.all()
        data_books = BookListSerializer(data_queryset, many=True)
        data = {
            "books": data_books.data,
            "message": "Hello, welcome!"
        }
        return JsonResponse(data)
