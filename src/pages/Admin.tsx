import { useEffect, useMemo, useState } from 'react'
import Container from '../components/Container'
import Button from '../components/Button'
import { products as catalogProducts } from '../data/products'

const STORAGE_KEY = 'pyg_admin_products'

const categories = ['Extintores', 'Mantención de Extintores', 'Accesorios']

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined
const isCloudinaryConfigured = Boolean(cloudName && uploadPreset)

type AdminProduct = {
  id: string
  name: string
  category: string
  price: number
  description: string
  stock?: number
  imageUrl?: string
}

const mapDefaultProducts = (): AdminProduct[] =>
  catalogProducts.map((product) => ({
    id: `catalog-${product.id}`,
    name: product.name,
    category: product.capacity === 'Accesorios' || product.capacity === 'Señalética' ? 'Accesorios' : 'Extintores',
    price: product.price,
    description: product.shortDesc,
    stock: product.stock,
    imageUrl: product.imageUrl,
  }))

const loadProducts = (): AdminProduct[] => {
  if (typeof window === 'undefined') {
    return mapDefaultProducts()
  }
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return mapDefaultProducts()
  }
  try {
    const parsed = JSON.parse(raw) as AdminProduct[]
    if (!Array.isArray(parsed)) {
      return mapDefaultProducts()
    }
    return parsed
  } catch {
    return mapDefaultProducts()
  }
}

const persistProducts = (items: AdminProduct[]) => {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value)

const uploadToCloudinary = async (file: File): Promise<string> => {
  if (!cloudName || !uploadPreset) {
    throw new Error('Faltan las variables de Cloudinary en el entorno.')
  }
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('No se pudo subir la imagen.')
  }

  const data = (await response.json()) as { secure_url?: string }
  if (!data.secure_url) {
    throw new Error('No se recibió la URL de la imagen.')
  }

  return data.secure_url
}

const Admin = () => {
  const [items, setItems] = useState<AdminProduct[]>(() => loadProducts())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formState, setFormState] = useState({
    name: '',
    category: categories[0],
    price: '',
    description: '',
    stock: '',
    imageUrl: '',
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [uploadMessage, setUploadMessage] = useState('')

  const isEditing = Boolean(editingId)
  const sortedItems = useMemo(
    () => items.slice().sort((a, b) => a.name.localeCompare(b.name)),
    [items],
  )

  const uploadMessageClass =
    uploadStatus === 'error'
      ? 'text-red-200/80'
      : uploadStatus === 'success'
        ? 'text-emerald-200/80'
        : 'text-white/60'

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const resetForm = () => {
    setFormState({
      name: '',
      category: categories[0],
      price: '',
      description: '',
      stock: '',
      imageUrl: '',
    })
    setSelectedFile(null)
    setPreviewUrl(null)
    setUploadStatus('idle')
    setUploadMessage('')
    setEditingId(null)
  }

  const updateField = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setSelectedFile(file)
    setUploadStatus('idle')
    setUploadMessage('')
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
    } else {
      setPreviewUrl(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('error')
      setUploadMessage('Selecciona una imagen antes de subirla.')
      return
    }
    if (!isCloudinaryConfigured) {
      setUploadStatus('error')
      setUploadMessage('Faltan variables de entorno de Cloudinary.')
      return
    }
    setUploadStatus('uploading')
    setUploadMessage('Subiendo imagen...')
    try {
      const secureUrl = await uploadToCloudinary(selectedFile)
      setFormState((prev) => ({ ...prev, imageUrl: secureUrl }))
      setUploadStatus('success')
      setUploadMessage('Imagen subida con éxito.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al subir la imagen.'
      setUploadStatus('error')
      setUploadMessage(message)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const priceValue = Number(formState.price)
    if (!formState.name || !formState.description || Number.isNaN(priceValue)) {
      return
    }

    const stockValue = formState.stock ? Number(formState.stock) : undefined
    const imageUrlValue = formState.imageUrl.trim()
    const nextItem: AdminProduct = {
      id: editingId ?? `custom-${Date.now()}`,
      name: formState.name,
      category: formState.category,
      price: priceValue,
      description: formState.description,
      stock: Number.isNaN(stockValue) ? undefined : stockValue,
      imageUrl: imageUrlValue ? imageUrlValue : undefined,
    }

    const nextItems = editingId
      ? items.map((item) => (item.id === editingId ? nextItem : item))
      : [...items, nextItem]

    setItems(nextItems)
    persistProducts(nextItems)
    resetForm()
  }

  const handleEdit = (item: AdminProduct) => {
    setEditingId(item.id)
    setFormState({
      name: item.name,
      category: item.category,
      price: String(item.price),
      description: item.description,
      stock: item.stock ? String(item.stock) : '',
      imageUrl: item.imageUrl ?? '',
    })
    setSelectedFile(null)
    setPreviewUrl(null)
    setUploadStatus('idle')
    setUploadMessage('')
  }

  const handleDelete = (id: string) => {
    const nextItems = items.filter((item) => item.id !== id)
    setItems(nextItems)
    persistProducts(nextItems)
    if (editingId === id) {
      resetForm()
    }
  }

  return (
    <Container>
      <div className="space-y-8 pb-20">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Panel admin</p>
          <h1 className="text-3xl font-semibold text-white">Gestión de productos PYG</h1>
          <p className="text-white/70">
            Crea, edita o elimina productos desde este panel. Los cambios se guardan localmente.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="product-name">
                Nombre
              </label>
              <input
                id="product-name"
                value={formState.name}
                onChange={(event) => updateField('name', event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                placeholder="Extintor ABC 6kg"
                required
              />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm text-white/70" htmlFor="product-category">
                  Categoría
                </label>
                <select
                  id="product-category"
                  value={formState.category}
                  onChange={(event) => updateField('category', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70" htmlFor="product-price">
                  Precio (CLP)
                </label>
                <input
                  id="product-price"
                  type="number"
                  min={0}
                  value={formState.price}
                  onChange={(event) => updateField('price', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  placeholder="45000"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="product-description">
                Descripción corta
              </label>
              <textarea
                id="product-description"
                value={formState.description}
                onChange={(event) => updateField('description', event.target.value)}
                className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                placeholder="Descripción breve del producto..."
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="product-image">
                Imagen del producto
              </label>
              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <input
                  id="product-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-white/80 file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white/80 hover:file:bg-white/20"
                />
                <div className="flex h-36 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-xs text-white/50">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Vista previa local"
                      className="h-full w-full object-cover"
                    />
                  ) : formState.imageUrl ? (
                    <img
                      src={formState.imageUrl}
                      alt="Imagen del producto"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>Vista previa de imagen</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleUpload}
                    disabled={!selectedFile || uploadStatus === 'uploading' || !isCloudinaryConfigured}
                  >
                    {uploadStatus === 'uploading' ? 'Subiendo...' : 'Subir imagen'}
                  </Button>
                  {formState.imageUrl ? (
                    <span className="text-xs text-emerald-200/80">URL lista para guardar.</span>
                  ) : null}
                </div>
                {uploadMessage ? <p className={`text-xs ${uploadMessageClass}`}>{uploadMessage}</p> : null}
                {!isCloudinaryConfigured ? (
                  <p className="text-xs text-amber-200/80">
                    Configura VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET para subir
                    imágenes.
                  </p>
                ) : null}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="product-stock">
                Stock (opcional)
              </label>
              <input
                id="product-stock"
                type="number"
                min={0}
                value={formState.stock}
                onChange={(event) => updateField('stock', event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                placeholder="20"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="submit" variant="primary">
                {isEditing ? 'Actualizar producto' : 'Crear producto'}
              </Button>
              {isEditing ? (
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancelar edición
                </Button>
              ) : null}
            </div>
          </form>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/50">
                  <tr>
                    <th className="px-4 py-3">Producto</th>
                    <th className="px-4 py-3">Categoría</th>
                    <th className="px-4 py-3">Precio</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedItems.map((item) => (
                    <tr key={item.id} className="border-t border-white/5">
                      <td className="px-4 py-4">
                        <div className="text-white">{item.name}</div>
                        <p className="text-xs text-white/50">{item.description}</p>
                      </td>
                      <td className="px-4 py-4 text-white/70">{item.category}</td>
                      <td className="px-4 py-4 text-white/70">{formatCurrency(item.price)}</td>
                      <td className="px-4 py-4 text-white/70">{item.stock ?? '—'}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="rounded-full border border-red-400/30 px-3 py-1 text-xs font-semibold text-red-200 transition hover:border-red-400/60"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Admin
