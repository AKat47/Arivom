import { useState } from 'react'

const EMPTY = { topic: '', subtitle: '', category: '', content: '' }

export default function AddCardForm({ onAdd }) {
  const [open, setOpen]     = useState(false)
  const [form, setForm]     = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSave = async () => {
    const topic   = form.topic.trim()
    const content = form.content.split('\n').map((s) => s.trim()).filter(Boolean).map((s) => ({ label: s }))
    if (!topic)          return
    if (!content.length) return

    setSaving(true)
    await onAdd({
      topic,
      subtitle: form.subtitle.trim(),
      category: form.category.trim() || 'இதர',
      content,
    })
    setSaving(false)
    setForm(EMPTY)
    setOpen(false)
  }

  const handleClear = () => setForm(EMPTY)

  return (
    <div>
      <div className="section-header">
        <span className="section-title">புதிய அட்டை சேர்க்க</span>
        <button onClick={() => setOpen((o) => !o)}>
          {open ? '✕ மூடு' : '+ சேர்'}
        </button>
      </div>

      {open && (
        <div className="form-wrap">
          <div className="field">
            <label>தலைப்பு (Topic in Tamil)</label>
            <input
              type="text"
              value={form.topic}
              onChange={set('topic')}
              placeholder="எ.கா. பூக்கள் வகைகள்"
            />
          </div>

          <div className="field">
            <label>துணைத் தலைப்பு (English subtitle — optional)</label>
            <input
              type="text"
              value={form.subtitle}
              onChange={set('subtitle')}
              placeholder="e.g. Types of Flowers"
            />
          </div>

          <div className="field">
            <label>பிரிவு (Category)</label>
            <input
              type="text"
              value={form.category}
              onChange={set('category')}
              placeholder="எ.கா. இயற்கை, வரலாறு, அறிவியல்"
            />
          </div>

          <div className="field">
            <label>உள்ளடக்கம் — ஒவ்வொரு வரியில் ஒன்று</label>
            <textarea
              value={form.content}
              onChange={set('content')}
              placeholder={'ஒவ்வொரு உருப்படியும் புதிய வரியில்\nஎ.கா.\nசெந்தாமரை\nமல்லிகை\nரோஜா'}
            />
          </div>

          <div className="form-actions">
            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'சேமிக்கிறது…' : '✓ சேமி (Save)'}
            </button>
            <button onClick={handleClear}>✕ அழி</button>
          </div>
        </div>
      )}
    </div>
  )
}
