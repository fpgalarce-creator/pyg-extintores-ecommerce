import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, Search, ShoppingCart } from 'lucide-react'
import Container from './Container'
import Button from './Button'
import { useCart } from '../context/CartContext'
import { clearAuthSession, getAuthSession, isAdminSession } from '../utils/auth'

const navLinks = [
  { label: 'Servicios', to: '/servicios' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
]

const Navbar = () => {
  const { count, openCart } = useCart()
  const [session, setSession] = useState(() => getAuthSession())
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const isAdmin = useMemo(() => isAdminSession(session), [session])
  const accountTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const productsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const accountRef = useRef<HTMLDivElement | null>(null)
  const productsRef = useRef<HTMLDivElement | null>(null)

  const openProducts = () => {
    if (productsTimeoutRef.current) {
      clearTimeout(productsTimeoutRef.current)
      productsTimeoutRef.current = null
    }
    setIsProductsOpen(true)
  }

  const scheduleCloseProducts = () => {
    if (productsTimeoutRef.current) {
      clearTimeout(productsTimeoutRef.current)
    }
    productsTimeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false)
    }, 160)
  }

  const openAccount = () => {
    if (accountTimeoutRef.current) {
      clearTimeout(accountTimeoutRef.current)
      accountTimeoutRef.current = null
    }
    setIsAccountOpen(true)
  }

  const scheduleCloseAccount = () => {
    if (accountTimeoutRef.current) {
      clearTimeout(accountTimeoutRef.current)
    }
    accountTimeoutRef.current = setTimeout(() => {
      setIsAccountOpen(false)
    }, 160)
  }

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProductsOpen(false)
        setIsAccountOpen(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (productsRef.current && !productsRef.current.contains(target)) {
        setIsProductsOpen(false)
      }
      if (accountRef.current && !accountRef.current.contains(target)) {
        setIsAccountOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (productsTimeoutRef.current) {
        clearTimeout(productsTimeoutRef.current)
      }
      if (accountTimeoutRef.current) {
        clearTimeout(accountTimeoutRef.current)
      }
    }
  }, [])

  const navLinkClass = (isActive: boolean) =>
    `group relative inline-flex items-center gap-1 px-3 py-2 text-sm transition duration-200 ${
      isActive ? 'text-white' : 'text-white/70'
    } hover:rounded-md hover:bg-white/5 hover:text-white hover:underline hover:decoration-ember/90 hover:underline-offset-4`

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-coal/80 backdrop-blur">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <Link to="/" className="text-lg font-semibold tracking-wide text-white">
            <span className="text-ember">PYG</span> Extintores
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
            <div className="relative flex items-center gap-6">
              <NavLink to="/" className={({ isActive }) => navLinkClass(isActive)}>
                Inicio
              </NavLink>
              <div
                className="relative"
                ref={productsRef}
                onMouseEnter={openProducts}
                onMouseLeave={scheduleCloseProducts}
              >
                <NavLink
                  to="/productos"
                  onClick={openProducts}
                  className={({ isActive }) => navLinkClass(isActive)}
                >
                  Productos
                  <ChevronDown className="h-3.5 w-3.5 text-white/50 transition group-hover:text-white/80" />
                </NavLink>
                <div
                  className={`absolute left-0 top-full mt-3 w-64 rounded-2xl border border-white/10 bg-coal/90 p-3 shadow-xl backdrop-blur transition duration-200 ${
                    isProductsOpen
                      ? 'pointer-events-auto translate-y-0 opacity-100'
                      : 'pointer-events-none translate-y-2 opacity-0'
                  }`}
                >
                  <div className="space-y-1">
                    {[
                      { label: 'Extintores', to: '/productos/extintores' },
                      { label: 'Mantención de Extintores', to: '/productos/mantencion-extintores' },
                      { label: 'Accesorios', to: '/productos/accesorios' },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsProductsOpen(false)}
                        className="flex items-center justify-between rounded-xl border border-transparent px-3 py-2 text-sm text-white/70 transition hover:border-ember/40 hover:bg-ember/10 hover:text-white hover:shadow-[0_0_12px_rgba(255,107,53,0.25)]"
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
                  className={({ isActive }) => navLinkClass(isActive)}
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
            <button type="button" onClick={openCart} className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-ember/60 hover:text-white">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ember text-xs font-semibold">
                {count}
              </span>
            </button>
            <div className="relative hidden lg:flex">
              {session ? (
                <div
                  className="relative"
                  ref={accountRef}
                  onMouseEnter={openAccount}
                  onMouseLeave={scheduleCloseAccount}
                >
                  <button
                    type="button"
                    onClick={() => setIsAccountOpen((prev) => !prev)}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                  >
                    Mi cuenta
                    <ChevronDown className="h-4 w-4 text-white/60" />
                  </button>
                  <div
                    className={`absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-coal/90 p-2 text-sm shadow-xl backdrop-blur transition duration-200 ${
                      isAccountOpen
                        ? 'pointer-events-auto translate-y-0 opacity-100'
                        : 'pointer-events-none -translate-y-1 opacity-0'
                    }`}
                  >
                    <div className="rounded-xl px-3 py-2 text-xs text-white/50">
                      {session.email}
                    </div>
                    {isAdmin ? (
                      <Link
                        to="/admin"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center justify-between rounded-xl border border-transparent px-3 py-2 text-white/70 transition hover:border-ember/40 hover:bg-ember/10 hover:text-white hover:shadow-[0_0_12px_rgba(255,107,53,0.25)]"
                      >
                        Admin
                        <span className="text-xs text-white/40">→</span>
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => {
                        clearAuthSession()
                        setIsAccountOpen(false)
                      }}
                      className="flex w-full items-center justify-between rounded-xl border border-transparent px-3 py-2 text-white/70 transition hover:border-ember/40 hover:bg-ember/10 hover:text-white hover:shadow-[0_0_12px_rgba(255,107,53,0.25)]"
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
