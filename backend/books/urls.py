from django.urls import path

from books import views

urlpatterns = [
    path("home", views.home, name="home"),
    path("books/", views.book_list_create, name="book-list"),
    path("books/<int:pk>/", views.book_detail, name="book-detail"),
    path("logout/", views.logout, name="logout"),
]
