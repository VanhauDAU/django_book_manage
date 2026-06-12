import { useState, useEffect } from "react";

const EMPTY_FORM = { title: "", author: "", price: "", quantity: "", published_date: "" };

export default function BookForm({ book, onSubmit, onClose, isLoading }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title || "",
        author: book.author || "",
        price: book.price !== undefined ? String(book.price) : "",
        quantity: book.quantity !== undefined ? String(book.quantity) : "",
        published_date: book.published_date || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [book]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.author.trim()) e.author = "Author is required";
    if (form.price === "" || isNaN(Number(form.price))) e.price = "Valid price is required";
    if (form.quantity === "" || isNaN(Number(form.quantity))) e.quantity = "Valid quantity is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity, 10),
    };
    if (form.published_date) payload.published_date = form.published_date;
    onSubmit(payload);
  };

  const isEdit = Boolean(book);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? "✏️ Edit Book" : "➕ Add New Book"}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-row">
            <div className={`form-group ${errors.title ? "has-error" : ""}`}>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter book title..."
                autoFocus
              />
              {errors.title && <span className="error-msg">{errors.title}</span>}
            </div>

            <div className={`form-group ${errors.author ? "has-error" : ""}`}>
              <label htmlFor="author">Author</label>
              <input
                id="author"
                name="author"
                type="text"
                value={form.author}
                onChange={handleChange}
                placeholder="Enter author name..."
              />
              {errors.author && <span className="error-msg">{errors.author}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className={`form-group ${errors.price ? "has-error" : ""}`}>
              <label htmlFor="price">Price ($)</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
              />
              {errors.price && <span className="error-msg">{errors.price}</span>}
            </div>

            <div className={`form-group ${errors.quantity ? "has-error" : ""}`}>
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                value={form.quantity}
                onChange={handleChange}
                placeholder="0"
              />
              {errors.quantity && <span className="error-msg">{errors.quantity}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="published_date">Published Date <span className="optional">(optional)</span></label>
            <input
              id="published_date"
              name="published_date"
              type="date"
              value={form.published_date}
              onChange={handleChange}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? <span className="spinner-sm"></span> : isEdit ? "Save Changes" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
