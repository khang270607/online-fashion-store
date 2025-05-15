import AuthorizedAxiosInstance from '~/utils/authorizedAxios.js'
import { API_ROOT } from '~/utils/constants.js'

export const validateCoupon = async (cartTotal, couponCode) => {
  try {
    const response = await AuthorizedAxiosInstance.post(`${API_ROOT}/v1/coupons/validate`, {
      cartTotal,
      couponCode
    })
    return response.data
  } catch (error) {
    console.error('Lỗi khi kiểm tra mã giảm giá:', error)
    throw error
  }
}
