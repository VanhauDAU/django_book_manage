import { useCallback, useEffect, useRef, useState } from "react";

import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
} from "../api/booksApi";

const EMPTY_FILTERS = { title: "", author: "" };

export default function useBookManagement() {
  const [books, setBooks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [detailBookId, setDetailBookId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const searchTimer = useRef(null);
  const successTimer = useRef(null);

  const fetchBooks = useCallback(async (page, size, activeFilters) => {
    setLoading(true);
    setError("");

    try {
      const response = await getBooks(
        page,
        size,
        activeFilters.title,
        activeFilters.author,
      );
      const data = response.data;
      const count = data.count || 0;

      setBooks(data.results || []);
      setTotalCount(count);
      setTotalPages(Math.ceil(count / size) || 1);
    } catch {
      setError("Failed to load books. Make sure the Django server is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks(currentPage, pageSize, filters);
  }, [currentPage, pageSize, fetchBooks]);

  useEffect(
    () => () => {
      clearTimeout(searchTimer.current);
      clearTimeout(successTimer.current);
    },
    [],
  );

  const showSuccess = useCallback((message) => {
    clearTimeout(successTimer.current);
    setSuccess(message);
    successTimer.current = setTimeout(() => setSuccess(""), 3000);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setCurrentPage(1);
      fetchBooks(1, pageSize, newFilters);
    }, 400);
  };

  const handleFilterReset = () => {
    clearTimeout(searchTimer.current);
    setFilters(EMPTY_FILTERS);
    setCurrentPage(1);
    fetchBooks(1, pageSize, EMPTY_FILTERS);
  };

  const handleAdd = async (payload) => {
    setFormLoading(true);
    setError("");

    try {
      await createBook(payload);
      setShowAddForm(false);
      showSuccess("Book added successfully!");
      await fetchBooks(currentPage, pageSize, filters);
    } catch {
      setError("Failed to add book.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = async (payload) => {
    if (!editBook) return;

    setFormLoading(true);
    setError("");

    try {
      await updateBook(editBook.id, payload);
      setEditBook(null);
      showSuccess("Book updated successfully!");
      await fetchBooks(currentPage, pageSize, filters);
    } catch {
      setError("Failed to update book.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await deleteBook(deleteTarget.id);
      setDeleteTarget(null);
      showSuccess("Book deleted successfully!");

      const remainingCount = totalCount - 1;
      const remainingPages = Math.ceil(remainingCount / pageSize) || 1;
      const nextPage = Math.min(currentPage, remainingPages);

      if (nextPage !== currentPage) {
        setCurrentPage(nextPage);
      } else {
        await fetchBooks(currentPage, pageSize, filters);
      }
    } catch {
      setError("Failed to delete book.");
      setDeleteTarget(null);
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return {
    books,
    totalCount,
    totalPages,
    currentPage,
    pageSize,
    filters,
    loading,
    formLoading,
    error,
    success,
    showAddForm,
    editBook,
    detailBookId,
    deleteTarget,
    setCurrentPage,
    setError,
    setShowAddForm,
    setEditBook,
    setDetailBookId,
    setDeleteTarget,
    handleFilterChange,
    handleFilterReset,
    handleAdd,
    handleEdit,
    handleDeleteConfirm,
    handlePageSizeChange,
  };
}
