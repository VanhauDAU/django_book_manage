from rest_framework.pagination import PageNumberPagination


class BookPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100

    def get_page_size(self, request):
        page_size = request.query_params.get(self.page_size_query_param)

        if page_size in ["20", "100"]:
            return int(page_size)

        return self.page_size
