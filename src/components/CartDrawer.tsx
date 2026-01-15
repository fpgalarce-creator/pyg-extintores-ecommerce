import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatCLP } from '../utils/format'

const CartDrawer = () => {
  const { items, total, isCartOpen, closeCart, addItem, updateQuantity, removeItem } = useCart()
  const subtotal = total
  const tax = subtotal * 0.19
  const totalWithTax = subtotal + tax

  useEffect(() => {
    if (!isCartOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCart()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCartOpen, closeCart])

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  return (
    <div
      className={`fixed inset-0 z-[60] transition ${
        isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col border-l border-white/10 bg-coal/90 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Carrito</p>
            <h2 className="text-lg font-semibold text-white">Tu selección</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-ember/60 hover:text-white"
            aria-label="Cerrar carrito"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/70 shadow-[0_0_30px_rgba(255,107,53,0.12)]">
              Carrito vacío
            </div>
            <p className="mt-4 text-sm text-white/60">
              Explora nuestro catálogo premium para sumar tus productos certificados.
            </p>
            <Link
              to="/productos"
              onClick={closeCart}
              className="mt-6 inline-flex items-center justify-center rounded-full border border-ember/40 bg-ember/20 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-ember hover:bg-ember/30"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-neutral-900/60">
                    <img
                      src={item.product.imageUrl || item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-white/60">
                          {formatCLP(item.product.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="text-xs text-white/50 transition hover:text-ember"
                      >
                        Eliminar
                      </button>
                    </div>
                    <div className="inline-flex items-center self-start rounded-full border border-white/10 bg-white/5 p-1">
                      <button
                        type="button"
                        onClick={() =>
                          item.quantity === 1
                            ? removeItem(item.product.id)
                            : updateQuantity(item.product.id, item.quantity - 1)
                        }
                        disabled={item.quantity === 0}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-xs text-white transition hover:border-ember/60 disabled:cursor-not-allowed disabled:text-white/30"
                      >
                        -
                      </button>
                      <span className="min-w-[2rem] px-3 text-center text-xs font-semibold text-white/80">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => addItem(item.product)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-ember/40 bg-ember/10 text-xs text-white transition hover:border-ember hover:bg-ember/20"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 bg-coal/90 px-6 py-5">
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">{formatCLP(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>IVA (19%)</span>
                  <span className="text-white">{formatCLP(tax)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Despacho</span>
                  <span className="text-white/60">Se calcula al finalizar según comuna</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
                  <span>Total</span>
                  <span>{formatCLP(totalWithTax)}</span>
                </div>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-full border border-ember/50 bg-ember/20 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-ember hover:bg-ember/30"
              >
                Continuar / Ir a pagar
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer
