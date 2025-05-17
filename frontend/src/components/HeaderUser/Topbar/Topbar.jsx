import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import { Box } from '@mui/material'
import { getDiscounts } from '~/services/discountService'

const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#03235e',
  color: 'white',
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  zIndex: 1302,
  [theme.breakpoints.down('sm')]: {
    height: '30px',
    fontSize: '0.8rem'
  }
}))

const MarqueeText = styled('div')({
  display: 'inline-block',
  paddingLeft: '100%',
  animation: 'marquee 25s linear infinite',
  '@keyframes marquee': {
    '0%': { transform: 'translateX(0%)' },
    '100%': { transform: 'translateX(-100%)' }
  }
})

// Format tiền ngắn gọn: 1000000 → 1M, 100000 → 100K
const formatCurrencyShort = (value) => {
  if (value >= 1_000_000) return `${value / 1_000_000}M`
  if (value >= 1_000) return `${value / 1_000}K`
  return value.toString()
}

function Topbar() {
  const [couponText, setCouponText] = useState('🎉 Đang tải ưu đãi...')

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { discounts } = await getDiscounts()
        const activeCoupons = discounts.filter((c) => c.isActive)

        const apiTexts = activeCoupons.map((coupon) => {
          const value =
            coupon.type === 'percent'
              ? `${coupon.amount}%`
              : `${formatCurrencyShort(coupon.amount)}`
          const min = coupon.minOrderValue
            ? `cho đơn hàng tối thiểu ${formatCurrencyShort(coupon.minOrderValue)}`
            : ''
          return `🎁 Voucher ${value} ${min}`
        })

        const mockTexts = [
          '🚚 Free ship với đơn hàng từ 1 triệu',
          '💸 Giảm 3 triệu cho đơn hàng 4 triệu',
          '🎉 Ưu đãi siêu hot mỗi ngày tại shop của bạn'
        ]

        const finalText = [...apiTexts, ...mockTexts].join('   ') // chỉ khoảng trắng, không có dấu "-"
        setCouponText(finalText || '⚡ Hiện tại không có ưu đãi nào khả dụng.')
      } catch (error) {
        setCouponText('⚠️ Lỗi khi tải ưu đãi')
      }
    }

    fetchCoupons()
  }, [])

  return (
    <TopBar>
      <MarqueeText>{couponText}</MarqueeText>
    </TopBar>
  )
}

export default Topbar
