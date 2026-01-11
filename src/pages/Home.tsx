import { Flame, ShieldCheck, Truck, BadgeCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import Button from '../components/Button'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const categories = [
  { title: 'Extintores ABC', description: 'Cobertura multipropósito para hogar y empresa.' },
  { title: 'Extintores CO2', description: 'Protección limpia para equipos eléctricos.' },
  { title: 'Accesorios', description: 'Soportes, recargas y kits de inspección.' },
  { title: 'Señalética', description: 'Señales normadas para rutas de evacuación.' },
]

const benefits = [
  { icon: ShieldCheck, title: 'Certificación vigente', text: 'Productos normados con respaldo técnico especializado.' },
  { icon: Truck, title: 'Despacho programado', text: 'Coordinación express en la RM y despacho nacional.' },
  { icon: BadgeCheck, title: 'Garantía extendida', text: 'Cobertura por mantención y recarga anual.' },
  { icon: Flame, title: 'Asesoría experta', text: 'Equipo con más de 15 años en seguridad industrial.' },
]

const Home = () => {
  return (
    <div className="space-y-20 pb-20">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,138,28,0.15),transparent_55%),radial-gradient(circle_at_top_left,rgba(255,77,45,0.2),transparent_50%)]" />
        <Container>
          <div className="relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">Seguridad premium</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Extintores certificados para tu hogar y empresa
              </h1>
              <p className="mt-5 text-lg text-white/70">
                Despacho programado, factura inmediata y garantía extendida en toda la línea de
                extintores PYG. Protege lo que más importa con estándares industriales.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/productos">
                  <Button>Ver productos</Button>
                </Link>
                <a
                  href="https://wa.me/56900000000"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Cotizar por WhatsApp
                </a>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {['Despacho express', 'Factura electrónica', 'Garantía 12 meses'].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-4 top-8 h-32 w-32 rounded-full bg-ember/30 blur-3xl" />
              <div className="absolute -right-8 bottom-4 h-32 w-32 rounded-full bg-blaze/30 blur-3xl" />
              <div className="relative rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-white/5 p-8 shadow-glow">
                <div className="flex h-64 items-center justify-center rounded-3xl bg-gradient-to-br from-ember/30 via-white/5 to-blaze/30 text-2xl font-semibold text-white/80">
                  Imagen
                </div>
                <div className="mt-6 grid gap-3 text-sm text-white/70">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span>Kit industrial</span>
                    <span className="text-white">CLP 189.990</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span>Servicios</span>
                    <span className="text-white">Inspección anual</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Categorías destacadas</h2>
            <Link to="/productos" className="text-sm text-ember hover:text-blaze">
              Ver catálogo
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20"
              >
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                <p className="mt-3 text-sm text-white/70">{category.description}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>

      <Container>
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Más vendidos</h2>
            <span className="text-sm text-white/50">Selección curada por expertos</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Container>

      <Container>
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-10">
          <h2 className="text-2xl font-semibold text-white">Beneficios PYG Extintores</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ember/20 text-ember">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                <p className="text-sm text-white/70">{benefit.text}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  )
}

export default Home
