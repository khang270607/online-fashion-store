// services/productService.js
import AuthorizedAxiosInstance from '~/utils/authorizedAxios.js'
import { API_ROOT } from '~/utils/constants.js'

// Lấy danh sách sản phẩm (phân trang)
// export const getProducts = async (page = 1, limit = 10) => {
//   try {
//     const response = await AuthorizedAxiosInstance.get(
//       `${API_ROOT}/v1/products?page=${page}&limit=${limit}`
//     )
//     console.log('Danh sách sản phẩm:', response.data)
//     return {
//       products: response.data?.data || [], // giả định backend trả về dạng { data, total }
//       total: response.data?.total || 0
//     }
//   } catch (error) {
//     console.error('Lỗi khi lấy danh sách sản phẩm:', error)
//     return { products: [], total: 0 }
//   }
// }
// Mock dữ liệu sản phẩm
export const mockProducts = [
  {
    id: 1,
    name: 'Áo thun nam basic',
    description: 'Chất liệu cotton, thoáng mát',
    price: 1000,
    imageProduct:
      'https://bizweb.dktcdn.net/100/446/974/products/ao-thun-mlb-new-era-heavy-cotton-new-york-yankees-black-13086578-2.jpg?v=1691318322277',
    category: 'Áo thun'
  }
]

// Thử nghiệm mock API lấy sản phẩm
export const getProducts = async (page = 1, limit = 10) => {
  try {
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const products = mockProducts.slice(startIndex, endIndex) // Giới hạn số lượng sản phẩm theo page và limit

    return {
      products: products,
      total: mockProducts.length
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error)
    return { products: [], total: 0 }
  }
}

// Ví dụ gọi API và lấy sản phẩm
getProducts(1, 2).then((data) => {
  console.log('Dữ liệu sản phẩm:', data.products)
  console.log('Tổng số sản phẩm:', data.total)
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
    console.error('Lỗi khi cập nhật sản phẩm:', error)
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
    const response = await AuthorizedAxiosInstance.post(
      `${API_ROOT}/v1/products`,
      data
    )
    return response.data
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error)
    console.log('Chi tiết lỗi:', error.response?.data)
    return null
  }
}
