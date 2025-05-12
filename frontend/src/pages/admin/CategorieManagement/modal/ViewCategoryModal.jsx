import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography
} from '@mui/material'

const ViewCategoryModal = ({ open, onClose, category }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        <Typography variant='h5'>Xem thông tin danh mục</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography
          variant='h6'
          gutterBottom
          sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
        >
          <strong>Tên danh mục:</strong> {category.name}
        </Typography>
        <Typography
          variant='h6'
          sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
        >
          <strong>Mô tả:</strong> {category.description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color='error' variant='contained' onClick={onClose}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewCategoryModal
