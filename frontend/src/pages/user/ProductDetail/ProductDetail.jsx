import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Chip,
  ButtonGroup,
  TextField,
  Fade
} from '@mui/material'
import { styled } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'

// Styled Components
const ProductImage = styled('img')(() => ({
  width: '100%',
  height: '100%',
  borderRadius: '8px',
  objectFit: 'cover'
}))

const Thumbnail = styled('img')(({ selected }) => ({
  width: 80,
  height: 80,
  borderRadius: 4,
  border: selected ? '2px solid #1976d2' : '1px solid #ccc',
  cursor: 'pointer',
  objectFit: 'cover',
  transition: 'border 0.3s ease'
}))

const PriceTypography = styled(Typography)({
  color: '#d32f2f',
  fontWeight: 700
})

const VoucherChip = styled(Chip)({
  margin: '4px',
  backgroundColor: '#fff',
  border: '1px solid #ccc'
})

const ProductDetail = () => {
  const [color, setColor] = useState('Đen')
  const [size, setSize] = useState('S')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  const images = [
    'https://city89.com/wp-content/uploads/2023/03/C89-0095-mockup-black-back.jpg',
    'https://city89.com/wp-content/uploads/2023/03/C89-0095-mockup-black-front.jpg',
    'https://city89.com/wp-content/uploads/2023/03/C89-0095-mockup-black-back.jpg',
    'https://city89.com/wp-content/uploads/2023/03/C89-0095-mockup-black-front.jpg'
  ]

  const handleImageClick = (index) => {
    if (index !== selectedImageIndex) {
      setFadeIn(false)
      setTimeout(() => {
        setSelectedImageIndex(index)
        setFadeIn(true)
      }, 150)
    }
  }

  const handleColorChange = (value) => setColor(value)
  const handleSizeChange = (value) => setSize(value)
  const handleQuantityChange = (delta) =>
    setQuantity((prev) => Math.max(1, prev + delta))

  return (
    <Container maxWidth='lg' sx={{ py: 4, mt: 20 }}>
      <Grid container spacing={4}>
        {/* Bên trái: hình ảnh sản phẩm */}
        <Grid item xs={12} md={6}>
          <Box sx={{ width: 400, height: 450, mr: 3 }}>
            <Fade in={fadeIn} timeout={300} key={selectedImageIndex}>
              <Box>
                <ProductImage
                  src={images[selectedImageIndex]}
                  alt='Áo Thun Nam'
                  sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </Box>
            </Fade>
          </Box>

          {/* Ảnh nhỏ phía dưới */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1
            }}
          >
            {images.map((img, index) => (
              <Thumbnail
                key={img}
                src={img}
                alt={`thumbnail-${index}`}
                selected={index === selectedImageIndex}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </Box>
        </Grid>

        {/* Bên phải: Thông tin sản phẩm */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant='h5' fontWeight={700}>
              Áo Thun Nam Họa Tiết In Xốp BẾ VIỆT NAM Form Regular
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Mã sản phẩm: ATIDO0616-01
            </Typography>

            <PriceTypography variant='h5'>349,000đ</PriceTypography>

            <Box sx={{ border: '1px dashed #d32f2f', p: 1.5, borderRadius: 1 }}>
              <Typography variant='body2' color='error' fontWeight={700}>
                <LocalOfferIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                KHUYẾN MÃI - ƯU ĐÃI
              </Typography>
              <Typography variant='body2'>
                5.5 HÈ VỀ - SALE BÙNG CHÁY
              </Typography>
              <Typography variant='body2'>
                Nhập mã D15 GIẢM 15K đơn từ 255K
              </Typography>
              <Typography variant='body2'>
                Nhập mã D35 GIẢM 35K cho đơn từ 555K
              </Typography>
              <Typography variant='body2'>
                Nhập mã D55 GIẢM 55K cho đơn từ 755K
              </Typography>
              <Typography variant='body2'>
                Nhập mã D155 GIẢM 155K cho đơn từ 1155K
              </Typography>
              <Typography variant='body2'>Freeship đơn từ 155K</Typography>
            </Box>

            <Box>
              <Typography variant='body2' fontWeight={700} sx={{ mb: 0.5 }}>
                Mã giảm giá
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <VoucherChip label='VOUCHER15K' />
                <VoucherChip label='VOUCHER35K' />
                <VoucherChip label='VOUCHER55K' />
                <VoucherChip label='VOUCHER155K' />
              </Box>
            </Box>

            {/* Màu sắc */}
            <Box>
              <Typography variant='body2' fontWeight={700} sx={{ mb: 0.5 }}>
                Màu sắc: {color}
              </Typography>
              <ButtonGroup>
                {['Đen', 'Trắng', 'Xanh', 'Đỏ'].map((c) => (
                  <Button
                    key={c}
                    variant={color === c ? 'contained' : 'outlined'}
                    onClick={() => handleColorChange(c)}
                  >
                    {c}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>

            {/* Kích thước */}
            <Box>
              <Typography variant='body2' fontWeight={700} sx={{ mb: 0.5 }}>
                Kích thước: {size}{' '}
                <Typography component='span' variant='body2' color='primary'>
                  (Hướng dẫn chọn size)
                </Typography>
              </Typography>
              <ButtonGroup>
                {['S', 'M', 'L', 'XL'].map((s) => (
                  <Button
                    key={s}
                    variant={size === s ? 'contained' : 'outlined'}
                    onClick={() => handleSizeChange(s)}
                  >
                    {s}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>

            {/* Số lượng và hành động */}
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <IconButton
                  onClick={() => handleQuantityChange(-1)}
                  size='small'
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  value={quantity}
                  size='small'
                  sx={{ width: '50px', textAlign: 'center' }}
                  inputProps={{ style: { textAlign: 'center' } }}
                  disabled
                />
                <IconButton
                  onClick={() => handleQuantityChange(1)}
                  size='small'
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                variant='contained'
                color='primary'
                size='large'
                sx={{ flex: 1 }}
              >
                Thêm vào giỏ
              </Button>
              <Button
                variant='contained'
                color='secondary'
                size='large'
                sx={{ flex: 1 }}
              >
                Mua ngay
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mt: 5 }}>
        <Typography variant='h6'>MÔ TẢ SẢN PHẨM</Typography>
        <Typography variant='body2'>
          Chất vải thun cotton cao cấp mang đến cảm giác mặc dễ chịu khi mặc nhờ
          bề mặt vải mềm mịn, độ dày vừa vặn và khả năng thấm hút mồ hôi tốt.
          Vải được xử lý kỹ, cho cảm giác mát lạnh khi tiếp xúc với da – phù hợp
          thời tiết nắng nóng, dễ dàng bảo quản.
        </Typography>
        <Typography variant='h6' sx={{ mt: 2 }}>
          {' '}
          FORM REGULAR ỨNG DỤNG CAO – DỄ PHỐI, DỄ MẶC
        </Typography>
        <Typography variant='body2'>
          Dáng áo regular vừa vặn với vai xuôi, tay áo được xử lý chắc chắn giúp
          tổng thể gọn gàng, thoải mái khi vận động. Phù hợp với nhiều dáng
          người và hoàn cảnh mặc – từ xuống phố, đi làm đến những ngày dạo chơi
          cuối tuần.
        </Typography>
      </Box>
    </Container>
  )
}

export default ProductDetail
