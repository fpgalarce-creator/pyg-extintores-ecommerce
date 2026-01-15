import { Link } from 'react-router-dom'
import { Product } from '../lib/productsStore'
import Badge from './Badge'
import { useCart } from '../context/CartContext'
import { formatCLP } from '../utils/format'

interface ProductCardProps {
  product: Product
}

const toCloudinaryCardUrl = (url: string) => {
  if (url.includes('/upload/')) {
    return url.replace('/upload/', '/upload/f_auto,q_auto,c_fill,w_600,h_400/')
  }

  return url
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, removeItem, updateQuantity, getQuantity } = useCart()
  const imageUrl = product.imageUrl || product.image
  const quantity = getQuantity(product.id)

  const handleDecrease = () => {
    if (quantity <= 0) return
    if (quantity === 1) {
      removeItem(product.id)
      return
    }
    updateQuantity(product.id, quantity - 1)
  }

  const handleIncrease = () => {
    addItem(product)
  }

  return (
    <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:border-white/20">
      <div className="flex items-center justify-between">
        <Badge>Certificado</Badge>
        <span className="text-xs text-white/50">Stock {product.stock ?? '—'}</span>
      </div>
      <div className="relative w-full h-48 overflow-hidden rounded-xl bg-neutral-900/40">
        {imageUrl ? (
          <img
            src={toCloudinaryCardUrl(imageUrl)}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-white/70">
            {product.type && product.capacity
              ? `${product.type} · ${product.capacity}`
              : product.category}
          </div>
        )}
      </div>
      <div className="mt-5 flex-1">
        <Link to={`/productos/${product.slug}`} className="text-lg font-semibold text-white">
          {product.name}
        </Link>
        <p className="mt-2 text-sm text-white/60">
          {product.description ?? product.shortDesc}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-lg font-semibold text-white">{formatCLP(product.price)}</span>
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1 shadow-[0_0_18px_rgba(255,107,53,0.12)]">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={quantity === 0}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-ember/60 hover:text-white disabled:cursor-not-allowed disabled:text-white/30"
          >
            -
          </button>
          <span className="min-w-[2.5rem] px-3 text-center text-sm font-semibold text-white/80">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrease}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ember/40 bg-ember/10 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-ember hover:bg-ember/20"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
