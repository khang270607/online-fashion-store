import { useEffect, useState } from 'react'
import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart
} from './cartService.js'

export const useCart = () => {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchCart = async () => {
    setLoading(true)
    const data = await getCart()
    setCart(data)
    setLoading(false)
  }

  const handleAddToCart = async (product) => {
    const updated = await addToCart(product)
    if (updated) await fetchCart()
  }

  const handleUpdateItem = async (productId, data) => {
    const updated = await updateCartItem(productId, data)
    if (updated) await fetchCart()
  }

  const handleDeleteItem = async (productId) => {
    if (!productId || typeof productId !== 'string') {
      console.error('productId không hợp lệ:', productId)
      return
    }

    await deleteCartItem(productId)
    await fetchCart()
  }

  const handleClearCart = async () => {
    const cleared = await clearCart()
    if (cleared) await fetchCart()
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return {
    cart,
    loading,
    refresh: fetchCart,
    addToCart: handleAddToCart,
    updateItem: handleUpdateItem,
    deleteItem: handleDeleteItem,
    clearCart: handleClearCart
  }
}
