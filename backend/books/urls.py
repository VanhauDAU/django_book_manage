from django.urls import include, path
from rest_framework.routers import DefaultRouter

from books import views

router = DefaultRouter()
router.register("books", views.BookViewSet, basename="book")

urlpatterns = [
    path('home', views.home, name='home'),
    path('', include(router.urls)),
]
