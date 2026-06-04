from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from books.models import Book
from books.serializers import BookListSerializer, BookSerializer

# Create your views here.


class BookViewSet(ModelViewSet):
    queryset = Book.objects.all().order_by("id")
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]


@csrf_exempt
def home(request):
    if request.method == "GET":
        data_template = [
                {"id": 1, "title": "Book 1", "author": "Author 1"},
                {"id": 2, "title": "Book 2", "author": "Author 2"},
                {"id": 3, "title": "Book 3", "author": "Author 3"},
            ]
        
        data_queryset = Book.objects.all()
        # print(data_queryset.query)
        data_books = BookListSerializer(data_queryset, many=True)
        data = {
            "books": data_books.data,
            "message": "Hello, welcome!"
        }

        return JsonResponse(data)
