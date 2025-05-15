/* eslint-disable no-console */
import AuthorizedAxiosInstance from '~/utils/authorizedAxios.js'
import { API_ROOT } from '~/utils/constants.js'

export const getAddresses = async () => {
  try {
    const response = await AuthorizedAxiosInstance.get(`${API_ROOT}/v1/shipping-addresses`)
    return response.data || []
  } catch (error) {
    console.error('Lỗi khi lấy danh sách địa chỉ:', error)
    return []
  }
}

export const createAddress = async (data) => {
  try {
    const response = await AuthorizedAxiosInstance.post(`${API_ROOT}/v1/shipping-addresses`, data)
    return response.data
  } catch (error) {
    console.error('Lỗi khi tạo địa chỉ:', error)
    throw error
  }
}

export const updateAddress = async (id, data) => {
  try {
    const response = await AuthorizedAxiosInstance.put(`${API_ROOT}/v1/shipping-addresses/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Lỗi khi cập nhật địa chỉ:', error)
    throw error
  }
}

export const deleteAddress = async (id) => {
  try {
    const response = await AuthorizedAxiosInstance.delete(`${API_ROOT}/v1/shipping-addresses/${id}`)
    return response.data
  } catch (error) {
    console.error('Lỗi khi xóa địa chỉ:', error)
    throw error
  }
}
