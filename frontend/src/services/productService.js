// services/productService.js
import AuthorizedAxiosInstance from '~/utils/authorizedAxios.js'
import { API_ROOT } from '~/utils/constants.js'

// Lấy danh sách sản phẩm (phân trang)
export const getProducts = async (page = 1, limit = 10) => {
  try {
    const response = await AuthorizedAxiosInstance.get(
      `${API_ROOT}/v1/products?page=${page}&limit=${limit}`
    )
    console.log('Danh sách sản phẩm:', response.data)
    return {
      products: response.data || [],
      total: response.data.total || 0
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error)
    return { products: [], total: 0 }
  }
}

// Ví dụ gọi API và lấy sản phẩm
getProducts(1, 2).then((data) => {
  console.log('Dữ liệu sản phẩm:', data.products)
})

// Lấy chi tiết sản phẩm theo ID
export const getProductById = async (productId) => {
  try {
    const response = await AuthorizedAxiosInstance.get(
      `${API_ROOT}/v1/products/${productId}`
    )
    return response.data
  } catch (error) {
    console.error('Lỗi khi lấy thông tin sản phẩm:', error)
    return null
  }
}

// Cập nhật sản phẩm
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await AuthorizedAxiosInstance.patch(
      `${API_ROOT}/v1/products/${productId}`,
      updatedData
    )
    return response.data
  } catch (error) {
    console.error(
      'Lỗi khi cập nhật sản phẩm:',
      error.response ? error.response.data : error
    )
    return null
  }
}

// Xoá sản phẩm
export const deleteProduct = async (productId) => {
  try {
    const response = await AuthorizedAxiosInstance.delete(
      `${API_ROOT}/v1/products/${productId}`
    )
    return response.data
  } catch (error) {
    console.error('Lỗi khi xoá sản phẩm:', error)
    return null
  }
}

// Thêm sản phẩm mới
export const addProduct = async (data) => {
  try {
    console.log('data', data)
    const response = await AuthorizedAxiosInstance.post(
      `${API_ROOT}/v1/products`,
      data
    )

    return response.data
  } catch (error) {
    return error
  }
}
