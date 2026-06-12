import { useState, useEffect } from "react";
import { getBook } from "../api/booksApi";

export default function BookDetail({ bookId, onClose }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getBook(bookId)
      .then((res) => setBook(res.data))
      .catch(() => setError("Failed to load book details."))
      .finally(() => setLoading(false));
  }, [bookId]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">📖 Book Details</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {loading && <div className="loading-spinner"><div className="spinner"></div></div>}
        {error && <div className="alert alert-error">{error}</div>}

        {book && (
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">ID</span>
              <span className="detail-value">#{book.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Title</span>
              <span className="detail-value">{book.title}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Author</span>
              <span className="detail-value">{book.author}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Price</span>
              <span className="detail-value price-tag">${parseFloat(book.price || 0).toFixed(2)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Quantity</span>
              <span className="detail-value">{book.quantity}</span>
            </div>
            {book.published_date && (
              <div className="detail-item">
                <span className="detail-label">Published</span>
                <span className="detail-value">{book.published_date}</span>
              </div>
            )}
          </div>
        )}

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
