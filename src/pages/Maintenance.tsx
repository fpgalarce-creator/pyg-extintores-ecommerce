import { useState } from 'react'
import Container from '../components/Container'
import Button from '../components/Button'

const priceRows = [
  { label: 'Extintor 1 kilo', maintenance: 4000, recharge: 6000 },
  { label: 'Extintor 2 kilos', maintenance: 7000, recharge: 9500 },
  { label: 'Extintor 4 kilos', maintenance: 10000, recharge: 18500 },
  { label: 'Extintor 6 kilos', maintenance: 11000, recharge: 25000 },
  { label: 'Extintor 10 kilos', maintenance: 14000, recharge: 35000 },
]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value)

const Maintenance = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '',
    type: '1kg',
    service: 'Mantención',
    logistics: 'local',
    address: '',
    comuna: '',
    ciudad: '',
    referencia: '',
    message: '',
  })
  const [success, setSuccess] = useState(false)

  const updateField = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSuccess(true)
    setFormState((prev) => ({
      ...prev,
      message: '',
    }))
  }

  const needsPickup = formState.logistics === 'domicilio'

  return (
    <Container>
      <div className="space-y-10 pb-20">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Mantención certificada</p>
          <h1 className="text-3xl font-semibold text-white">Mantención de Extintores</h1>
          <p className="text-white/70">
            Precios claros para mantención y recarga, con logística flexible para tu empresa.
          </p>
        </header>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/50">
              <tr>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Mantención</th>
                <th className="px-6 py-4">Recarga</th>
              </tr>
            </thead>
            <tbody>
              {priceRows.map((row) => (
                <tr key={row.label} className="border-t border-white/10">
                  <td className="px-6 py-4 text-white">{row.label}</td>
                  <td className="px-6 py-4 text-white/70">{formatCurrency(row.maintenance)}</td>
                  <td className="px-6 py-4 text-white/70">{formatCurrency(row.recharge)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="company">
                Empresa / Nombre
              </label>
              <input
                id="company"
                value={formState.name}
                onChange={(event) => updateField('name', event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                placeholder="Empresa PYG"
                required
              />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm text-white/70" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formState.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  placeholder="contacto@empresa.cl"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70" htmlFor="phone">
                  Teléfono / WhatsApp
                </label>
                <input
                  id="phone"
                  value={formState.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  placeholder="+56 9 1234 5678"
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm text-white/70" htmlFor="quantity">
                  Cantidad de extintores
                </label>
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  value={formState.quantity}
                  onChange={(event) => updateField('quantity', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  placeholder="12"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70" htmlFor="type">
                  Tipo
                </label>
                <select
                  id="type"
                  value={formState.type}
                  onChange={(event) => updateField('type', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                >
                  {['1kg', '2kg', '4kg', '6kg', '10kg'].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70" htmlFor="service">
                  Servicio
                </label>
                <select
                  id="service"
                  value={formState.service}
                  onChange={(event) => updateField('service', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                >
                  {['Mantención', 'Recarga', 'Ambos'].map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-white/70">Logística</p>
              <div className="grid gap-3 lg:grid-cols-2">
                <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                  <input
                    type="radio"
                    name="logistics"
                    checked={formState.logistics === 'local'}
                    onChange={() => updateField('logistics', 'local')}
                  />
                  Lo dejamos en el local
                </label>
                <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                  <input
                    type="radio"
                    name="logistics"
                    checked={formState.logistics === 'domicilio'}
                    onChange={() => updateField('logistics', 'domicilio')}
                  />
                  Retiro y entrega a domicilio
                </label>
              </div>
            </div>

            {needsPickup ? (
              <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="address">
                    Dirección
                  </label>
                  <input
                    id="address"
                    value={formState.address}
                    onChange={(event) => updateField('address', event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                    placeholder="Av. Principal 123"
                    required
                  />
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-white/70" htmlFor="comuna">
                      Comuna
                    </label>
                    <input
                      id="comuna"
                      value={formState.comuna}
                      onChange={(event) => updateField('comuna', event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                      placeholder="Providencia"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70" htmlFor="ciudad">
                      Ciudad
                    </label>
                    <input
                      id="ciudad"
                      value={formState.ciudad}
                      onChange={(event) => updateField('ciudad', event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                      placeholder="Santiago"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="reference">
                    Referencia
                  </label>
                  <input
                    id="reference"
                    value={formState.referencia}
                    onChange={(event) => updateField('referencia', event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                    placeholder="Recepción edificio A"
                  />
                </div>
              </div>
            ) : null}

            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="message">
                Mensaje (opcional)
              </label>
              <textarea
                id="message"
                value={formState.message}
                onChange={(event) => updateField('message', event.target.value)}
                className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                placeholder="Detalles adicionales sobre el servicio..."
              />
            </div>
            {success ? (
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                Tu solicitud fue enviada. En breve te contactaremos para confirmar la cotización.
              </div>
            ) : null}
            <Button type="submit" variant="primary" className="w-full">
              Enviar solicitud
            </Button>
          </form>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Lo que incluye el servicio</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li>• Inspección completa y sellos certificados.</li>
                <li>• Recarga con agente homologado según norma.</li>
                <li>• Reporte de estado y trazabilidad por lote.</li>
                <li>• Opciones de retiro y entrega según logística.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">¿Necesitas una visita técnica?</h3>
              <p className="mt-3 text-sm text-white/70">
                Nuestro equipo puede coordinar una evaluación en terreno para grandes flotas de
                extintores o planes de mantención anual.
              </p>
              <Button variant="secondary" className="mt-4 w-full">
                Solicitar visita técnica
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Container>
  )
}

export default Maintenance
