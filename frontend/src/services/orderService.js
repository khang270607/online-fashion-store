import AuthorizedAxiosInstance from '~/utils/authorizedAxios.js'
import { API_ROOT } from '~/utils/constants.js'

const orderService = {
  createOrder: async ({ shippingAddressId, total, couponId, couponCode, paymentMethod, note }) => {
    try {
      // Tạo payload
      const payload = {
        shippingAddressId,
        total,
        paymentMethod,
        note,
      }
      // Nếu couponCode có giá trị, thêm couponId và couponCode
      if (couponCode && couponCode.trim() !== '') {
        payload.couponId = couponId
        payload.couponCode = couponCode
      }

      const response = await AuthorizedAxiosInstance.post(`${API_ROOT}/v1/orders`, payload)
      return response.data
    } catch (error) {
      // Ném lỗi lên để hook hoặc component xử lý
      throw error.response?.data || error.message || 'Đặt hàng thất bại'
    }
  },
}

export default orderService