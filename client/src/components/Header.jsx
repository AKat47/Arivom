export default function Header({ dbStatus, total, current }) {
  const statusLabel = {
    loading: 'இணைக்கிறது…',
    ok:      'MongoDB இணைந்தது',
    error:   'சர்வர் கிடைக்கவில்லை',
  }

  return (
    <div className="header">
      <div className="header-left">
        <h1>என் கற்றல் அட்டைகள்</h1>
        <p>My Learning Cards</p>
      </div>

      <div className="header-right">
        <div className="db-status">
          <span className={`status-dot ${dbStatus}`} />
          {statusLabel[dbStatus]}
        </div>
        {total > 0 && (
          <div className="progress">{current + 1} / {total}</div>
        )}
      </div>
    </div>
  )
}
