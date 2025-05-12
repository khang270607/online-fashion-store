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

const cards = [
  {
    id: 1,
    title: 'Card 1',
    image:
      'https://city89.com/wp-content/uploads/2023/03/C89-0095-mockup-black-back.jpg',
    description: 'Description for Card 1',
    price: 50
  }
  // Thêm các sản phẩm còn lại vào đây
]

const ProductList = () => {
  const [cart, setCart] = useState([]) // Giỏ hàng của người dùng
  const [openSnackbar, setOpenSnackbar] = useState(false) // Trạng thái hiển thị Snackbar

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id)
      if (existingProduct) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
    setOpenSnackbar(true) // Hiển thị Snackbar thông báo thêm thành công
  }

  // Đóng Snackbar sau 3 giây
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
        boxShadow: 3
      }}
    >
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        sx={{ marginTop: '50px', gap: '20px' }}
      >
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
              <a href={'/productdetail'} style={{ textDecoration: 'none' }}>
                <CardMedia
                  component='img'
                  height='294'
                  image={card.image}
                  alt={card.title}
                />
              </a>
              <CardContent>
                <a
                  href={'/productdetail'}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    fontWeight: 'bold'
                  }}
                >
                  {card.description}
                </a>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label='add to favorites'>
                  <FavoriteIcon />
                </IconButton>
                {/* Thêm sản phẩm vào giỏ hàng khi nhấn */}
                <IconButton aria-label='cart' onClick={() => addToCart(card)}>
                  <AddShoppingCartIcon />
                </IconButton>
                <Box sx={{ marginLeft: 'auto', paddingRight: '10px' }}>
                  <Typography variant='subtitle1' fontWeight='bold'>
                    {card.price}$
                  </Typography>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '30px'
        }}
      >
        <Button href={'/product'} sx={{ color: 'white' }}>
          Xem tất cả
        </Button>
      </Box>

      {/* Snackbar để hiển thị thông báo thêm sản phẩm thành công */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Thời gian hiển thị 3 giây
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
    </Box>
  )
}

export default ProductList
