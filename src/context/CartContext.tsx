import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { Product } from '../lib/productsStore'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clear: () => void
  total: number
  count: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  getQuantity: (productId: string) => number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = 'pyg-extintores-cart'

const getStoredItems = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as CartItem[]
  } catch {
    return []
  }
}

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>(() => getStoredItems())
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (!existing) {
        return [...prev, { product, quantity: 1 }]
      }
      return prev.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )
    })
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const getQuantity = (productId: string) =>
    items.find((item) => item.product.id === productId)?.quantity ?? 0

  const clear = () => setItems([])

  const { total, count } = useMemo(() => {
    const countValue = items.reduce((acc, item) => acc + item.quantity, 0)
    const totalValue = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    return { total: totalValue, count: countValue }
  }, [items])

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      total,
      count,
      isCartOpen,
      openCart,
      closeCart,
      getQuantity,
    }),
    [items, total, count, isCartOpen],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
