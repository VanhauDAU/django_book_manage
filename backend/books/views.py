from django.http import JsonResponse
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from books.models import Book
from books.pagination import BookPagination
from books.serializers import BookListSerializer, BookSerializer


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def book_list_create(request):
    if request.method == "GET":
        books = Book.objects.all().order_by("id")
        title = request.query_params.get("title")
        author = request.query_params.get("author")
        search = request.query_params.get("search")

        if title:
            books = books.filter(title__icontains=title)

        if author:
            books = books.filter(author__icontains=author)

        if search:
            books = books.filter(
                Q(title__icontains=search) | Q(author__icontains=search)
            )

        paginator = BookPagination()
        page = paginator.paginate_queryset(books, request)
        serializer = BookListSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)

    serializer = BookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "PATCH", "DELETE"])
@permission_classes([AllowAny])
def book_detail(request, pk):
    book = get_object_or_404(Book, pk=pk)

    if request.method == "GET":
        serializer = BookSerializer(book)
        return Response(serializer.data)

    if request.method in ["PUT", "PATCH"]:
        serializer = BookSerializer(
            book,
            data=request.data,
            partial=request.method == "PATCH",
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    book.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


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
