import { useState } from 'react'
import { validateCoupon } from '~/services/couponService'

const useCoupon = () => {
  const [voucher, setVoucher] = useState('')
  const [discount, setDiscount] = useState(0)
  const [discountMessage, setDiscountMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [couponId, setCouponId] = useState(null)

  const handleInputChange = (value) => {
    setVoucher(value)
    setError('')
    setDiscountMessage('') // reset message khi đổi voucher

    if (value.length > 5) {
      setError('Mã giảm giá tối đa 5 ký tự')
    }
  }

  const handleApplyVoucher = async (inputVoucher, subTotal) => {
    if (!inputVoucher) {
      setError('Vui lòng nhập mã giảm giá')
      return
    }
    if (inputVoucher.length > 5) {
      setError('Mã giảm giá tối đa 5 ký tự')
      return
    }

    setLoading(true)
    setError('')
    setDiscountMessage('')

    try {
      const result = await validateCoupon(subTotal, inputVoucher)

      if (result.valid) {
        setDiscount(result.discountAmount || 0)
        setDiscountMessage(result.message || 'Áp dụng mã giảm giá thành công!')
        setCouponId(result.id || null)
      } else {
        setDiscount(0)
        setError(result.message || 'Mã giảm giá không hợp lệ!')
      }
    } catch (error) {
      setDiscount(0)
      setError(error.message || 'Lỗi khi kiểm tra mã giảm giá')
    } finally {
      setLoading(false)
    }
  }

  return {
    voucher,
    error,
    setVoucher: handleInputChange,
    discount,
    discountMessage,
    couponId,
    loading,
    handleApplyVoucher,
  }
}

export default useCoupon
