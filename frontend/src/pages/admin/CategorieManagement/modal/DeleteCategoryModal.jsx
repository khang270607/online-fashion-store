// components/modal/DeleteCategoryModal.jsx
import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material'

const DeleteCategoryModal = ({ open, onClose, category, onDelete }) => {
  const handleDelete = () => {
    onDelete(category._id) // Gọi hàm handleDeleteCategory từ parent component
    onClose() // Đóng modal sau khi xoá
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xoá danh mục</DialogTitle>
      <DialogContent>
        Bạn có chắc chắn muốn xoá danh mục <strong>{category.name}</strong>?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='inherit'>
          Hủy
        </Button>
        <Button onClick={handleDelete} color='error' variant='contained'>
          Xoá
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteCategoryModal
