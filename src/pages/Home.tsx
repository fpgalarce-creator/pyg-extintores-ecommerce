import { useState } from 'react'
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requestType: '',
    message: '',
  })
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isValid = Object.values(formData).every((value) => value.trim().length > 0)

    if (!isValid) {
      setFormError('Completa todos los campos para enviar tu solicitud.')
      setFormSuccess(false)
      return
    }

    setFormError('')
    setFormSuccess(true)
    setFormData({ name: '', email: '', phone: '', requestType: '', message: '' })
  }

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
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#25D366] px-5 py-2 text-sm font-semibold text-black shadow-[0_12px_24px_rgba(37,211,102,0.35)] transition hover:bg-[#1EBE5D]"
                >
                  Cotizar por WhatsApp
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <span className="rounded-2xl border border-white/15 bg-black/70 px-4 py-2 text-sm text-white backdrop-blur-sm">
                  +10 años de experiencia
                </span>
                <span className="rounded-2xl border border-[#C9A24D]/40 bg-black/70 px-4 py-2 text-sm text-[#C9A24D] backdrop-blur-sm">
                  Ganadores Impulso Chileno 2024
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-4 top-8 h-32 w-32 rounded-full bg-ember/30 blur-3xl" />
              <div className="absolute -right-8 bottom-4 h-32 w-32 rounded-full bg-blaze/30 blur-3xl" />
              <div className="relative rounded-[32px] border border-white/10 bg-[#0B0F14]/95 p-8 shadow-glow backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-white">Solicita tu cotización</h2>
                <p className="mt-2 text-sm text-white/70">
                  Completa el formulario y un asesor te contactará.
                </p>
                <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                      <span>NOMBRE COMPLETO</span>
                      <input
                        type="text"
                        name="name"
                        placeholder="Ingresa tu nombre"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white placeholder:text-white/40 focus:border-ember/60 focus:outline-none"
                      />
                    </label>
                    <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                      <span>CORREO ELECTRÓNICO</span>
                      <input
                        type="email"
                        name="email"
                        placeholder="correo@empresa.cl"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white placeholder:text-white/40 focus:border-ember/60 focus:outline-none"
                      />
                    </label>
                    <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                      <span>TELÉFONO / WHATSAPP</span>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+56 9 0000 0000"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white placeholder:text-white/40 focus:border-ember/60 focus:outline-none"
                      />
                    </label>
                    <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                      <span>TIPO DE SOLICITUD</span>
                      <select
                        name="requestType"
                        value={formData.requestType}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white focus:border-ember/60 focus:outline-none"
                      >
                        <option value="" className="text-slate-900">
                          Selecciona una opción
                        </option>
                        <option value="compra" className="text-slate-900">
                          Compra de extintores
                        </option>
                        <option value="recarga" className="text-slate-900">
                          Recarga / mantención
                        </option>
                        <option value="inspeccion" className="text-slate-900">
                          Inspección o certificación
                        </option>
                        <option value="senaletica" className="text-slate-900">
                          Señalética y accesorios
                        </option>
                        <option value="otro" className="text-slate-900">
                          Otro
                        </option>
                      </select>
                    </label>
                  </div>
                  <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    <span>MENSAJE</span>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Cuéntanos tu necesidad y cantidad aproximada."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white placeholder:text-white/40 focus:border-ember/60 focus:outline-none"
                    />
                  </label>
                  {formError && <p className="text-sm text-ember">{formError}</p>}
                  {formSuccess && (
                    <p className="text-sm text-emerald-300">
                      ¡Gracias! Recibimos tu solicitud y te contactaremos pronto.
                    </p>
                  )}
                  <button
                    type="submit"
                    className="mt-1 w-full rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white transition hover:bg-blaze"
                  >
                    Enviar solicitud
                  </button>
                  <p className="text-left text-xs text-white/60">
                    Respondemos en horario laboral y confirmamos en menos de 24 horas.
                  </p>
                </form>
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
