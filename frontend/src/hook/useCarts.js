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

  const cart = useSelector(state => state.cart)

  const fetchCart = async () => {
    setLoading(true)
    const data = await getCart()
    dispatch(setCartItems(data?.cartItems || []))
    setLoading(false)
  }

  const handleAddToCart = async (payload) => {
    try {
      console.log('Gửi payload lên addToCart:', payload)
      const newItem = await addToCart(payload)
      console.log('API trả về:', newItem)

      if (newItem) {
        // So sánh productId string: cẩn thận khi productId có thể là object hoặc string
        const newProductId = typeof newItem.productId === 'object' ? newItem.productId._id : newItem.productId

        const existingItem = cart.cartItems.find(item => {
          const itemProductId = typeof item.productId === 'object' ? item.productId._id : item.productId
          return itemProductId === newProductId
        })

        let newCartItems
        if (existingItem) {
          newCartItems = cart.cartItems.map(item => {
            const itemProductId = typeof item.productId === 'object' ? item.productId._id : item.productId
            if (itemProductId === newProductId) {
              return {
                ...item,
                quantity: (Number(item.quantity) || 0) + (Number(newItem.quantity) || 0)
              }
            }
            return item
          })
        } else {
          newCartItems = [...cart.cartItems, newItem]
        }

        dispatch(setCartItems(newCartItems))
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw error
    }
  }

  const handleUpdateItem = async (productId, data) => {
    const updated = await updateCartItem(productId, data)
    if (updated) {
      dispatch(setCartItems(updated?.cartItems || []))
    }
  }

  const handleDeleteItem = async (productId) => {
    await deleteCartItem(productId)
    fetchCart()
  }

  const handleClearCart = async () => {
    const cleared = await clearCart()
    if (cleared) {
      dispatch(setCartItems([]))
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const cartCount = cart?.cartItems?.reduce((total, item) => total + (Number(item.quantity) || 0), 0) || 0

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
