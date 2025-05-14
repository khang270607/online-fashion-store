import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload
    },
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
    }
  }
})

export const {
  setCartItems, // ✅ EXPORT NÀY BỊ THIẾU TRƯỚC ĐÂY
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer
