import AppHeader from "../components/AppHeader";
import BookDetail from "../components/BookDetail";
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import FilterBar from "../components/FilterBar";
import Notifications from "../components/Notifications";
import Pagination from "../components/Pagination";
import useBookManagement from "../hooks/useBookManagement";

export default function HomePage({ onLogout }) {
  const bookManagement = useBookManagement();

  return (
    <div className="page-container">
      <AppHeader
        onAddBook={() => bookManagement.setShowAddForm(true)}
        onLogout={onLogout}
      />

      <main className="main-content">
        <Notifications
          success={bookManagement.success}
          error={bookManagement.error}
          onDismissError={() => bookManagement.setError("")}
        />

        <div className="section-card">
          <FilterBar
            filters={bookManagement.filters}
            onChange={bookManagement.handleFilterChange}
            onReset={bookManagement.handleFilterReset}
          />
        </div>

        <div className="section-card table-section">
          <div className="section-header">
            <h2 className="section-title">Book List</h2>
            {bookManagement.loading && (
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          {bookManagement.loading && bookManagement.books.length === 0 ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <BookTable
              books={bookManagement.books}
              onDetail={bookManagement.setDetailBookId}
              onEdit={bookManagement.setEditBook}
              onDelete={bookManagement.setDeleteTarget}
            />
          )}

          <Pagination
            currentPage={bookManagement.currentPage}
            totalPages={bookManagement.totalPages}
            pageSize={bookManagement.pageSize}
            totalCount={bookManagement.totalCount}
            onPageChange={bookManagement.setCurrentPage}
            onPageSizeChange={bookManagement.handlePageSizeChange}
          />
        </div>
      </main>

      {bookManagement.showAddForm && (
        <BookForm
          book={null}
          onSubmit={bookManagement.handleAdd}
          onClose={() => bookManagement.setShowAddForm(false)}
          isLoading={bookManagement.formLoading}
        />
      )}

      {bookManagement.editBook && (
        <BookForm
          book={bookManagement.editBook}
          onSubmit={bookManagement.handleEdit}
          onClose={() => bookManagement.setEditBook(null)}
          isLoading={bookManagement.formLoading}
        />
      )}

      {bookManagement.detailBookId && (
        <BookDetail
          bookId={bookManagement.detailBookId}
          onClose={() => bookManagement.setDetailBookId(null)}
        />
      )}

      {bookManagement.deleteTarget && (
        <DeleteConfirmModal
          book={bookManagement.deleteTarget}
          onConfirm={bookManagement.handleDeleteConfirm}
          onClose={() => bookManagement.setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
