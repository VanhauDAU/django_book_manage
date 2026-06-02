
from django.urls import path
from books import views
from books.view_books import BookDetailAPIView, BookListCreateAPIView

urlpatterns = [
    path('home', views.home, name='home'),
    path('books/', BookListCreateAPIView.as_view(), name='book-list-create'),
    path('books/<int:pk>/', BookDetailAPIView.as_view(), name='book-detail'),
]
