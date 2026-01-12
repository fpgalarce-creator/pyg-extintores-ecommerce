import { useEffect, useState } from 'react'
import Container from '../components/Container'
import ProductCard from '../components/ProductCard'
import ProductCategoryTabs from '../components/ProductCategoryTabs'
import { getProducts, PRODUCTS_EVENT, STORAGE_KEY, Product } from '../lib/productsStore'

const filters = ['ABC', 'CO2', '1kg', '2kg', '4kg', '6kg', 'Accesorios', 'Señalética']

const Products = () => {
  const [products, setProducts] = useState<Product[]>(() => getProducts())

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setProducts(getProducts())
      }
    }

    const handleProductsChange = () => {
      setProducts(getProducts())
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener(PRODUCTS_EVENT, handleProductsChange)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(PRODUCTS_EVENT, handleProductsChange)
    }
  }, [])

  return (
    <Container>
      <div className="space-y-10 pb-20">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Catálogo premium</p>
          <h1 className="text-3xl font-semibold text-white">Extintores y soluciones de seguridad</h1>
          <p className="text-white/70">
            Productos certificados con despacho programado y asesoría técnica especializada.
          </p>
        </header>

        <section>
          <ProductCategoryTabs />
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
            <input
              type="text"
              placeholder="Buscar por nombre o SKU"
              className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            />
            <select
              className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <option>Ordenar por relevancia</option>
              <option>Precio más bajo</option>
              <option>Precio más alto</option>
              <option>Más vendidos</option>
            </select>
            <select
              className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <option>Disponibilidad</option>
              <option>En stock</option>
              <option>Entrega inmediata</option>
            </select>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white/70 transition hover:border-white/30"
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>

        <div className="flex items-center justify-center gap-3">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`h-9 w-9 rounded-full border border-white/10 text-sm font-semibold transition hover:bg-white/10 ${
                page === 1 ? 'bg-ember text-white' : 'text-white/70'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Products
