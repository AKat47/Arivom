const BASE = '/api'

export async function getCards() {
  const res = await fetch(`${BASE}/cards`)
  if (!res.ok) throw new Error('Failed to fetch cards')
  return res.json()
}

export async function createCard(data) {
  const res = await fetch(`${BASE}/cards`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create card')
  return res.json()
}

export async function removeCard(id) {
  const res = await fetch(`${BASE}/cards/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete card')
  return res.json()
}
