import { NavLink } from 'react-router-dom'

const categories = [
  { label: 'Extintores', to: '/productos/extintores' },
  { label: 'Mantención de Extintores', to: '/productos/mantencion-extintores' },
  { label: 'Accesorios', to: '/productos/accesorios' },
]

const ProductCategoryTabs = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {categories.map((category) => (
        <NavLink
          key={category.to}
          to={category.to}
          className={({ isActive }) =>
            `rounded-full border px-5 py-2 text-sm font-semibold transition ${
              isActive
                ? 'border-ember/60 bg-ember/15 text-white shadow-[0_0_12px_rgba(255,107,53,0.3)]'
                : 'border-white/10 bg-white/5 text-white/70 hover:border-ember/30 hover:bg-ember/10 hover:text-white'
            }`
          }
        >
          {category.label}
        </NavLink>
      ))}
    </div>
  )
}

export default ProductCategoryTabs
