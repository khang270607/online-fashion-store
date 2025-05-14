import AuthorizedAxiosInstance from '~/utils/authorizedAxios.js'
import { API_ROOT } from '~/utils/constants.js'

// Lấy danh sách địa chỉ
export const getAddresses = async () => {
  try {
    const res = await AuthorizedAxiosInstance.get(`${API_ROOT}/v1/addresses`)
    return res.data?.addresses || res.data || []
  } catch (error) {
    console.error('Lỗi khi lấy danh sách địa chỉ:', error)
    return []
  }
}

// Lấy chi tiết địa chỉ theo ID
export const getAddressById = async (id) => {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('ID địa chỉ không hợp lệ')
    }
    const res = await AuthorizedAxiosInstance.get(`${API_ROOT}/v1/addresses/${id}`)
    return res.data || {}
  } catch (error) {
    console.error(`Lỗi khi lấy địa chỉ ID ${id}:`, error)
    return {}
  }
}

// Thêm địa chỉ mới
export const createAddress = async (data) => {
  try {
    const res = await AuthorizedAxiosInstance.post(`${API_ROOT}/v1/addresses`, data)
    return res.data
  } catch (error) {
    console.error('Lỗi khi thêm địa chỉ mới:', error.response?.data || error)
    throw error
  }
}

// Cập nhật địa chỉ
export const updateAddress = async (id, data) => {
  try {
    const res = await AuthorizedAxiosInstance.put(`${API_ROOT}/v1/addresses/${id}`, data)
    return res.data
  } catch (error) {
    console.error(`Lỗi khi cập nhật địa chỉ ID ${id}:`, error.response?.data || error)
    throw error
  }
}

// Xóa địa chỉ
export const deleteAddress = async (id) => {
  try {
    const res = await AuthorizedAxiosInstance.delete(`${API_ROOT}/v1/addresses/${id}`)
    return res.data
  } catch (error) {
    console.error(`Lỗi khi xóa địa chỉ ID ${id}:`, error)
    throw error
  }
}
