import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Typography
} from '@mui/material'

const DeleteDiscountModal = ({ open, onClose, discount, onDelete }) => {
  const handleDelete = async () => {
    if (!discount || !discount._id) return
    await onDelete(discount._id)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Xóa mã giảm giá</DialogTitle>
      <Divider sx={{ my: 0 }} />
      <DialogContent>
        <Typography>
          Bạn có chắc muốn xóa mã giảm giá <strong>{discount.code}</strong>?
        </Typography>
      </DialogContent>
      <Divider sx={{ my: 0 }} />
      <DialogActions>
        <Button onClick={onClose} color='inherit'>
          Hủy
        </Button>
        <Button onClick={handleDelete} variant='contained' color='error'>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDiscountModal
