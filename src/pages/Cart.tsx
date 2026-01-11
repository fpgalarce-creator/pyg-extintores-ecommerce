import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import Button from '../components/Button'
import { useCart } from '../context/CartContext'

const formatPrice = (price: number) =>
  price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })

const Cart = () => {
  const { items, total, updateQuantity, removeItem } = useCart()
  const navigate = useNavigate()

  return (
    <Container>
      <div className="space-y-8 pb-20">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-white">Carrito</h1>
          <p className="text-white/70">Revisa tus productos antes de continuar.</p>
        </header>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-white/70">Tu carrito está vacío.</p>
            <Link to="/productos" className="mt-4 inline-flex text-ember">
              Volver al catálogo
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-lg font-semibold text-white">{item.product.name}</p>
                    <p className="text-sm text-white/60">{item.product.shortDesc}</p>
                    <p className="mt-2 font-semibold text-white">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className="h-8 w-8 rounded-full border border-white/10 text-lg text-white/70"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="min-w-[2rem] text-center text-white">{item.quantity}</span>
                    <button
                      className="h-8 w-8 rounded-full border border-white/10 text-lg text-white/70"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="text-sm text-ember"
                      onClick={() => removeItem(item.product.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <aside className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Resumen</h2>
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>Despacho</span>
                <span>Calculado en checkout</span>
              </div>
              <div className="border-t border-white/10 pt-4 text-lg font-semibold text-white">
                Total: {formatPrice(total)}
              </div>
              <Button className="w-full" onClick={() => navigate('/checkout')}>
                Ir a pagar
              </Button>
            </aside>
          </div>
        )}
      </div>
    </Container>
  )
}

export default Cart
