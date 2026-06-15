export default function DeleteConfirmModal({ book, onConfirm, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card modal-confirm"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">🗑️ Confirm Delete</h2>
        </div>
        <div className="confirm-body">
          <p className="confirm-text">Are you sure you want to delete:</p>
          <p className="confirm-book-title">"{book.title}"</p>
          <p className="confirm-subtext">This action cannot be undone.</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
