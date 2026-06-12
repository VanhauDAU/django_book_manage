export default function Pagination({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange, totalCount }) {
  const pages = Math.max(1, totalPages);

  return (
    <div className="pagination">
      <div className="pagination-info">
        <span className="total-count">
          {totalCount > 0 ? `${totalCount} books total` : "No books"}
        </span>
        <span className="page-size-label">Show:</span>
        <select
          id="page-size-select"
          className="page-size-select"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          <option value={20}>20 / page</option>
          <option value={100}>100 / page</option>
        </select>
      </div>

      <div className="pagination-controls">
        <button
          id="prev-page-btn"
          className="page-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          ‹ Previous
        </button>

        <div className="page-indicator">
          <span className="current-page">{currentPage}</span>
          <span className="page-sep">/</span>
          <span className="total-pages">{pages}</span>
        </div>

        <button
          id="next-page-btn"
          className="page-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= pages}
        >
          Next ›
        </button>
      </div>
    </div>
  );
}
