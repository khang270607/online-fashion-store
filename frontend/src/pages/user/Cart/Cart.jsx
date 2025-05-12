import React, { useState, useEffect } from 'react'
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
  Button,
  Snackbar,
  Alert
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {
  getCart,
  updateCartItem,
  removeFromCart
} from '~/services/cartsService'

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart()
        setCartItems(data)
      } catch (error) {
        console.error('Lỗi tải giỏ hàng:', error)
        setSnackbarMessage('Không thể tải giỏ hàng!')
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [])

  const handleQuantityChange = async (productId, delta) => {
    const item = cartItems.find((i) => i.id === productId)
    if (!item) return

    const maxQuantity = item.quantity // Giả sử quantity là số lượng tồn kho
    const newQuantity = item.cart_quantity + delta

    if (newQuantity < 1) {
      setSnackbarMessage('Số lượng phải ít nhất là 1')
      setSnackbarSeverity('warning')
      setOpenSnackbar(true)
      return
    }

    if (newQuantity > maxQuantity) {
      setSnackbarMessage(`Chỉ còn ${maxQuantity} sản phẩm trong kho`)
      setSnackbarSeverity('warning')
      setOpenSnackbar(true)
      return
    }

    try {
      const updatedCart = await updateCartItem(productId, newQuantity)
      setCartItems(updatedCart)
    } catch (error) {
      console.error('Cập nhật lỗi:', error)
      setSnackbarMessage('Không thể cập nhật số lượng')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    }
  }

  const handleRemoveItem = async (productId) => {
    try {
      const updatedCart = await removeFromCart(productId)
      setCartItems(updatedCart)
      setSnackbarMessage('Đã xoá sản phẩm khỏi giỏ hàng')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)
    } catch (error) {
      console.error('Xoá lỗi:', error)
      setSnackbarMessage('Không thể xoá sản phẩm')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    }
  }

  const formatPrice = (value) =>
    value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })

  return (
    <Container maxWidth='md' sx={{ mt: 10 }}>
      <Typography variant='h5' fontWeight={700} gutterBottom>
        Giỏ hàng của bạn
      </Typography>

      {loading ? (
        <Typography>Đang tải...</Typography>
      ) : cartItems.length === 0 ? (
        <Typography>Giỏ hàng đang trống.</Typography>
      ) : (
        <>
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
                        variant='square'
                        sx={{ width: 80, height: 80 }}
                      />
                      <Typography>{item.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align='right'>{formatPrice(item.price)}</TableCell>
                  <TableCell align='center'>
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                    >
                      <IconButton
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        value={item.cart_quantity}
                        size='small'
                        inputProps={{
                          readOnly: true,
                          style: { textAlign: 'center' }
                        }}
                        sx={{ width: 50, mx: 1 }}
                      />
                      <IconButton
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
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

          <Box display='flex' justifyContent='flex-end' mt={3}>
            <Typography variant='h6'>
              Tổng tiền:{' '}
              {formatPrice(
                cartItems.reduce((sum, i) => sum + i.price * i.cart_quantity, 0)
              )}
            </Typography>
          </Box>

          <Box display='flex' justifyContent='flex-end' mt={2}>
            <Button variant='contained' href='/payment'>
              Tiến hành thanh toán
            </Button>
          </Box>
        </>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Cart
