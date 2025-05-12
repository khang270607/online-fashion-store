/*
 * Yêu cầu:
 * 1. Đảm bảo các dịch vụ productService, categoryService, cartsService nằm trong thư mục services.
 * 2. Cấu hình axiosInstance.js và config.js như mô tả trong cartsService.js.
 * 3. Nếu đường dẫn dịch vụ khác, sửa lại import:
 *    import { getProducts } from './path/to/productService'
 *    import { getCategories } from './path/to/categoryService'
 *    import { getCart, addToCart } from './path/to/cartsService'
 */

import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Pagination,
  Divider,
  CardActions,
  IconButton,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Snackbar,
  Alert
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { getProducts } from '~/services/productService'
import { getCategories } from '~/services/categoryService'
import { getCart, addToCart } from '~/services/cartsService'

const PRODUCTS_PER_PAGE = 12

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 240,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  flexShrink: 0,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '& .MuiTypography-h6': {
    color: theme.palette.primary.dark,
    fontWeight: 600,
    marginBottom: theme.spacing(1)
  }
}))

const FilterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1)
}))

function Product() {
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('')
  const [origin, setOrigin] = useState('')
  const [size, setSize] = useState([])
  const [color, setColor] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [categories, setCategories] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [cart, setCart] = useState([])

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE)
  const startIndex = (page - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const displayedProducts = allProducts.slice(startIndex, endIndex)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters = {
          category: category || undefined,
          origin: origin || undefined,
          size: size.length ? size.join(',') : undefined,
          color: color.length ? color.join(',') : undefined
        }
        console.log('Gọi API với filters:', filters)
        const [productData, categoryData, cartData] = await Promise.all([
          getProducts(filters, page, PRODUCTS_PER_PAGE),
          getCategories(1, 100),
          getCart()
        ])
        setAllProducts(productData.products)
        setTotalProducts(productData.total)
        setCategories(categoryData.categories)
        setCart(cartData)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
        if (error.response?.status === 401) {
          setSnackbarMessage('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.')
          setSnackbarSeverity('error')
          setOpenSnackbar(true)
          setTimeout(() => {
            window.location.href = '/login'
          }, 2000)
        } else if (error.response?.status === 404) {
          setSnackbarMessage('API không tồn tại. Vui lòng kiểm tra đường dẫn.')
          setSnackbarSeverity('error')
          setOpenSnackbar(true)
        } else {
          setSnackbarMessage('Có lỗi xảy ra. Vui lòng thử lại.')
          setSnackbarSeverity('error')
          setOpenSnackbar(true)
        }
        setAllProducts([])
        setTotalProducts(0)
        setCategories([])
        setCart([])
      }
    }
    fetchData()
  }, [category, origin, size, color, page])

  const handleChangePage = (_, value) => setPage(value)

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    setPage(1)
  }

  const handleOriginChange = (e) => {
    setOrigin(e.target.value)
    setPage(1)
  }

  const handleSizeChange = (e) => {
    const value = e.target.name
    setSize((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    )
    setPage(1)
  }

  const handleColorChange = (e) => {
    const value = e.target.name
    setColor((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    )
    setPage(1)
  }

  const handleReset = () => {
    setCategory('')
    setOrigin('')
    setSize([])
    setColor([])
    setPage(1)
  }

  const addProductToCart = async (product) => {
    try {
      // Kiểm tra số lượng sản phẩm
      if (product.quantity <= 0) {
        setSnackbarMessage(`Sản phẩm ${product.name} đã hết hàng!`)
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
        return
      }

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const isProductInCart = cart.some((item) => item.id === product._id)
      if (isProductInCart) {
        setSnackbarMessage(`Sản phẩm ${product.name} đã có trong giỏ hàng!`)
        setSnackbarSeverity('warning')
        setOpenSnackbar(true)
        return
      }

      const updatedCart = await addToCart(product._id, 1)
      setCart(updatedCart)
      setSnackbarMessage(`Đã thêm ${product.name} vào giỏ hàng!`)
      setSnackbarSeverity('success')
      setOpenSnackbar(true)
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error)
      if (error.message.includes('đã có trong giỏ hàng')) {
        setSnackbarMessage(`Sản phẩm ${product.name} đã có trong giỏ hàng!`)
        setSnackbarSeverity('warning')
        setOpenSnackbar(true)
      } else if (error.message.includes('đã hết hàng')) {
        setSnackbarMessage(`Sản phẩm ${product.name} đã hết hàng!`)
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
      } else if (error.response?.status === 401) {
        setSnackbarMessage('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.')
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else if (error.response?.status === 404) {
        setSnackbarMessage('API giỏ hàng không tồn tại. Vui lòng kiểm tra.')
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
      } else {
        setSnackbarMessage(`Không thể thêm ${product.name} vào giỏ hàng!`)
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
      }
    }
  }

  const handleCloseSnackbar = () => setOpenSnackbar(false)

  return (
    <Box
      sx={{ display: 'flex', minHeight: '100vh', p: 2, gap: 2, mt: '150px' }}
    >
      <SidebarContainer>
        <Typography variant='h6'>Bộ lọc tìm kiếm</Typography>
        <Divider sx={{ mb: 1 }} />
        <FilterTitle variant='subtitle1'>Danh mục</FilterTitle>
        <FormControl fullWidth size='small'>
          <InputLabel>Danh mục</InputLabel>
          <Select
            value={category}
            label='Danh mục'
            onChange={handleCategoryChange}
          >
            <MenuItem value=''>Tất cả</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat._id || cat.id} value={cat._id || cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FilterTitle variant='subtitle1'>Xuất xứ</FilterTitle>
        <FormControl fullWidth size='small'>
          <InputLabel>Xuất xứ</InputLabel>
          <Select value={origin} label='Xuất xứ' onChange={handleOriginChange}>
            <MenuItem value=''>Tất cả</MenuItem>
            <MenuItem value='vietnam'>Việt Nam</MenuItem>
            <MenuItem value='china'>Trung Quốc</MenuItem>
            <MenuItem value='japan'>Nhật Bản</MenuItem>
          </Select>
        </FormControl>
        <FilterTitle variant='subtitle1'>Kích thước</FilterTitle>
        <FormGroup>
          {['S', 'M', 'L', 'XL'].map((s) => (
            <FormControlLabel
              key={s}
              control={
                <Checkbox
                  checked={size.includes(s)}
                  onChange={handleSizeChange}
                  name={s}
                  size='small'
                />
              }
              label={s}
            />
          ))}
        </FormGroup>
        <FilterTitle variant='subtitle1'>Màu sắc</FilterTitle>
        <FormGroup>
          {['Đỏ', 'Xanh', 'Đen', 'Trắng'].map((c) => (
            <FormControlLabel
              key={c}
              control={
                <Checkbox
                  checked={color.includes(c)}
                  onChange={handleColorChange}
                  name={c}
                  size='small'
                />
              }
              label={c}
            />
          ))}
        </FormGroup>
        <Box sx={{ mt: 2 }}>
          <Button
            variant='outlined'
            color='secondary'
            onClick={handleReset}
            fullWidth
          >
            Reset
          </Button>
        </Box>
      </SidebarContainer>
      <Box sx={{ flexGrow: 1 }}>
        {displayedProducts.length === 0 ? (
          <Typography
            variant='h6'
            align='center'
            sx={{ mt: 4 }}
            color='text.secondary'
          >
            Không có sản phẩm nào phù hợp
          </Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {displayedProducts.map((product) => {
                const isProductInCart = cart.some(
                  (item) => item.id === product._id
                )
                const isOutOfStock = product.quantity <= 0
                return (
                  <Grid item xs={12} sm={6} md={3} key={product._id}>
                    <Card
                      sx={{
                        width: 250,
                        height: 350,
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <a
                        href={`/productdetail/${product._id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <CardMedia
                          component='img'
                          height='250'
                          width='250'
                          image={product.image}
                          alt={product.name}
                        />
                      </a>
                      <CardContent sx={{ flex: 1 }}>
                        <a
                          href={`/productdetail/${product._id}`}
                          style={{
                            textDecoration: 'none',
                            color: 'black',
                            fontWeight: 'bold'
                          }}
                        >
                          {product.name}
                        </a>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton>
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => addProductToCart(product)}
                          disabled={isProductInCart || isOutOfStock}
                        >
                          <AddShoppingCartIcon />
                        </IconButton>
                        <Box sx={{ marginLeft: 'auto', pr: 1 }}>
                          <Typography variant='subtitle1' fontWeight='bold'>
                            {product.price ? `${product.price}$` : 'N/A'}
                          </Typography>
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color='primary'
              />
            </Box>
          </>
        )}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Product
