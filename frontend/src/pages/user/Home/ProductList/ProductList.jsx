import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Snackbar,
  Alert
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useLocation } from 'react-router-dom'
import { getProducts, getProductsByCategory } from '~/services/productService'

const MAX_PRODUCTS = 8

const ProductList = () => {
  const [cart, setCart] = useState([]) // Giỏ hàng của người dùng
  const [openSnackbar, setOpenSnackbar] = useState(false) // Trạng thái hiển thị Snackbar
  const [products, setProducts] = useState([]) // Danh sách sản phẩm
  const [isLoading, setIsLoading] = useState(false) // Trạng thái đang tải
  const [error, setError] = useState(null) // Lỗi API
  const location = useLocation()

  // Lấy sản phẩm từ API
  useEffect(() => {
    const fetchData = async () => {
      // Đọc danh mục từ URL
      const searchParams = new URLSearchParams(location.search)
      const categoryId = searchParams.get('category') || ''

      // Lấy sản phẩm
      setIsLoading(true)
      try {
        let result
        if (categoryId) {
          result = await getProductsByCategory(categoryId, 1, MAX_PRODUCTS)
        } else {
          result = await getProducts(1, MAX_PRODUCTS)
        }
        setProducts(
          Array.isArray(result.products)
            ? result.products.slice(0, MAX_PRODUCTS)
            : []
        )
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error)
        setError('Không thể tải sản phẩm. Vui lòng thử lại.')
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [location.search])

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id)
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
    setOpenSnackbar(true)
  }

  // Đóng Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <Box
      sx={{
        backgroundColor: '#03235e',
        padding: '5px',
        borderRadius: '20px',
        margin: '10px',
        boxShadow: 3,
        minHeight: '100vh',
        mt: '150px'
      }}
    >
      {isLoading ? (
        <Box sx={{ textAlign: 'center', mt: 4, color: 'white' }}>
          Đang tải...
        </Box>
      ) : products.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4, color: 'white' }}>
          Không có sản phẩm nào.
        </Box>
      ) : (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{ marginTop: '50px', gap: '20px' }}
        >
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card
                sx={{
                  width: '350px',
                  marginBottom: '20px',
                  borderRadius: '20px'
                }}
              >
                <a
                  href={`/productdetail/${product._id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <CardMedia
                    component='img'
                    height='294'
                    image={product.image?.[0] || '/default.jpg'}
                    alt={product.name}
                  />
                </a>
                <CardContent>
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
                  <IconButton aria-label='add to favorites'>
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton
                    aria-label='cart'
                    onClick={() => addToCart(product)}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                  <Box sx={{ marginLeft: 'auto', paddingRight: '10px' }}>
                    <Typography variant='subtitle1' fontWeight='bold'>
                      {product.price ? `${product.price}₫` : '---'}
                    </Typography>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Nút xem tất cả */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '30px'
        }}
      >
        <Button href='/product' sx={{ color: 'white' }}>
          Xem tất cả
        </Button>
      </Box>

      {/* Snackbar thông báo */}
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

      {/* Snackbar lỗi */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity='error' onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ProductList
