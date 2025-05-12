import axios from '~/utils/axiosConfig'

export const getCart = async () => {
  const response = await axios.get('/cart')
  return response.data
}

export const updateCartItem = async (productId, quantity) => {
  const response = await axios.put(`/cart/${productId}`, { quantity })
  return response.data
}

export const removeFromCart = async (productId) => {
  const response = await axios.delete(`/cart/${productId}`)
  return response.data
}
