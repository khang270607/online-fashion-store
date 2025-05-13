import React, { useState } from 'react'
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
import { addToCart } from '~/services/cartService'  
import useProducts from '~/hook/useProducts'

const ProductList = () => {
  const { products } = useProducts() // dùng hook
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleAddToCart = async (product) => {
    const payload = {
      cartItems: [
        {
          productId: product._id,
          quantity: 1
        }
      ]
    }

    try {
      await addToCart(payload)
      setOpenSnackbar(true)
    } catch (error) {
      console.error('Thêm vào giỏ hàng lỗi:', error)
    }
  }

  return (
    <Box sx={{ backgroundColor: '#03235e', p: 2, borderRadius: 3, m: 2, boxShadow: 3 }}>
      <Grid container justifyContent='center' alignItems='center' sx={{ mt: 5, gap: '20px' }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card sx={{ maxWidth: 345, mb: 2 }}>
              <a href={`/productdetail/${product.slug}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                  component='img'
                  height='294'
                  image={product.image?.[0]}
                  alt={product.name}
                />
              </a>
              <CardContent>
                <a
                  href={`/productdetail/${product.slug}`}
                  style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}
                >
                  {product.name}
                </a>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton><FavoriteIcon /></IconButton>
                <IconButton onClick={() => handleAddToCart(product)}>
                  <AddShoppingCartIcon />
                </IconButton>
                <Box sx={{ ml: 'auto', pr: 1 }}>
                  <Typography variant='subtitle1' fontWeight='bold'>
                    {product.price.toLocaleString()}₫
                  </Typography>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button href='/product' sx={{ color: 'white' }}>
          Xem tất cả
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity='success' sx={{ width: '100%' }}>
          Thêm sản phẩm vào giỏ hàng thành công!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ProductList
