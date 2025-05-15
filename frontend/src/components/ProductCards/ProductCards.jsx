import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

const ProductCard = ({ product, handleAddToCart, isAdding }) => {
  return (
    <Card
      sx={{
        width: 290,
        height: 420,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <a href={`/productdetail/${product._id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="294"
          image={product.image?.[0] || '/default.jpg'}
          alt={product.name}
        />
      </a>
      <CardContent>
        <a
          href={`/productdetail/${product._id}`}
          style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}
        >
          {product.name}
        </a>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton
          onClick={() => handleAddToCart(product)}
          disabled={isAdding}
          aria-label="add to cart"
        >
          <AddShoppingCartIcon />
        </IconButton>
        <Box sx={{ ml: 'auto', pr: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {product.price ? `${product.price.toLocaleString()}₫` : '---'}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  )
}

export default ProductCard
