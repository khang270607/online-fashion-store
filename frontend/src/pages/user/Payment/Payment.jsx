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
  FormControl,
  Select,
  MenuItem,
  Divider
} from '@mui/material'
import { styled } from '@mui/system'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

// Styled Components
const CartHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #ddd'
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2)
}))

const TotalBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#e3f2fd',
  padding: theme.spacing(2),
  borderRadius: 4
}))

const Payment = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [voucher, setVoucher] = useState('')

  const provinces = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng']
  const districts = ['Quận 1', 'Quận 2', 'Quận 3']
  const wards = ['Phường 1', 'Phường 2', 'Phường 3']

  const handleApplyVoucher = () => {
    // Logic áp dụng voucher
    console.log('Voucher applied:', voucher)
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <CartHeader>
        <Typography variant='h6'>Giỏ hàng</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ShoppingCartIcon sx={{ mr: 1 }} />
          <Typography>0 Sản phẩm</Typography>
        </Box>
      </CartHeader>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Thông tin đặt hàng */}
        <Grid item xs={12} md={8}>
          <SectionTitle variant='h6'>Thông tin đặt hàng</SectionTitle>
          <TextField
            fullWidth
            label='Họ và tên'
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label='Số điện thoại'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value=''>Chọn Tỉnh/Thành phố</MenuItem>
                  {provinces.map((prov) => (
                    <MenuItem key={prov} value={prov}>
                      {prov}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value=''>Chọn Quận/Huyện</MenuItem>
                  {districts.map((dist) => (
                    <MenuItem key={dist} value={dist}>
                      {dist}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value=''>Chọn Phường/Xã</MenuItem>
                  {wards.map((ward) => (
                    <MenuItem key={ward} value={ward}>
                      {ward}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label='Địa chỉ'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label='Ghi chú (nếu có)'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Phương thức thanh toán */}
          <SectionTitle variant='h6'>Phương thức thanh toán</SectionTitle>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value='COD'
              control={<Radio />}
              label='COD (Thanh toán khi nhận hàng)'
            />
            <FormControlLabel
              value='MOMO'
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
        </Grid>

        {/* Tổng đơn hàng */}
        <Grid item xs={12} md={4}>
          <SectionTitle variant='h6'>ƯU ĐÃI</SectionTitle>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label='Nhập mã giảm giá'
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={handleApplyVoucher}
              fullWidth
            >
              Áp dụng Voucher
            </Button>
          </Box>
          <TotalBox>
            <Typography variant='body2'>Phí vận chuyển: 0đ</Typography>
            <Typography variant='body2'>Voucher giảm giá: 0đ</Typography>
            <Typography variant='body2'>
              Chưa tính tiền hàng trong giỏ
            </Typography>
            <Typography variant='body2'>Tổng: 0đ</Typography>
          </TotalBox>
          <Divider sx={{ my: 2 }} />
          <Typography variant='body2' color='error'>
            Tạm tính: 0đ
          </Typography>
          <Typography variant='body2' color='error'>
            Miễn phí
          </Typography>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
          >
            Đặt hàng
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Payment
