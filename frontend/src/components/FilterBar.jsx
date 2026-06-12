export default function FilterBar({ filters, onChange, onReset }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  const hasFilters = filters.title || filters.author;

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <div className="filter-input-wrapper">
          <span className="filter-icon">🔍</span>
          <input
            id="filter-title"
            name="title"
            type="text"
            value={filters.title}
            onChange={handleChange}
            placeholder="Search by title..."
            className="filter-input"
          />
        </div>
        <div className="filter-input-wrapper">
          <span className="filter-icon">✍️</span>
          <input
            id="filter-author"
            name="author"
            type="text"
            value={filters.author}
            onChange={handleChange}
            placeholder="Search by author..."
            className="filter-input"
          />
        </div>
      </div>
      {hasFilters && (
        <button className="btn-reset" onClick={onReset} title="Clear all filters">
          ✕ Clear
        </button>
      )}
    </div>
  );
}
