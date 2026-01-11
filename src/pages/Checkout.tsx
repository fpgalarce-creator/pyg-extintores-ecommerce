import { useState } from 'react'
import Container from '../components/Container'
import Button from '../components/Button'
import { useCart } from '../context/CartContext'

const formatPrice = (price: number) =>
  price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })

const Checkout = () => {
  const { items, total, clear } = useCart()
  const [success, setSuccess] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSuccess(true)
    clear()
  }

  return (
    <Container>
      <div className="space-y-10 pb-20">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-white">Checkout</h1>
          <p className="text-white/70">Completa tus datos para coordinar el despacho.</p>
        </header>

        {success ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-2xl font-semibold text-white">Pedido confirmado</h2>
            <p className="mt-3 text-white/70">
              Nuestro equipo se pondrá en contacto para coordinar el despacho y la factura.
            </p>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="name">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="phone">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="address">
                    Dirección
                  </label>
                  <input
                    id="address"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70" htmlFor="notes">
                  Observaciones
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                />
              </div>
              <Button className="w-full" type="submit">
                Finalizar pedido
              </Button>
            </form>

            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Resumen de compra</h2>
              <div className="mt-4 space-y-4 text-sm text-white/70">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between">
                    <span>
                      {item.product.name} x{item.quantity}
                    </span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-white/10 pt-4 text-lg font-semibold text-white">
                Total: {formatPrice(total)}
              </div>
            </aside>
          </div>
        )}
      </div>
    </Container>
  )
}

export default Checkout
