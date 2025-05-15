// hooks/useCoupon.js
import { useState } from 'react'
import { validateCoupon } from '~/services/couponService'

const useCoupon = (subTotal) => {
  const [voucher, setVoucher] = useState('')
  const [discount, setDiscount] = useState(0)
  const [discountMessage, setDiscountMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleApplyVoucher = async () => {
    if (!voucher) {
      setDiscountMessage('Vui lòng nhập mã giảm giá!')
      return
    }

    setLoading(true)
    try {
      // Gọi API kiểm tra mã giảm giá
      const result = await validateCoupon(subTotal, voucher)

      if (result.valid) {
        setDiscount(result.discountAmount || 0)
        setDiscountMessage(result.message || 'Áp dụng mã giảm giá thành công!')
      } else {
        setDiscount(0)
        setDiscountMessage(result.message || 'Mã giảm giá không hợp lệ!')
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra mã giảm giá:', error)
      setDiscount(0)
      setDiscountMessage('Lỗi từ hệ thống, vui lòng thử lại sau!')
    } finally {
      setLoading(false)
    }
  }

  return {
    voucher,
    setVoucher,
    discount,
    discountMessage,
    loading,
    handleApplyVoucher
  }
}

export default useCoupon
