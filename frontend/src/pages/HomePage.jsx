import { useState, useEffect, useCallback, useRef } from "react";
import { getBooks, createBook, updateBook, deleteBook } from "../api/booksApi";
import BookTable from "../components/BookTable";
import BookForm from "../components/BookForm";
import BookDetail from "../components/BookDetail";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [filters, setFilters] = useState({ title: "", author: "" });
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modals
  const [showAddForm, setShowAddForm] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [detailBookId, setDetailBookId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const searchTimer = useRef(null);

  const fetchBooks = useCallback(async (page, size, f) => {
    setLoading(true);
    setError("");
    try {
      const res = await getBooks(page, size, f.title, f.author);
      const data = res.data;
      setBooks(data.results || []);
      setTotalCount(data.count || 0);
      setTotalPages(Math.ceil((data.count || 0) / size) || 1);
    } catch (err) {
      setError("Failed to load books. Make sure the Django server is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks(currentPage, pageSize, filters);
  }, [currentPage, pageSize]);

  // Debounce filter searches
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setCurrentPage(1);
      fetchBooks(1, pageSize, newFilters);
    }, 400);
  };

  const handleFilterReset = () => {
    const empty = { title: "", author: "" };
    setFilters(empty);
    setCurrentPage(1);
    fetchBooks(1, pageSize, empty);
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  // Add
  const handleAdd = async (payload) => {
    setFormLoading(true);
    try {
      await createBook(payload);
      setShowAddForm(false);
      showSuccess("✅ Book added successfully!");
      fetchBooks(currentPage, pageSize, filters);
    } catch (err) {
      setError("Failed to add book.");
    } finally {
      setFormLoading(false);
    }
  };

  // Edit
  const handleEdit = async (payload) => {
    setFormLoading(true);
    try {
      await updateBook(editBook.id, payload);
      setEditBook(null);
      showSuccess("✅ Book updated successfully!");
      fetchBooks(currentPage, pageSize, filters);
    } catch (err) {
      setError("Failed to update book.");
    } finally {
      setFormLoading(false);
    }
  };

  // Delete
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteBook(deleteTarget.id);
      setDeleteTarget(null);
      showSuccess("✅ Book deleted successfully!");
      const newTotal = totalCount - 1;
      const newPages = Math.ceil(newTotal / pageSize) || 1;
      const safePage = Math.min(currentPage, newPages);
      if (safePage !== currentPage) {
        setCurrentPage(safePage);
      } else {
        fetchBooks(currentPage, pageSize, filters);
      }
    } catch (err) {
      setError("Failed to delete book.");
      setDeleteTarget(null);
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-brand">
            <span className="brand-icon">📚</span>
            <div>
              <h1 className="brand-title">BookShelf</h1>
              <p className="brand-subtitle">Book Management System</p>
            </div>
          </div>
          <button
            id="add-book-btn"
            className="btn btn-primary btn-add"
            onClick={() => setShowAddForm(true)}
          >
            <span>+</span> Add Book
          </button>
        </div>
      </header>

      <main className="main-content">
        {/* Notifications */}
        {success && <div className="alert alert-success">{success}</div>}
        {error && (
          <div className="alert alert-error">
            {error}
            <button className="alert-close" onClick={() => setError("")}>✕</button>
          </div>
        )}

        {/* Filter Bar */}
        <div className="section-card">
          <FilterBar filters={filters} onChange={handleFilterChange} onReset={handleFilterReset} />
        </div>

        {/* Books Table */}
        <div className="section-card table-section">
          <div className="section-header">
            <h2 className="section-title">Book List</h2>
            {loading && <div className="loading-dots"><span></span><span></span><span></span></div>}
          </div>

          {loading && books.length === 0 ? (
            <div className="loading-spinner"><div className="spinner"></div></div>
          ) : (
            <BookTable
              books={books}
              onDetail={(id) => setDetailBookId(id)}
              onEdit={(book) => setEditBook(book)}
              onDelete={(book) => setDeleteTarget(book)}
            />
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalCount={totalCount}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </main>

      {/* Add Form Modal */}
      {showAddForm && (
        <BookForm
          book={null}
          onSubmit={handleAdd}
          onClose={() => setShowAddForm(false)}
          isLoading={formLoading}
        />
      )}

      {/* Edit Form Modal */}
      {editBook && (
        <BookForm
          book={editBook}
          onSubmit={handleEdit}
          onClose={() => setEditBook(null)}
          isLoading={formLoading}
        />
      )}

      {/* Detail Modal */}
      {detailBookId && (
        <BookDetail
          bookId={detailBookId}
          onClose={() => setDetailBookId(null)}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="modal-card modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">🗑️ Confirm Delete</h2>
            </div>
            <div className="confirm-body">
              <p className="confirm-text">Are you sure you want to delete:</p>
              <p className="confirm-book-title">"{deleteTarget.title}"</p>
              <p className="confirm-subtext">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDeleteConfirm}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
