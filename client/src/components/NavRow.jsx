export default function NavRow({ total, current, onChange }) {
  const prev = () => onChange((i) => (i - 1 + total) % total)
  const next = () => onChange((i) => (i + 1) % total)

  return (
    <div className="nav-row">
      <button onClick={prev} disabled={total === 0}>← முந்தையது</button>

      <div className="dots">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            className="dot"
            onClick={() => onChange(i)}
            style={{
              background: i === current ? 'var(--text)' : 'var(--border2)',
            }}
            aria-label={`Card ${i + 1}`}
          />
        ))}
      </div>

      <button onClick={next} disabled={total === 0}>அடுத்தது →</button>
    </div>
  )
}
