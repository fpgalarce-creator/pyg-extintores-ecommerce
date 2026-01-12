import Container from '../components/Container'

const ProductsExtintores = () => {
  return (
    <Container>
      <div className="space-y-6 pb-20">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Catálogo</p>
          <h1 className="text-3xl font-semibold text-white">Extintores certificados</h1>
          <p className="text-white/70">
            Selección premium de extintores ABC y CO2 con despacho programado.
          </p>
        </header>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
          Estamos preparando un catálogo especializado por tipo de extintor. Mientras tanto,
          revisa el listado completo en la sección Productos.
        </div>
      </div>
    </Container>
  )
}

export default ProductsExtintores
