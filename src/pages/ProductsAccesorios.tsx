import Container from '../components/Container'

const ProductsAccesorios = () => {
  return (
    <Container>
      <div className="space-y-6 pb-20">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Catálogo</p>
          <h1 className="text-3xl font-semibold text-white">Accesorios y señalética</h1>
          <p className="text-white/70">
            Complementos premium para instalaciones seguras y certificadas.
          </p>
        </header>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
          Esta categoría estará disponible próximamente con kits, señalética y soportes.
        </div>
      </div>
    </Container>
  )
}

export default ProductsAccesorios
