import React, { useState } from 'react'
import {
  Box,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  TextField,
  Avatar,
  Button
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const initialCart = [
  {
    id: 1,
    name: 'Áo thun nam in họa tiết',
    image:
      'https://city89.com/wp-content/uploads/2023/03/C89-0095-mockup-black-back.jpg',
    description: 'Form regular, chất cotton thoáng mát',
    price: 349000,
    quantity: 1
  },
  {
    id: 2,
    name: 'Quần short kaki basic',
    image:
      'https://bizweb.dktcdn.net/100/438/408/products/qk01-1.jpg?v=1702353272777',
    description: 'Co giãn nhẹ, phù hợp đi chơi & thể thao',
    price: 289000,
    quantity: 2
  }
]

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCart)

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta)
            }
          : item
      )
    )
  }

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const formatPrice = (value) =>
    value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })

  return (
    <Container maxWidth='md' sx={{ mt: 25, mb: 5 }}>
      <Typography variant='h5' fontWeight={700} gutterBottom>
        Giỏ hàng của bạn
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sản phẩm</TableCell>
            <TableCell align='right'>Giá</TableCell>
            <TableCell align='center'>Số lượng</TableCell>
            <TableCell align='center'>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Box display='flex' alignItems='center' gap={2}>
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    variant='square'
                    sx={{ width: 80, height: 80 }}
                  />
                  <Box>
                    <Typography variant='subtitle1'>{item.name}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align='right'>{formatPrice(item.price)}</TableCell>
              <TableCell align='center'>
                <Box display='flex' alignItems='center' justifyContent='center'>
                  <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    value={item.quantity}
                    size='small'
                    sx={{ width: 50, mx: 1 }}
                    inputProps={{
                      style: { textAlign: 'center' },
                      readOnly: true
                    }}
                  />
                  <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell align='center'>
                <IconButton
                  color='error'
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Tổng giá */}
      <Box display='flex' justifyContent='flex-end' mt={3}>
        <Typography variant='h6'>
          Tổng tiền:{' '}
          {formatPrice(
            cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )
          )}
        </Typography>
      </Box>

      {/* Nút thanh toán */}
      <Box display='flex' justifyContent='flex-end' mt={2}>
        <Button
          href={'/payment'}
          variant='contained'
          color='primary'
          size='large'
        >
          Tiến hành thanh toán
        </Button>
      </Box>
    </Container>
  )
}

export default Cart
