import React, { useState, useEffect } from 'react'
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
  Fade,
  Snackbar,
  Alert
} from '@mui/material'
import { styled } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { useParams } from 'react-router-dom'
import { getProductById } from '~/services/productService'
import AuthorizedAxiosInstance from '~/utils/authorizedAxios'

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
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [color, setColor] = useState('Đen')
  const [size, setSize] = useState('S')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const colors = ['Đen', 'Trắng', 'Xanh', 'Đỏ']
  const sizes = ['S', 'M', 'L', 'XL']

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        console.log('Current URL:', window.location.href)
        console.log('useParams productId:', productId)
        if (
          !productId ||
          typeof productId !== 'string' ||
          !/^[0-9a-fA-F]{24}$/.test(productId)
        ) {
          throw new Error('ID sản phẩm không hợp lệ.')
        }
        const data = await getProductById(productId)
        console.log('Product data from API:', data) // Debug
        if (data && Object.keys(data).length > 0) {
          setProduct({
            ...data,
            images: data.images || data.image || ['/default.jpg'],
            name: data.name || 'Sản phẩm không tên'
          })
        } else {
          setError('Sản phẩm không tồn tại.')
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Không thể tải thông tin sản phẩm. Vui lòng thử lại.'
        console.error('Lỗi khi lấy chi tiết sản phẩm:', errorMessage)
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

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

  const handleAddToCart = async () => {
    try {
      if (!product?._id || !/^[0-9a-fA-F]{24}$/.test(product._id)) {
        throw new Error('ID sản phẩm không hợp lệ để thêm vào giỏ hàng.')
      }
      await AuthorizedAxiosInstance.post('/v1/cart', {
        productId: product._id,
        quantity,
        color,
        size
      })
      setOpenSnackbar(true)
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.'
      console.error('Lỗi khi thêm vào giỏ hàng:', errorMessage)
      setError(errorMessage)
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  if (isLoading) {
    return (
      <Container maxWidth='lg' sx={{ py: 4, mt: 20, textAlign: 'center' }}>
        <Typography variant='h6'>Đang tải...</Typography>
      </Container>
    )
  }

  if (error || !product || Object.keys(product).length === 0) {
    return (
      <Container maxWidth='lg' sx={{ py: 4, mt: 20, textAlign: 'center' }}>
        <Typography variant='h6' color='error'>
          {error || 'Không tìm thấy sản phẩm.'}
        </Typography>
        <Button
          variant='contained'
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Thử lại
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4, mt: 20 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ width: 400, height: 450, mr: 3 }}>
            <Fade in={fadeIn} timeout={300} key={selectedImageIndex}>
              <Box>
                <ProductImage
                  src={product.images?.[selectedImageIndex] || '/default.jpg'}
                  alt={product.name || 'Sản phẩm'}
                />
              </Box>
            </Fade>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            {product.images?.map((img, index) => (
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
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant='h5' fontWeight={700}>
              {product.name || 'Sản phẩm không tên'}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Mã sản phẩm: {product.productCode || product._id}
            </Typography>
            <PriceTypography variant='h5'>
              {product.price
                ? `${product.price.toLocaleString('vi-VN')}đ`
                : '---'}
            </PriceTypography>
            <Box sx={{ border: '1px dashed #d32f2f', p: 1.5, borderRadius: 1 }}>
              <Typography variant='body2' color='error' fontWeight={700}>
                <LocalOfferIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                KHUYẾN MÃI - ƯU ĐÃI
              </Typography>
              {product.promotions?.length > 0 ? (
                product.promotions.map((promo, index) => (
                  <Typography key={index} variant='body2'>
                    {promo}
                  </Typography>
                ))
              ) : (
                <Typography variant='body2'>
                  Không có khuyến mãi nào.
                </Typography>
              )}
            </Box>
            <Box>
              <Typography variant='body2' fontWeight={700} sx={{ mb: 0.5 }}>
                Mã giảm giá
              </Typography>
              {product.vouchers?.length > 0 ? (
                product.vouchers.map((voucher, index) => (
                  <VoucherChip key={index} label={voucher} />
                ))
              ) : (
                <Typography variant='body2'>
                  Không có mã giảm giá nào.
                </Typography>
              )}
            </Box>
            <Box>
              <Typography variant='body2' fontWeight={700} sx={{ mb: 0.5 }}>
                Màu sắc: {color}
              </Typography>
              <ButtonGroup>
                {colors.map((c) => (
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
            <Box>
              <Typography variant='body2' fontWeight={700} sx={{ mb: 0.5 }}>
                Kích thước: {size}{' '}
                <Typography component='span' variant='body2' color='primary'>
                  (Hướng dẫn chọn size)
                </Typography>
              </Typography>
              <ButtonGroup>
                {sizes.map((s) => (
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
                onClick={handleAddToCart}
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
          {product.description || 'Không có mô tả sản phẩm.'}
        </Typography>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          sx={{ width: '100%' }}
        >
          Thêm sản phẩm vào giỏ hàng thành công!
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity='error' onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default ProductDetail
