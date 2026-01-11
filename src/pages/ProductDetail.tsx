import { useParams, Link } from 'react-router-dom'
import Container from '../components/Container'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

const formatPrice = (price: number) =>
  price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })

const ProductDetail = () => {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  const { addItem } = useCart()

  if (!product) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-semibold">Producto no encontrado</h1>
          <Link to="/productos" className="mt-4 inline-block text-ember">
            Volver al catálogo
          </Link>
        </div>
      </Container>
    )
  }

  const complementos = products.filter((item) => item.id !== product.id).slice(0, 3)

  return (
    <Container>
      <div className="space-y-16 pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Badge>Certificado</Badge>
              <span className="text-sm text-white/60">Disponibles: {product.stock}</span>
            </div>
            <div className="flex h-80 items-center justify-center rounded-[32px] border border-white/10 bg-gradient-to-br from-ember/40 via-white/5 to-blaze/30">
              <span className="text-xl font-semibold text-white/80">Galería premium</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xs text-white/60"
                >
                  Vista {item}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-white">{product.name}</h1>
              <p className="mt-3 text-white/70">{product.shortDesc}</p>
              <div className="mt-4 text-2xl font-semibold text-white">
                {formatPrice(product.price)}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-white">Especificaciones técnicas</h2>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between">
                    <span>{spec.label}</span>
                    <span className="text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={() => addItem(product)} className="w-full">
              Agregar al carrito
            </Button>
            <p className="text-sm text-white/60">
              Incluye asesoría de instalación y recordatorio de mantenimiento anual.
            </p>
          </div>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Complementos recomendados</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {complementos.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-ember/30 via-white/5 to-blaze/30 text-xs text-white/60">
                  {item.type} · {item.capacity}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.name}</h3>
                <p className="mt-2 text-sm text-white/70">{item.shortDesc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold text-white">{formatPrice(item.price)}</span>
                  <Button variant="secondary" onClick={() => addItem(item)}>
                    Añadir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Container>
  )
}

export default ProductDetail
