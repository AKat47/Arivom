export default function CategoryFilters({ categories, active, onChange }) {
  return (
    <div className="filters">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`filter-btn${active === cat ? ' active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
