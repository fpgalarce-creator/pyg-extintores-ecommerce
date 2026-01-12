import { products as catalogProducts } from '../data/products'

export type ProductSpec = {
  label: string
  value: string
}

export type Product = {
  id: string
  name: string
  category: string
  price: number
  stock?: number
  description?: string
  imageUrl?: string
  slug?: string
  shortDesc?: string
  type?: string
  capacity?: string
  specs?: ProductSpec[]
}

export const STORAGE_KEY = 'pyg_products'
export const PRODUCTS_EVENT = 'pyg-products-change'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

export const normalizeCategory = (value?: string) => {
  const descriptor = (value ?? '').toLowerCase()
  if (descriptor.includes('mantencion') || descriptor.includes('mantención') || descriptor.includes('recarga')) {
    return 'Mantención de Extintores'
  }
  if (descriptor.includes('accesorio') || descriptor.includes('señal') || descriptor.includes('senal')) {
    return 'Accesorios'
  }
  return 'Extintores'
}

const mapCatalogProducts = (): Product[] =>
  catalogProducts.map((product) => ({
    id: product.id,
    name: product.name,
    category: normalizeCategory(product.category ?? product.capacity),
    price: product.price,
    stock: product.stock,
    description: product.shortDesc,
    imageUrl: product.imageUrl,
    slug: product.slug,
    shortDesc: product.shortDesc,
    type: product.type,
    capacity: product.capacity,
    specs: product.specs,
  }))

const hydrateProduct = (product: Product): Product => {
  const category = normalizeCategory(product.category || product.name || product.description)
  return {
    ...product,
    category,
    slug: product.slug ?? slugify(product.name),
    shortDesc: product.shortDesc ?? product.description,
    specs: product.specs ?? [],
  }
}

const readStoredProducts = (): Product[] | null => {
  if (typeof window === 'undefined') {
    return null
  }
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return null
  }
  try {
    const parsed = JSON.parse(raw) as Product[]
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return null
    }
    return parsed.map(hydrateProduct)
  } catch {
    return null
  }
}

export const getProducts = (): Product[] => {
  const stored = readStoredProducts()
  if (stored) {
    return stored
  }
  return mapCatalogProducts().map(hydrateProduct)
}

export const setProducts = (list: Product[]): void => {
  if (typeof window === 'undefined') {
    return
  }
  const payload = list.map(hydrateProduct)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  window.dispatchEvent(new Event(PRODUCTS_EVENT))
}

export const upsertProduct = (product: Product): void => {
  const current = getProducts()
  const index = current.findIndex((item) => item.id === product.id)
  if (index === -1) {
    setProducts([...current, product])
    return
  }
  const next = current.map((item) => (item.id === product.id ? product : item))
  setProducts(next)
}

export const deleteProduct = (id: string): void => {
  const current = getProducts()
  const next = current.filter((item) => item.id !== id)
  setProducts(next)
}
