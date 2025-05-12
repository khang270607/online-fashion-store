import React, { useState } from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Divider,
  Button,
  Modal,
  Paper,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const orders = [
  {
    id: 'DH-001',
    date: '01/05/2025',
    total: '2.800.000₫',
    status: 'Đã giao',
    items: ['Áo thun x1', 'Giày thể thao x1']
  },
  {
    id: 'DH-002',
    date: '20/04/2025',
    total: '1.200.000₫',
    status: 'Đang giao',
    items: ['Nón lưỡi trai x2']
  },
  {
    id: 'DH-003',
    date: '10/04/2025',
    total: '1.750.000₫',
    status: 'Đang xử lý',
    items: ['Áo hoodie x1', 'Quần jeans x1']
  }
]

const getStatusColor = (status) => {
  switch (status) {
    case 'Đã giao':
      return 'success'
    case 'Đang giao':
      return 'info'
    case 'Đang xử lý':
      return 'warning'
    case 'Đã hủy':
      return 'error'
    default:
      return 'default'
  }
}

const Order = () => {
  const [open, setOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const handleOpen = (order) => {
    setSelectedOrder(order)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedOrder(null)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h5' gutterBottom>
        Đơn hàng của bạn
      </Typography>

      <List>
        {orders.map((order, index) => (
          <React.Fragment key={order.id}>
            <ListItem alignItems='flex-start'>
              <ListItemText
                primary={`Mã đơn: ${order.id} - Tổng: ${order.total}`}
                secondary={
                  <Typography
                    component='span'
                    variant='body2'
                    color='text.secondary'
                  >
                    Ngày đặt: {order.date}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Chip
                  label={order.status}
                  color={getStatusColor(order.status)}
                  size='small'
                  sx={{ mr: 1 }}
                />
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => handleOpen(order)}
                >
                  Xem chi tiết
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            {index < orders.length - 1 && <Divider component='li' />}
          </React.Fragment>
        ))}
      </List>

      {/* Modal Chi tiết đơn hàng */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='chi-tiet-don-hang'
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '90%',
            maxWidth: 400,
            p: 3,
            position: 'relative',
            outline: 'none'
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant='h6' id='chi-tiet-don-hang' gutterBottom>
            Chi tiết đơn hàng
          </Typography>

          {selectedOrder && (
            <Box>
              <Typography variant='body2'>
                <strong>Mã đơn:</strong> {selectedOrder.id}
              </Typography>
              <Typography variant='body2'>
                <strong>Ngày đặt:</strong> {selectedOrder.date}
              </Typography>
              <Typography variant='body2'>
                <strong>Tổng tiền:</strong> {selectedOrder.total}
              </Typography>
              <Typography variant='body2' sx={{ mt: 2 }}>
                <strong>Sản phẩm:</strong>
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                {selectedOrder.items.map((item, idx) => (
                  <li key={idx}>
                    <Typography variant='body2'>{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Paper>
      </Modal>
    </Box>
  )
}

export default Order
