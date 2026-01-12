import { Navigate, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Placeholder from './pages/Placeholder'
import Login from './pages/Login'
import Admin from './pages/Admin'
import ProductsExtintores from './pages/ProductsExtintores'
import ProductsAccesorios from './pages/ProductsAccesorios'
import ProductsMantencionExtintores from './pages/ProductsMantencionExtintores'
import { getAuthSession, isAdminSession } from './utils/auth'

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const session = getAuthSession()
  if (!session || !isAdminSession(session)) {
    return <Navigate to="/login" replace />
  }
  return children
}

const App = () => {
  return (
    <div className="min-h-screen bg-charcoal text-white">
      <Navbar />
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/extintores" element={<ProductsExtintores />} />
          <Route
            path="/productos/mantencion-extintores"
            element={<ProductsMantencionExtintores />}
          />
          <Route path="/productos/accesorios" element={<ProductsAccesorios />} />
          <Route path="/productos/:slug" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <Admin />
              </RequireAdmin>
            }
          />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/servicios"
            element={
              <Placeholder
                title="Servicios"
                description="Próximamente: inspecciones programadas, recargas certificadas y asesoría técnica en terreno."
              />
            }
          />
          <Route
            path="/nosotros"
            element={
              <Placeholder
                title="Nosotros"
                description="Somos especialistas en seguridad contra incendios. Muy pronto conocerás más sobre nuestro equipo y certificaciones."
              />
            }
          />
          <Route
            path="/contacto"
            element={
              <Placeholder
                title="Contacto"
                description="Déjanos tu consulta y un asesor PYG se comunicará contigo para cotizaciones o visitas técnicas."
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
