import httpClient from "./httpClient";

/**
 * Fetch paginated books with optional filters.
 * API: GET /api/books/?page=1&page_size=20&title=...&author=...
 */
export const getBooks = (page = 1, pageSize = 20, title = "", author = "") => {
  const params = { page, page_size: pageSize };
  if (title) params.title = title;
  if (author) params.author = author;
  return httpClient.get("/books/", { params });
};

export const getBook = (id) => httpClient.get(`/books/${id}/`);

export const createBook = (data) => httpClient.post("/books/", data);

export const updateBook = (id, data) => httpClient.put(`/books/${id}/`, data);

export const patchBook = (id, data) => httpClient.patch(`/books/${id}/`, data);

export const deleteBook = (id) => httpClient.delete(`/books/${id}/`);
