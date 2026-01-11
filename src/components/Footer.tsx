import Container from './Container'

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-coal/70 py-12 text-white/70">
      <Container>
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Empresa</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Sobre PYG</li>
              <li>Certificaciones</li>
              <li>Trabaja con nosotros</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Ayuda</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Preguntas frecuentes</li>
              <li>Despachos</li>
              <li>Garantías y recargas</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Términos y condiciones</li>
              <li>Política de privacidad</li>
              <li>Política de devoluciones</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Contacto</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Av. Seguridad 1234, Santiago</li>
              <li>ventas@pygextintores.cl</li>
              <li>+56 2 2345 6789</li>
              <li>Redes: Instagram · LinkedIn · Facebook</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/50">
          © {new Date().getFullYear()} PYG Extintores. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  )
}

export default Footer
