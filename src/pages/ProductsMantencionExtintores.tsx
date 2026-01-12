import { useEffect, useMemo, useState } from 'react'
import Container from '../components/Container'
import ProductCard from '../components/ProductCard'
import ProductCategoryTabs from '../components/ProductCategoryTabs'
import { getProducts, normalizeCategory, PRODUCTS_EVENT, STORAGE_KEY, Product } from '../lib/productsStore'

const ProductsMantencionExtintores = () => {
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

  const filteredProducts = useMemo(
    () => products.filter((product) => normalizeCategory(product.category) === 'Mantención de Extintores'),
    [products],
  )

  return (
    <Container>
      <div className="space-y-8 pb-20">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Catálogo</p>
          <h1 className="text-3xl font-semibold text-white">Mantención de Extintores</h1>
          <p className="text-white/70">
            Programas de recarga y mantención certificados para mantener tu seguridad al día.
          </p>
        </header>
        <ProductCategoryTabs />
        {filteredProducts.length ? (
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
            Aún no hay productos en esta categoría.
          </div>
        )}
      </div>
    </Container>
  )
}

export default ProductsMantencionExtintores
