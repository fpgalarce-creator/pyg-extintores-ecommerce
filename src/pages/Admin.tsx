import { useMemo, useState } from 'react'
import Container from '../components/Container'
import Button from '../components/Button'
import { products as catalogProducts } from '../data/products'

const STORAGE_KEY = 'pyg_admin_products'

const categories = ['Extintores', 'Mantención de Extintores', 'Accesorios']

type AdminProduct = {
  id: string
  name: string
  category: string
  price: number
  description: string
  stock?: number
}

const mapDefaultProducts = (): AdminProduct[] =>
  catalogProducts.map((product) => ({
    id: `catalog-${product.id}`,
    name: product.name,
    category: product.capacity === 'Accesorios' || product.capacity === 'Señalética' ? 'Accesorios' : 'Extintores',
    price: product.price,
    description: product.shortDesc,
    stock: product.stock,
  }))

const loadProducts = (): AdminProduct[] => {
  if (typeof window === 'undefined') {
    return mapDefaultProducts()
  }
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return mapDefaultProducts()
  }
  try {
    const parsed = JSON.parse(raw) as AdminProduct[]
    if (!Array.isArray(parsed)) {
      return mapDefaultProducts()
    }
    return parsed
  } catch {
    return mapDefaultProducts()
  }
}

const persistProducts = (items: AdminProduct[]) => {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value)

const Admin = () => {
  const [items, setItems] = useState<AdminProduct[]>(() => loadProducts())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formState, setFormState] = useState({
    name: '',
    category: categories[0],
    price: '',
    description: '',
    stock: '',
  })

  const isEditing = Boolean(editingId)
  const sortedItems = useMemo(
    () => items.slice().sort((a, b) => a.name.localeCompare(b.name)),
    [items],
  )

  const resetForm = () => {
    setFormState({
      name: '',
      category: categories[0],
      price: '',
      description: '',
      stock: '',
    })
    setEditingId(null)
  }

  const updateField = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const priceValue = Number(formState.price)
    if (!formState.name || !formState.description || Number.isNaN(priceValue)) {
      return
    }

    const stockValue = formState.stock ? Number(formState.stock) : undefined
    const nextItem: AdminProduct = {
      id: editingId ?? `custom-${Date.now()}`,
      name: formState.name,
      category: formState.category,
      price: priceValue,
      description: formState.description,
      stock: Number.isNaN(stockValue) ? undefined : stockValue,
    }

    const nextItems = editingId
      ? items.map((item) => (item.id === editingId ? nextItem : item))
      : [...items, nextItem]

    setItems(nextItems)
    persistProducts(nextItems)
    resetForm()
  }

  const handleEdit = (item: AdminProduct) => {
    setEditingId(item.id)
    setFormState({
      name: item.name,
      category: item.category,
      price: String(item.price),
      description: item.description,
      stock: item.stock ? String(item.stock) : '',
    })
  }

  const handleDelete = (id: string) => {
    const nextItems = items.filter((item) => item.id !== id)
    setItems(nextItems)
    persistProducts(nextItems)
    if (editingId === id) {
      resetForm()
    }
  }

  return (
    <Container>
      <div className="space-y-8 pb-20">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Panel admin</p>
          <h1 className="text-3xl font-semibold text-white">Gestión de productos PYG</h1>
          <p className="text-white/70">
            Crea, edita o elimina productos desde este panel. Los cambios se guardan localmente.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="product-name">
                Nombre
              </label>
              <input
                id="product-name"
                value={formState.name}
                onChange={(event) => updateField('name', event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                placeholder="Extintor ABC 6kg"
                required
              />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm text-white/70" htmlFor="product-category">
                  Categoría
                </label>
                <select
                  id="product-category"
                  value={formState.category}
                  onChange={(event) => updateField('category', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70" htmlFor="product-price">
                  Precio (CLP)
                </label>
                <input
                  id="product-price"
                  type="number"
                  min={0}
                  value={formState.price}
                  onChange={(event) => updateField('price', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  placeholder="45000"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="product-description">
                Descripción corta
              </label>
              <textarea
                id="product-description"
                value={formState.description}
                onChange={(event) => updateField('description', event.target.value)}
                className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                placeholder="Descripción breve del producto..."
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="product-stock">
                Stock (opcional)
              </label>
              <input
                id="product-stock"
                type="number"
                min={0}
                value={formState.stock}
                onChange={(event) => updateField('stock', event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                placeholder="20"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="submit" variant="primary">
                {isEditing ? 'Actualizar producto' : 'Crear producto'}
              </Button>
              {isEditing ? (
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancelar edición
                </Button>
              ) : null}
            </div>
          </form>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/50">
                  <tr>
                    <th className="px-4 py-3">Producto</th>
                    <th className="px-4 py-3">Categoría</th>
                    <th className="px-4 py-3">Precio</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedItems.map((item) => (
                    <tr key={item.id} className="border-t border-white/5">
                      <td className="px-4 py-4">
                        <div className="text-white">{item.name}</div>
                        <p className="text-xs text-white/50">{item.description}</p>
                      </td>
                      <td className="px-4 py-4 text-white/70">{item.category}</td>
                      <td className="px-4 py-4 text-white/70">{formatCurrency(item.price)}</td>
                      <td className="px-4 py-4 text-white/70">{item.stock ?? '—'}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="rounded-full border border-red-400/30 px-3 py-1 text-xs font-semibold text-red-200 transition hover:border-red-400/60"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Admin
