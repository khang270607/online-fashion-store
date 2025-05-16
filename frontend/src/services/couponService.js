import AuthorizedAxiosInstance from '~/utils/authorizedAxios.js'

const COUPON_API = 'http://localhost:8017/v1/coupons'

/**
 * Lấy danh sách tất cả coupon
 * @returns {Promise<Object>} Object chứa danh sách coupon và tổng số
 */
export const getListCoupons = async () => {
  try {
    const response = await AuthorizedAxiosInstance.get(COUPON_API)
    console.log('API getListCoupons response:', response.data)
    return {
      coupons: response.data.coupons || response.data || [],
      total: response.data.total || response.data.length || 0
    }
  } catch (error) {
    console.error(
      'Lỗi khi lấy danh sách coupon:',
      error.response?.data || error
    )
    return { coupons: [], total: 0 }
  }
}

/**
 * Lấy thông tin chi tiết một coupon theo ID hoặc mã
 * @param {string} couponIdOrCode - ID hoặc mã coupon cần lấy
 * @returns {Promise<Object|null>} Dữ liệu coupon hoặc null nếu lỗi
 */
export const getCoupon = async (couponIdOrCode) => {
  try {
    if (typeof couponIdOrCode !== 'string' || !couponIdOrCode) {
      throw new Error('couponIdOrCode phải là chuỗi không rỗng')
    }
    const response = await AuthorizedAxiosInstance.get(
      `${COUPON_API}/${couponIdOrCode}`
    )
    console.log('API getCoupon response:', response.data)
    return response.data
  } catch (error) {
    console.error(
      'Lỗi khi lấy thông tin coupon:',
      error.response?.data || error
    )
    return null
  }
}
