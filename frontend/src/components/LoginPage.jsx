import { useState } from "react";

const EMPTY_FORM = { username: "", password: "" };

export default function LoginPage({ error, isLoading, onLogin }) {
  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({
      username: form.username.trim(),
      password: form.password,
    });
  };

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-brand">
          <span className="brand-icon">📚</span>
          <div>
            <h1 className="brand-title">BookShelf</h1>
            <p className="brand-subtitle">Book Management System</p>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner-sm"></span> : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}
