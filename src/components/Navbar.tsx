import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, Search, ShoppingCart } from 'lucide-react'
import Container from './Container'
import Button from './Button'
import { useCart } from '../context/CartContext'
import { clearAuthSession, getAuthSession, isAdminSession } from '../utils/auth'

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
]

const Navbar = () => {
  const { count } = useCart()
  const [session, setSession] = useState(() => getAuthSession())
  const [accountOpen, setAccountOpen] = useState(false)
  const isAdmin = useMemo(() => isAdminSession(session), [session])

  useEffect(() => {
    const handleAuthChange = () => {
      setSession(getAuthSession())
    }
    window.addEventListener('storage', handleAuthChange)
    window.addEventListener('authchange', handleAuthChange)
    return () => {
      window.removeEventListener('storage', handleAuthChange)
      window.removeEventListener('authchange', handleAuthChange)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-coal/80 backdrop-blur">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <Link to="/" className="text-lg font-semibold tracking-wide text-white">
            <span className="text-ember">PYG</span> Extintores
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
            <div className="relative flex items-center gap-6">
              <div className="group relative">
                <NavLink
                  to="/productos"
                  className={({ isActive }) =>
                    `relative inline-flex items-center gap-1 transition duration-200 ease-out hover:-translate-y-0.5 hover:text-white ${
                      isActive ? 'text-white' : 'text-white/70'
                    } after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ember/70 after:transition-transform after:duration-200 hover:after:scale-x-100`
                  }
                >
                  Productos
                  <ChevronDown className="h-3.5 w-3.5 text-white/50 transition group-hover:text-white/80" />
                </NavLink>
                <div className="pointer-events-none absolute left-0 top-full mt-3 w-64 translate-y-2 rounded-2xl border border-white/10 bg-coal/90 p-3 opacity-0 shadow-xl backdrop-blur transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="space-y-1">
                    {[
                      { label: 'Extintores', to: '/productos/extintores' },
                      { label: 'Mantención de Extintores', to: '/productos/mantencion-extintores' },
                      { label: 'Accesorios', to: '/productos/accesorios' },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                      >
                        {item.label}
                        <span className="text-xs text-white/40">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative transition duration-200 ease-out hover:-translate-y-0.5 hover:text-white ${
                      isActive ? 'text-white' : 'text-white/70'
                    } after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ember/70 after:transition-transform after:duration-200 hover:after:scale-x-100`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
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
            <div className="relative hidden lg:flex">
              {session ? (
                <div
                  className="relative"
                  onMouseLeave={() => setAccountOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setAccountOpen((prev) => !prev)}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                  >
                    Mi cuenta
                    <ChevronDown className="h-4 w-4 text-white/60" />
                  </button>
                  <div
                    className={`absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-coal/90 p-2 text-sm shadow-xl backdrop-blur transition ${
                      accountOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                  >
                    <div className="rounded-xl px-3 py-2 text-xs text-white/50">
                      {session.email}
                    </div>
                    {isAdmin ? (
                      <Link
                        to="/admin"
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                      >
                        Admin
                        <span className="text-xs text-white/40">→</span>
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => {
                        clearAuthSession()
                        setAccountOpen(false)
                      }}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                      Cerrar sesión
                      <span className="text-xs text-white/40">×</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                >
                  Ingresar
                </Link>
              )}
            </div>
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
