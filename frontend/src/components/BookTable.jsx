export default function BookTable({ books, onDetail, onEdit, onDelete }) {
  if (!books || books.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <p className="empty-title">No books found</p>
        <p className="empty-subtitle">Try adjusting your search or add a new book.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="book-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Quantity</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id} className="table-row">
              <td className="id-cell">#{book.id}</td>
              <td className="title-cell">
                <span className="book-title">{book.title}</span>
              </td>
              <td className="author-cell">
                <span className="author-badge">{book.author}</span>
              </td>
              <td className="price-cell">
                <span className="price-tag">${parseFloat(book.price || 0).toFixed(2)}</span>
              </td>
              <td className="qty-cell">
                <span className={`qty-badge ${book.quantity === 0 ? "out-of-stock" : ""}`}>
                  {book.quantity}
                </span>
              </td>
              <td className="actions-cell">
                <button
                  className="btn-action btn-detail"
                  onClick={() => onDetail(book.id)}
                  title="View details"
                >
                  👁 Detail
                </button>
                <button
                  className="btn-action btn-edit"
                  onClick={() => onEdit(book)}
                  title="Edit book"
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn-action btn-delete"
                  onClick={() => onDelete(book)}
                  title="Delete book"
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
