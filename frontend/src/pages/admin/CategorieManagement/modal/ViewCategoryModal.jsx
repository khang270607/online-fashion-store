// components/modal/ViewCategoryModal.jsx
import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material'

const ViewCategoryModal = ({ open, onClose, category }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xem thông tin danh mục</DialogTitle>
      <DialogContent>
        <div>
          <strong>Tên danh mục:</strong> {category.name}
        </div>
        <div>
          <strong>Mô tả:</strong> {category.description}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewCategoryModal
