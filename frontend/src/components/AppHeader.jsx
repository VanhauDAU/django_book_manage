export default function AppHeader({ onAddBook }) {
  return (
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
          onClick={onAddBook}
        >
          <span>+</span> Add Book
        </button>
      </div>
    </header>
  );
}
