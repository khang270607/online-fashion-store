import AuthorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

// Lấy danh sách giao dịch theo orderId
export const getTransactionsByOrderId = async (orderId) => {
  try {
    const response = await AuthorizedAxiosInstance.get(
      `${API_ROOT}/v1/payment-transactions`, // chỉ gọi endpoint này
      { params: { orderId } } // truyền orderId dưới dạng query param
    )
    return response.data
  } catch (error) {
    console.error(
      `Lỗi khi lấy danh sách giao dịch của đơn hàng ${orderId}:`,
      error
    )
    return []
  }
}

// Lấy chi tiết giao dịch theo transactionId
export const getTransactionById = async (transactionId) => {
  try {
    const response = await AuthorizedAxiosInstance.get(
      `${API_ROOT}/v1/payment-transactions/${transactionId}`
    )
    return response.data
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết giao dịch ${transactionId}:`, error)
    return null
  }
}

export const updateTransactionById = async (transactionId, updateData) => {
  try {
    const response = await AuthorizedAxiosInstance.patch(
      `${API_ROOT}/v1/payment-transactions/${transactionId}`,
      updateData
    )
    return response.data
  } catch (error) {
    console.error(`Lỗi khi cập nhật giao dịch ${transactionId}:`, error)
    return null
  }
}

export const deleteTransactionById = async (transactionId) => {
  try {
    await AuthorizedAxiosInstance.delete(
      `${API_ROOT}/v1/payment-transactions/${transactionId}`
    )
    return true
  } catch (error) {
    console.error(`Lỗi khi xoá giao dịch ${transactionId}:`, error)
    return false
  }
}
