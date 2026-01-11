import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Placeholder from './pages/Placeholder'

const App = () => {
  return (
    <div className="min-h-screen bg-charcoal text-white">
      <Navbar />
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:slug" element={<ProductDetail />} />
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
