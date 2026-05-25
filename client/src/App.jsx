import { useState, useEffect, useCallback, useMemo } from 'react'
import { getCards, createCard, removeCard } from './api'
import Header         from './components/Header'
import CategoryFilters from './components/CategoryFilters'
import Flashcard      from './components/Flashcard'
import NavRow         from './components/NavRow'
import AddCardForm    from './components/AddCardForm'

export default function App() {
  const [cards,          setCards]         = useState([])
  const [activeCategory, setActiveCategory] = useState('அனைத்தும்')
  const [currentIndex,   setCurrentIndex]   = useState(0)
  const [dbStatus,       setDbStatus]       = useState('loading')
  const [toast,          setToast]          = useState(null)

  // Derived: cards visible in the current category
  const filtered = useMemo(() =>
    activeCategory === 'அனைத்தும்'
      ? cards
      : cards.filter((c) => c.category === activeCategory),
    [cards, activeCategory]
  )

  // Derived: unique category list always starting with "all"
  const categories = useMemo(() =>
    ['அனைத்தும்', ...new Set(cards.map((c) => c.category))],
    [cards]
  )

  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }, [])

  // Load cards from API on mount
  useEffect(() => {
    getCards()
      .then((data) => { setCards(data); setDbStatus('ok') })
      .catch(() => setDbStatus('error'))
  }, [])

  // Keep currentIndex in bounds when filtered list shrinks
  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, Math.max(0, filtered.length - 1)))
  }, [filtered.length])

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setCurrentIndex(0)
  }

  const handleAddCard = async (data) => {
    try {
      const card     = await createCard(data)
      const newCards = [...cards, card]
      setCards(newCards)
      setActiveCategory('அனைத்தும்')
      // Navigate to the newly added card
      setCurrentIndex(newCards.length - 1)
      showToast('அட்டை சேர்க்கப்பட்டது ✓')
    } catch {
      showToast('சேர்க்க முடியவில்லை — மீண்டும் முயற்சிக்கவும்')
    }
  }

  const handleDeleteCard = async (id, topic) => {
    if (!window.confirm(`"${topic}" அட்டையை நீக்கவா?`)) return
    try {
      await removeCard(id)
      setCards((prev) => prev.filter((c) => c._id !== id))
      showToast('அட்டை நீக்கப்பட்டது')
    } catch {
      showToast('நீக்க முடியவில்லை')
    }
  }

  return (
    <>
      <Header
        dbStatus={dbStatus}
        total={filtered.length}
        current={currentIndex}
      />

      <CategoryFilters
        categories={categories}
        active={activeCategory}
        onChange={handleCategoryChange}
      />

      <Flashcard
        cards={filtered}
        currentIndex={currentIndex}
        dbStatus={dbStatus}
        onDelete={handleDeleteCard}
      />

      <NavRow
        total={filtered.length}
        current={currentIndex}
        onChange={setCurrentIndex}
      />

      <div className="divider" />

      <AddCardForm onAdd={handleAddCard} />

      {toast && <div className="toast show">{toast}</div>}
    </>
  )
}
