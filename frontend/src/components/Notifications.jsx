export default function Notifications({ success, error, onDismissError }) {
  return (
    <>
      {success && <div className="alert alert-success">{success}</div>}
      {error && (
        <div className="alert alert-error">
          {error}
          <button className="alert-close" onClick={onDismissError}>
            ✕
          </button>
        </div>
      )}
    </>
  );
}
