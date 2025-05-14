import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider
} from '@mui/material'
import { styled } from '@mui/system'
import { AddressModal } from './Model/AddressModal'

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.1rem',
  marginBottom: theme.spacing(2),
  textTransform: 'uppercase'
}))

const ProductItem = ({ name, price, quantity, image }) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #eee',
    py: 1
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center', flex: 3 }}>
      <Box component="img" src={image} alt={name} sx={{ width: 64, height: 64, mr: 2, borderRadius: 1 }} />
      <Typography variant="body2">{name}</Typography>
    </Box>
    <Typography variant="body2" sx={{ flex: 1, textAlign: 'center' }}>{price.toLocaleString()}đ</Typography>
    <Typography variant="body2" sx={{ flex: 1, textAlign: 'center' }}>{quantity}</Typography>
    <Typography variant="body2" sx={{ flex: 1, textAlign: 'right' }}>
      {(price * quantity).toLocaleString()}đ
    </Typography>
  </Box>
)

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [voucher, setVoucher] = useState('')
  const [openAddressModal, setOpenAddressModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)

  const handleApplyVoucher = () => {
    console.log('Voucher applied:', voucher)
  }

  const handleOpenAddressModal = () => setOpenAddressModal(true)
  const handleCloseAddressModal = () => setOpenAddressModal(false)
  const handleAddressConfirm = (addressId) => {
    const selected = cartItems.find(item => item.id === addressId)
    setSelectedAddress(selected)
    handleCloseAddressModal()
  }

  const cartItems = [
    {
      name: 'Áo thun trắng',
      price: 199000,
      quantity: 2,
      image: 'https://bizweb.dktcdn.net/100/415/697/products/ts170.png?v=1701401873157'
    },
    {
      name: 'Quần jean xanh',
      price: 349000,
      quantity: 1,
      image: 'https://bizweb.dktcdn.net/100/415/697/products/ts170.png?v=1701401873157'
    }
  ]

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {/* Phần bên trái */}
        <Grid item xs={12} md={8}>
          {/* Địa chỉ nhận hàng */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 3 }}>
            <Typography fontWeight={600} mb={1}>
              Địa Chỉ Nhận Hàng
            </Typography>
            <Typography fontWeight={700}>
              {selectedAddress ? selectedAddress.name : 'abc 1111 (+84) 984142332'}
            </Typography>
            <Typography>
              {selectedAddress ? selectedAddress.line1 : 'abc/123, Xã Côn Đảo, Huyện Côn Đảo, Bà Rịa - Vũng Tàu'}
              <Typography
                component="span"
                sx={{ color: 'primary.main', cursor: 'pointer', ml: 1 }}
                onClick={handleOpenAddressModal}
              >
                Thay Đổi
              </Typography>
            </Typography>
          </Box>

          {/* Danh sách sản phẩm */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 3 }}>
            <SectionTitle>Sản phẩm</SectionTitle>
            {cartItems.map((item, index) => (
              <ProductItem key={index} {...item} />
            ))}
          </Box>

          {/* Phương thức thanh toán */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
            <SectionTitle>Phương thức thanh toán</SectionTitle>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel value="COD" control={<Radio />} label="COD (Thanh toán khi nhận hàng)" />
              <FormControlLabel
                value="MOMO"
                control={<Radio />}
                label={<Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src='https://play-lh.googleusercontent.com/htxII9LeOz8fRkdW0pcvOb88aoc448v9eoxnbKEPK98NLG6iX5mSd4dbu3PX9j36dwy9=w480-h960-rw'
                    alt='VNPAY'
                    style={{ width: 24, marginRight: 8 }}
                  />
                  Thanh toán VN Pay
                </Box>}
              />
            </RadioGroup>
          </Box>
        </Grid>

        {/* Phần bên phải */}
        <Grid item xs={12} md={4}>
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
            <SectionTitle>Ưu đãi</SectionTitle>
            <TextField
              fullWidth
              label="Nhập mã giảm giá"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              size="small"
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleApplyVoucher}
            >
              Áp dụng Voucher
            </Button>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Phí vận chuyển</span>
                <span>0đ</span>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Giảm giá</span>
                <span>0đ</span>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Tạm tính</span>
                <span>747.000đ</span>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, mt: 1 }}>
                <span>Tổng cộng</span>
                <span style={{ color: '#1976d2' }}>747.000đ</span>
              </Box>
            </Box>

            <Typography variant="body2" color="success.main" mt={2}>
              Miễn phí vận chuyển
            </Typography>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, py: 1.5, fontWeight: 600 }}
            >
              Đặt hàng
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Address Modal */}
      <AddressModal
        open={openAddressModal}
        onClose={handleCloseAddressModal}
        onConfirm={handleAddressConfirm}
      />
    </Container>
  )
}

export default Payment
