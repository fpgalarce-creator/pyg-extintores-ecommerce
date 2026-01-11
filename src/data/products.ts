export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: number
  slug: string
  name: string
  price: number
  type: 'ABC' | 'CO2'
  capacity: string
  shortDesc: string
  stock: number
  specs: ProductSpec[]
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'extintor-abc-1kg-premium',
    name: 'Extintor ABC 1kg Premium',
    price: 34990,
    type: 'ABC',
    capacity: '1kg',
    shortDesc: 'Ideal para cocinas y espacios compactos con certificación vigente.',
    stock: 18,
    specs: [
      { label: 'Agente', value: 'Polvo químico seco ABC' },
      { label: 'Alcance', value: '2-3 metros' },
      { label: 'Certificación', value: 'ISO 9001 / NCh' },
      { label: 'Recarga', value: 'Incluida por 1 año' },
    ],
  },
  {
    id: 2,
    slug: 'extintor-abc-2kg-pro',
    name: 'Extintor ABC 2kg Pro',
    price: 45990,
    type: 'ABC',
    capacity: '2kg',
    shortDesc: 'Respuesta rápida para oficinas, vehículos y bodegas pequeñas.',
    stock: 10,
    specs: [
      { label: 'Agente', value: 'Polvo químico seco ABC' },
      { label: 'Alcance', value: '3-4 metros' },
      { label: 'Presión', value: '15 bar' },
      { label: 'Garantía', value: '12 meses' },
    ],
  },
  {
    id: 3,
    slug: 'extintor-abc-6kg-industrial',
    name: 'Extintor ABC 6kg Industrial',
    price: 78990,
    type: 'ABC',
    capacity: '6kg',
    shortDesc: 'Cobertura avanzada para plantas y áreas industriales.',
    stock: 7,
    specs: [
      { label: 'Agente', value: 'PQS multipropósito' },
      { label: 'Descarga', value: '18 segundos' },
      { label: 'Presión', value: '18 bar' },
      { label: 'Incluye', value: 'Soporte de pared' },
    ],
  },
  {
    id: 4,
    slug: 'extintor-co2-2kg-elite',
    name: 'Extintor CO2 2kg Elite',
    price: 99990,
    type: 'CO2',
    capacity: '2kg',
    shortDesc: 'Recomendado para salas eléctricas y equipos sensibles.',
    stock: 5,
    specs: [
      { label: 'Agente', value: 'CO2 limpio' },
      { label: 'Uso', value: 'Equipos eléctricos' },
      { label: 'Boquilla', value: 'Difusor antiestático' },
      { label: 'Certificación', value: 'NCh 2056' },
    ],
  },
  {
    id: 5,
    slug: 'extintor-co2-5kg-corporativo',
    name: 'Extintor CO2 5kg Corporativo',
    price: 159990,
    type: 'CO2',
    capacity: '5kg',
    shortDesc: 'Diseñado para data centers y áreas críticas.',
    stock: 4,
    specs: [
      { label: 'Agente', value: 'CO2 limpio' },
      { label: 'Descarga', value: '25 segundos' },
      { label: 'Aplicación', value: 'Sala técnica' },
      { label: 'Incluye', value: 'Soporte metálico premium' },
    ],
  },
  {
    id: 6,
    slug: 'kit-accesorios-premium',
    name: 'Kit Accesorios Premium',
    price: 24990,
    type: 'ABC',
    capacity: 'Accesorios',
    shortDesc: 'Soporte, señalética y checklist de inspección incluidos.',
    stock: 22,
    specs: [
      { label: 'Contenido', value: 'Soporte + señalética + manual' },
      { label: 'Uso', value: 'Todo tipo de extintores' },
      { label: 'Material', value: 'Acero tratado' },
      { label: 'Garantía', value: '6 meses' },
    ],
  },
  {
    id: 7,
    slug: 'extintor-abc-4kg-residencial',
    name: 'Extintor ABC 4kg Residencial',
    price: 62990,
    type: 'ABC',
    capacity: '4kg',
    shortDesc: 'Balance perfecto entre cobertura y facilidad de uso.',
    stock: 12,
    specs: [
      { label: 'Agente', value: 'PQS multipropósito' },
      { label: 'Alcance', value: '4-5 metros' },
      { label: 'Uso', value: 'Hogar y comercio' },
      { label: 'Incluye', value: 'Soporte premium' },
    ],
  },
  {
    id: 8,
    slug: 'extintor-co2-10kg-industrial',
    name: 'Extintor CO2 10kg Industrial',
    price: 249990,
    type: 'CO2',
    capacity: '10kg',
    shortDesc: 'Potencia máxima para industrias y bodegas de alto riesgo.',
    stock: 2,
    specs: [
      { label: 'Agente', value: 'CO2 limpio' },
      { label: 'Aplicación', value: 'Industrias y bodegas' },
      { label: 'Cilindro', value: 'Acero reforzado' },
      { label: 'Certificación', value: 'NCh 1430' },
    ],
  },
  {
    id: 9,
    slug: 'senaletica-premium-pack',
    name: 'Pack Señalética Premium',
    price: 18990,
    type: 'ABC',
    capacity: 'Señalética',
    shortDesc: 'Pack de señaléticas fotoluminiscentes para rutas de evacuación.',
    stock: 30,
    specs: [
      { label: 'Material', value: 'PVC fotoluminiscente' },
      { label: 'Uso', value: 'Interior/Exterior' },
      { label: 'Incluye', value: '6 señales clave' },
      { label: 'Norma', value: 'NCh 2114' },
    ],
  },
  {
    id: 10,
    slug: 'extintor-abc-9kg-comercial',
    name: 'Extintor ABC 9kg Comercial',
    price: 109990,
    type: 'ABC',
    capacity: '9kg',
    shortDesc: 'Cobertura extendida para supermercados y comercios amplios.',
    stock: 6,
    specs: [
      { label: 'Agente', value: 'PQS multipropósito' },
      { label: 'Descarga', value: '20 segundos' },
      { label: 'Certificación', value: 'NCh 1431' },
      { label: 'Incluye', value: 'Soporte y sello de seguridad' },
    ],
  },
]
