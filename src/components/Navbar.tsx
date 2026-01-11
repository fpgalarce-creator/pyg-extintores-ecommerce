import { Link, NavLink } from 'react-router-dom'
import { MessageCircle, Search, ShoppingCart } from 'lucide-react'
import Container from './Container'
import Button from './Button'
import { useCart } from '../context/CartContext'

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Productos', to: '/productos' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
]

const Navbar = () => {
  const { count } = useCart()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-coal/80 backdrop-blur">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <Link to="/" className="text-lg font-semibold tracking-wide text-white">
            <span className="text-ember">PYG</span> Extintores
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `transition hover:text-white ${isActive ? 'text-white' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden flex-1 justify-center lg:flex">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder="Buscar extintores, señalética, recargas..."
                className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/carrito" className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ember text-xs font-semibold">
                {count}
              </span>
            </Link>
            <a
              href="https://wa.me/56900000000"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal lg:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <Link to="/carrito" className="lg:hidden">
              <Button variant="primary">Comprar</Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Navbar
