import React, { useState, useEffect } from 'react'
import {
  Box, Container, Table, TableHead, TableRow, TableCell, TableBody,
  Typography, IconButton, TextField, Avatar, Button, Checkbox
} from '@mui/material'
import { Delete, Add, Remove } from '@mui/icons-material'
import { useCart } from '~/hook/useCarts'

const Cart = () => {
  const { cart, loading, deleteItem, clearCart, updateItem } = useCart()
  const [selectedItems, setSelectedItems] = useState([])
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    if (cart?.cartItems) setCartItems(cart.cartItems)
  }, [cart])

  const handleSelect = (id) => {
    setSelectedItems(prev => prev.includes(id)
      ? prev.filter(i => i !== id)
      : [...prev, id])
  }

  const formatPrice = (val) =>
    typeof val === 'number'
      ? val.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
      : '0₫'

  const handleQuantityChange = async (id, currentQty, delta) => {
    const newQty = Math.max(1, currentQty + delta)
    try {
      const res = await updateItem(id, { quantity: newQty })
      if (res) {
        setCartItems(prev =>
          prev.map(item =>
            item.productId._id === id
              ? { ...item, quantity: newQty }
              : item
          )
        )
      }
    } catch (error) {
      console.error('Lỗi cập nhật số lượng:', error)
    }
  }

  const handleRemove = async (id) => {
    try {
      const res = await deleteItem(id)
      if (res) {
        setCartItems(prev => prev.filter(item => item.productId._id !== id))
        setSelectedItems(prev => prev.filter(i => i !== id))
      }
    } catch (error) {
      console.error('Lỗi xoá sản phẩm:', error)
    }
  }

  const selectedCartItems = cartItems.filter(item =>
    selectedItems.includes(item.productId._id)
  )

  const totalPrice = selectedCartItems.reduce(
    (sum, item) => sum + (item.productId.price || 0) * item.quantity,
    0
  )

  if (loading) {
    return <Typography sx={{ mt: 10, textAlign: 'center' }}>Đang tải giỏ hàng...</Typography>
  }

  if (cartItems.length === 0) {
    return (
      <Box sx={{ height: '70vh' }} mt={10} textAlign='center'>
        <Typography variant='h6'>Giỏ hàng của bạn đang trống</Typography>
      </Box>
    )
  }

  return (
    <Container maxWidth='lg' sx={{ height: '70vh', mt: 10, mb: 5 }}>
      <Table size='medium'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Sản phẩm</TableCell>
            <TableCell align='right'>Giá</TableCell>
            <TableCell align='center'>Số lượng</TableCell>
            <TableCell align='center'>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map(item => {
            const product = item.productId
            return (
              <TableRow key={product._id}>
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={selectedItems.includes(product._id)}
                    onChange={() => handleSelect(product._id)}
                  />
                </TableCell>
                <TableCell>
                  <Box display='flex' alignItems='center' gap={2}>
                    <Avatar
                      src={product.image?.[0] || '/default.jpg'}
                      variant='square'
                      sx={{ width: 64, height: 64 }}
                    />
                    <Box>
                      <Typography fontWeight={600}>{product.name}</Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {product.description}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align='right'>{formatPrice(product.price)}</TableCell>
                <TableCell align='center'>
                  <Box display='flex' alignItems='center' justifyContent='center'>
                    <IconButton onClick={() => handleQuantityChange(product._id, item.quantity, -1)}>
                      <Remove />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      size='small'
                      sx={{ width: 50, mx: 1 }}
                      inputProps={{ style: { textAlign: 'center' }, readOnly: true }}
                    />
                    <IconButton onClick={() => handleQuantityChange(product._id, item.quantity, 1)}>
                      <Add />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align='center'>
                  <IconButton color='error' onClick={() => handleRemove(product._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Box display='flex' justifyContent='space-between' alignItems='center' mt={4}>
        <Typography variant='h6'>Tổng tiền: {formatPrice(totalPrice)}</Typography>
        <Box display='flex' gap={2}>
          <Button
            variant='contained'
            color='primary'
            disabled={selectedItems.length === 0}
            onClick={() => console.log('Thanh toán:', selectedCartItems)}
          >
            Thanh toán
          </Button>
          <Button
            variant='outlined'
            color='error'
            onClick={async () => {
              await clearCart()
              setCartItems([])
              setSelectedItems([])
            }}
          >
            Xoá toàn bộ
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Cart
