import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity } = action.payload
      const existingItem = state.cartItems.find(item => item.productId === productId)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.cartItems.push({ productId, quantity })
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.productId !== action.payload)
    },
    updateCartItem: (state, action) => {
      const { productId, quantity } = action.payload
      const item = state.cartItems.find(item => item.productId === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    clearCart: (state) => {
      state.cartItems = []
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload // Lưu cartItems vào store
    }
  }
})

export const { addToCart, removeFromCart, updateCartItem, clearCart, setCartItems } = cartSlice.actions
export default cartSlice.reducer
