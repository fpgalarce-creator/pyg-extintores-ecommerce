import Container from '../components/Container'

interface PlaceholderProps {
  title: string
  description: string
}

const Placeholder = ({ title, description }: PlaceholderProps) => {
  return (
    <Container>
      <div className="py-20">
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
        <p className="mt-3 max-w-2xl text-white/70">{description}</p>
      </div>
    </Container>
  )
}

export default Placeholder
