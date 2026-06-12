import axios from "axios";

const API_BASE = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

/**
 * Fetch paginated books with optional filters.
 * API: GET /api/books/?page=1&page_size=20&title=...&author=...
 */
export const getBooks = (page = 1, pageSize = 20, title = "", author = "") => {
  const params = { page, page_size: pageSize };
  if (title) params.title = title;
  if (author) params.author = author;
  return api.get("/books/", { params });
};

export const getBook = (id) => api.get(`/books/${id}/`);

export const createBook = (data) => api.post("/books/", data);

export const updateBook = (id, data) => api.put(`/books/${id}/`, data);

export const patchBook = (id, data) => api.patch(`/books/${id}/`, data);

export const deleteBook = (id) => api.delete(`/books/${id}/`);
