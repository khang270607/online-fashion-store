import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Typography,
  Stack
} from '@mui/material'

const ViewTransactionModal = ({ open, onClose, transaction }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Chi tiết giao dịch</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Typography>
            <strong>Mã giao dịch:</strong> {transaction._id}
          </Typography>
          <Typography>
            <strong>Đơn hàng:</strong> {transaction.orderId}
          </Typography>
          <Typography>
            <strong>Phương thức:</strong> {transaction.method}
          </Typography>
          <Typography>
            <strong>Trạng thái:</strong> {transaction.status}
          </Typography>
          <Typography>
            <strong>Số tiền:</strong> {transaction.amount?.toLocaleString()}₫
          </Typography>
          <Typography>
            <strong>Ghi chú:</strong> {transaction.note || '-'}
          </Typography>
          <Typography>
            <strong>Ngày tạo:</strong>{' '}
            {new Date(transaction.createdAt).toLocaleString()}
          </Typography>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} variant='contained'>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewTransactionModal
