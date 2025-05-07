import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material'

const DeleteProductModal = ({ open, onClose, product, onDelete }) => {
  if (!product) return null

  const handleConfirmDelete = () => {
    onDelete(product._id)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>Xoá sản phẩm</DialogTitle>
      <DialogContent dividers>
        <Typography>
          Bạn có chắc muốn xoá sản phẩm <b>{product.name}</b> không?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleConfirmDelete} color='error' variant='contained'>
          Xoá
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteProductModal
