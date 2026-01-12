import { Link } from 'react-router-dom'
import { Product } from '../data/products'
import Badge from './Badge'
import Button from './Button'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
  product: Product
}

const formatPrice = (price: number) =>
  price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart()

  return (
    <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:border-white/20">
      <div className="flex items-center justify-between">
        <Badge>Certificado</Badge>
        <span className="text-xs text-white/50">Stock {product.stock}</span>
      </div>
      <div className="mt-6 h-36 overflow-hidden rounded-2xl bg-gradient-to-br from-ember/40 via-white/5 to-blaze/30">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-white/70">
            {product.type} · {product.capacity}
          </div>
        )}
      </div>
      <div className="mt-5 flex-1">
        <Link to={`/productos/${product.slug}`} className="text-lg font-semibold text-white">
          {product.name}
        </Link>
        <p className="mt-2 text-sm text-white/60">{product.shortDesc}</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-lg font-semibold text-white">{formatPrice(product.price)}</span>
        <Button onClick={() => addItem(product)}>Agregar</Button>
      </div>
    </div>
  )
}

export default ProductCard
