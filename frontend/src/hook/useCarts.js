// hooks/useCarts.js
import { useEffect, useState } from 'react'
import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart
} from '~/services/cartService'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItems } from '~/redux/cart/cartSlice'

export const useCart = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // Accessing cart state from Redux to keep it synced
  const cart = useSelector((state) => state.cart)

  const fetchCart = async () => {
    setLoading(true)
    const data = await getCart()
    dispatch(setCartItems(data?.cartItems || []))  // Store cart items in Redux store
    setLoading(false)
  }

  const handleAddToCart = async (product) => {
    const updated = await addToCart(product)
    if (updated) {
      // Update Redux store after adding to cart
      dispatch(setCartItems(updated?.cartItems || []))
    }
  }

  const handleUpdateItem = async (productId, data) => {
    const updated = await updateCartItem(productId, data)
    if (updated) {
      // Update Redux store after item update
      dispatch(setCartItems(updated?.cartItems || []))
    }
  }

  const handleDeleteItem = async (productId) => {
    await deleteCartItem(productId)
    // Update Redux store after deletion
    fetchCart()
  }

  const handleClearCart = async () => {
    const cleared = await clearCart()
    if (cleared) {
      // Clear the cart in Redux store
      dispatch(setCartItems([]))
    }
  }

  useEffect(() => {
    fetchCart()  // Initial fetch of cart when the hook is mounted
  }, [])

  // Calculate cart count (total quantity)
  const cartCount = cart?.cartItems?.reduce((total, item) => total + item.quantity, 0) || 0

  return {
    cart,
    cartCount,
    loading,
    refresh: fetchCart,
    addToCart: handleAddToCart,
    updateItem: handleUpdateItem,
    deleteItem: handleDeleteItem,
    clearCart: handleClearCart
  }
}
