import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import Button from '../components/Button'
import { getAuthSession, setAuthSession } from '../utils/auth'

const ADMIN_EMAIL = 'admin@pygextintores.cl'
const ADMIN_PASSWORD = 'Admin123!'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const existing = getAuthSession()
    if (existing) {
      setSuccess('Ya tienes una sesión activa.')
    }
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!email || !password) {
      setError('Completa tu email y contraseña para continuar.')
      return
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAuthSession({ email, role: 'admin' })
      navigate('/')
      return
    }

    setAuthSession({ email, role: 'user' })
    navigate('/')
  }

  return (
    <Container>
      <div className="grid gap-8 pb-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Acceso seguro</p>
          <h1 className="text-3xl font-semibold text-white">Ingresa a tu cuenta PYG</h1>
          <p className="text-white/70">
            Administra cotizaciones, pedidos y acceso a herramientas exclusivas.
          </p>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            <p className="text-white/90">Demo admin</p>
            <p>Email: {ADMIN_EMAIL}</p>
            <p>Contraseña: {ADMIN_PASSWORD}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              placeholder="tu@email.cl"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              placeholder="••••••••"
            />
          </div>
          {error ? <p className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">{error}</p> : null}
          {success ? (
            <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
              {success}
            </p>
          ) : null}
          <Button type="submit" variant="primary" className="w-full">
            Ingresar
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default Login
