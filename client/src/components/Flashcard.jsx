import { useState, useEffect } from 'react'

export default function Flashcard({ cards, currentIndex, dbStatus, onDelete }) {
  const [flipped, setFlipped] = useState(false)

  // Unflip whenever the visible card changes
  useEffect(() => { setFlipped(false) }, [currentIndex, cards])

  if (dbStatus === 'loading') {
    return (
      <div className="card-area">
        <div className="flashcard" style={{ cursor: 'default' }}>
          <div className="card-face">
            <div className="card-state">
              <div className="spinner" />
              <span>ஏற்றுகிறது…</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (dbStatus === 'error') {
    return (
      <div className="card-area">
        <div className="flashcard" style={{ cursor: 'default' }}>
          <div className="card-face">
            <div className="card-state">
              <span style={{ fontSize: 32 }}>⚠️</span>
              <span>
                சர்வர் கிடைக்கவில்லை
                <br />
                <small style={{ color: 'var(--text3)' }}>Run: node server.js</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="card-area">
        <div className="flashcard" style={{ cursor: 'default' }}>
          <div className="card-face">
            <div className="card-state">
              <span style={{ fontSize: 32 }}>📭</span>
              <span>
                அட்டைகள் இல்லை
                <br />
                <small style={{ color: 'var(--text3)' }}>No cards in this category</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const card = cards[currentIndex]

  return (
    <div className="card-area">
      <div
        className={`flashcard${flipped ? ' flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        aria-label="Flip card"
      >
        {/* Front */}
        <div className="card-face">
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(card._id, card.topic)
            }}
          >
            ✕ நீக்கு
          </button>

          <span className={`cat-tag cat-${card.category}`}>{card.category}</span>
          <p className="card-topic">{card.topic}</p>
          {card.subtitle && <p className="card-subtitle">{card.subtitle}</p>}
          <p className="flip-hint">தட்டவும் திருப்ப ↻</p>
        </div>

        {/* Back */}
        <div className="card-face card-back">
          <p className="back-label">உள்ளடக்கம்</p>
          <div className="content-grid">
            {card.content.map((item, i) => (
              <span key={i} className="pill">
                {item.label}
                {item.sub && <span className="pill-sub">{item.sub}</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
