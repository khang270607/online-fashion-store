import React, { useState, useEffect } from 'react'
import {
  Box, Container, Grid, Typography, TextField, Button,
  Radio, RadioGroup, FormControlLabel, Divider, CircularProgress
} from '@mui/material'
import { styled } from '@mui/system'
import { AddressModal } from './Model/AddressModal'
import { useAddress } from '~/hook/useAddress'
import useCoupon from '~/hook/useCoupon'
import { useCart } from '~/hook/useCarts'
import { useOrder } from '~/hook/useOrder'

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.1rem',
  marginBottom: theme.spacing(2),
  textTransform: 'uppercase'
}))

const ProductItem = ({ name, price, quantity, image }) => {
  const isValid = name && typeof price === 'number' && typeof quantity === 'number'
  if (!isValid) {
    return (
      <tr>
        <td colSpan={4} style={{ color: 'red', padding: '8px' }}>
          Lỗi: Dữ liệu sản phẩm không hợp lệ.
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px' }}>
        <img
          src={image || 'https://via.placeholder.com/64'}
          alt={name}
          style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover' }}
        />
        <span>{name}</span>
      </td>
      <td style={{ textAlign: 'center' }}>{price.toLocaleString()}đ</td>
      <td style={{ textAlign: 'center' }}>{quantity}</td>
      <td style={{ textAlign: 'right' }}>{(price * quantity).toLocaleString()}đ</td>
    </tr>
  )
}


const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [openAddressModal, setOpenAddressModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [note, setNote] = useState('')

  const { addresses, fetchAddresses } = useAddress()
  const { cart, loading: cartLoading } = useCart()
  const cartItems = cart?.cartItems || []
  const subTotal = cartItems.reduce((acc, item) => {
    const product = item.product || item.productId || {}
    const price = typeof product.price === 'number' ? product.price : 0
    const quantity = typeof item.quantity === 'number' ? item.quantity : 1
    return acc + price * quantity
  }, 0)

  const {
    voucher, setVoucher, discount, discountMessage,
    loading: couponLoading, handleApplyVoucher, couponId
  } = useCoupon(subTotal)

  const total = subTotal - discount

  const { createOrder, loading: orderLoading, error: orderError, success: orderSuccess } = useOrder()

  useEffect(() => {
    fetchAddresses()
  }, [])

  const handleOpenAddressModal = () => setOpenAddressModal(true)
  const handleCloseAddressModal = () => setOpenAddressModal(false)

  const handleAddressConfirm = (addressId) => {
    const selected = addresses.find(addr => addr._id === addressId)
    setSelectedAddress(selected)
    handleCloseAddressModal()
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Vui lòng chọn địa chỉ nhận hàng')
      return
    }

    const orderData = {
      shippingAddressId: selectedAddress._id,
      total,
      paymentMethod,
      note,
    }

    // Chỉ gửi coupon khi có mã voucher hợp lệ
    if (voucher && voucher.trim() !== '') {
      orderData.couponId = couponId
      orderData.couponCode = voucher
    }

    try {
      await createOrder(orderData)
      alert('Đặt hàng thành công!')
      // TODO: Xử lý chuyển trang hoặc reset giỏ hàng nếu cần
    } catch (error) {
      alert('Đặt hàng thất bại: ' + (error.message || error))
    }
  }

  return (
    <Container sx={{ py: 4 }}>
      {cartLoading ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* LEFT */}
          <Grid item xs={12} md={8}>
            {/* Địa chỉ nhận hàng */}
            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 2, maxWidth: 600 }}>
              <Typography fontWeight={600} mb={1}>Địa Chỉ Nhận Hàng</Typography>
              {selectedAddress ? (
                <>
                  <Typography fontWeight={700}>
                    {selectedAddress.fullName} (+84) {selectedAddress.phone}
                  </Typography>
                  <Typography>
                    {selectedAddress.address}, {selectedAddress.ward}, {selectedAddress.district}, {selectedAddress.city}
                    <Typography
                      component="span"
                      sx={{ color: 'primary.main', cursor: 'pointer', ml: 1 }}
                      onClick={handleOpenAddressModal}
                    >
                      Thay Đổi
                    </Typography>
                  </Typography>
                </>
              ) : (
                <Typography>
                  Chưa có địa chỉ
                  <Typography
                    component="span"
                    sx={{ color: 'primary.main', cursor: 'pointer', ml: 1 }}
                    onClick={handleOpenAddressModal}
                  >
                    Chọn Địa Chỉ
                  </Typography>
                </Typography>
              )}
            </Box>

            {/* Danh sách sản phẩm */}
            <Box minWidth={600} sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 2 }}>
              {cartItems.length === 0 ? (
                <Typography sx={{ textAlign: 'left', py: 4, color: 'text.secondary' }}>
                  Giỏ hàng trống
                </Typography>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #ccc' }}>
                      <th style={{ textAlign: 'left', padding: '8px' }}>Sản phẩm</th>
                      <th style={{ textAlign: 'center', padding: '8px' }}>Giá</th>
                      <th style={{ textAlign: 'center', padding: '8px' }}>Số lượng</th>
                      <th style={{ textAlign: 'right', padding: '8px' }}>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => {
                      const product = item.product || item.productId || {}
                      const name = product.name || 'Sản phẩm không tên'
                      const price = typeof product.price === 'number' ? product.price : 0
                      const quantity = typeof item.quantity === 'number' ? item.quantity : 1
                      const image = product.image || 'https://via.placeholder.com/64'

                      return (
                        <ProductItem
                          key={index}
                          name={name}
                          price={price}
                          quantity={quantity}
                          image={image}
                        />
                      )
                    })}
                  </tbody>
                </table>
              )}
            </Box>

            {/* Ghi chú */}
            <TextField
              fullWidth
              label="Ghi chú đơn hàng (không bắt buộc)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              variant="outlined"
              rows={3}
              multiline
              sx={{ mb: 2 }}
            />

            {/* Phương thức thanh toán */}
            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
              <SectionTitle>Phương thức thanh toán</SectionTitle>
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel value="COD" control={<Radio />} label="COD (Thanh toán khi nhận hàng)" />
                <FormControlLabel
                  value="vnpay"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src='https://play-lh.googleusercontent.com/htxII9LeOz8fRkdW0pcvOb88aoc448v9eoxnbKEPK98NLG6iX5mSd4dbu3PX9j36dwy9=w480-h960-rw'
                        alt='VNPAY'
                        style={{ width: 24, marginRight: 8 }}
                      />
                      Thanh toán VN Pay
                    </Box>
                  }
                />
              </RadioGroup>
            </Box>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={4}>
            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
              <SectionTitle>Ưu đãi</SectionTitle>
              <TextField
                fullWidth
                label="Nhập mã giảm giá"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                size="small"
                sx={{ mb: 1 }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleApplyVoucher}
                disabled={couponLoading}
              >
                {couponLoading ? 'Đang áp dụng...' : 'Áp dụng Voucher'}
              </Button>
              {discountMessage && (
                <Typography variant="body2" color={discount > 0 ? 'success.main' : 'error'} mt={1}>
                  {discountMessage}
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Phí vận chuyển</span><span>0đ</span>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Giảm giá</span><span>{discount.toLocaleString()}đ</span>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tạm tính</span><span>{subTotal.toLocaleString()}đ</span>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, mt: 1 }}>
                  <span>Tổng cộng</span><span style={{ color: '#1976d2' }}>{total.toLocaleString()}đ</span>
                </Box>
              </Box>

              <Typography variant="body2" color="success.main" mt={2}>
                Miễn phí vận chuyển
              </Typography>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handlePlaceOrder}
                disabled={orderLoading}
              >
                {orderLoading ? 'Đang đặt hàng...' : 'Đặt hàng'}
              </Button>

              {orderError && (
                <Typography color="error" mt={1}>
                  Lỗi đặt hàng: {typeof orderError === 'string' ? orderError : JSON.stringify(orderError)}
                </Typography>
              )}

              {orderSuccess && (
                <Typography color="success.main" mt={1}>
                  Đặt hàng thành công!
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      )}

      <AddressModal
        open={openAddressModal}
        onClose={handleCloseAddressModal}
        onConfirm={handleAddressConfirm}
        addresses={addresses}
        selectedAddressId={selectedAddress?._id}
      />
    </Container>
  )
}

export default Payment
