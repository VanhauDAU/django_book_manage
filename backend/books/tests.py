from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from books.models import Book


class BookAPITestCase(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="book_user",
            password="test_password",
        )
        self.client.force_authenticate(user=self.user)
        self.book = Book.objects.create(
            title="Clean Code",
            author="Robert C. Martin",
            published_date="2008-08-01",
        )

    def test_book_list_allows_unauthenticated_requests(self):
        self.client.force_authenticate(user=None)

        response = self.client.get(reverse("book-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_book_list(self):
        response = self.client.get(reverse("book-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["title"], self.book.title)

    def test_filter_books_by_title(self):
        Book.objects.create(title="Django for APIs", author="William S. Vincent")

        response = self.client.get(reverse("book-list"), {"title": "django"})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["title"], "Django for APIs")

    def test_search_books_by_author(self):
        response = self.client.get(reverse("book-list"), {"search": "martin"})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)

    def test_create_book(self):
        payload = {
            "title": "Django for APIs",
            "author": "William S. Vincent",
            "published_date": "2022-03-15",
        }

        response = self.client.post(reverse("book-list"), payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Book.objects.count(), 2)
        self.assertEqual(response.data["title"], payload["title"])

    def test_get_book_detail(self):
        response = self.client.get(reverse("book-detail", kwargs={"pk": self.book.pk}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["author"], self.book.author)

    def test_update_book(self):
        payload = {
            "title": "Clean Architecture",
            "author": "Robert C. Martin",
            "published_date": "2017-09-20",
        }

        response = self.client.put(
            reverse("book-detail", kwargs={"pk": self.book.pk}),
            payload,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.book.refresh_from_db()
        self.assertEqual(self.book.title, payload["title"])
        self.assertEqual(str(self.book.published_date), payload["published_date"])

    def test_patch_book(self):
        response = self.client.patch(
            reverse("book-detail", kwargs={"pk": self.book.pk}),
            {"quantity": 5},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.book.refresh_from_db()
        self.assertEqual(self.book.quantity, 5)

    def test_delete_book(self):
        response = self.client.delete(reverse("book-detail", kwargs={"pk": self.book.pk}))

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Book.objects.filter(pk=self.book.pk).exists())
