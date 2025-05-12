import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material'

const DeleteProductModal = ({ open, onClose, product, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  if (!product) return null

  const handleConfirmDelete = async () => {
    setIsDeleting(true) // Bắt đầu trạng thái đang xoá
    try {
      await onDelete(product._id) // Giả sử onDelete là một async function
    } catch (error) {
      console.error('Xoá sản phẩm thất bại:', error)
    } finally {
      setIsDeleting(false) // Kết thúc trạng thái xoá
      onClose() // Đóng modal sau khi xoá thành công hoặc thất bại
    }
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
        <Button onClick={onClose} color='#001f5d'>
          Hủy
        </Button>
        <Button
          onClick={handleConfirmDelete}
          color='error'
          variant='contained'
          disabled={isDeleting} // Vô hiệu hóa nút nếu đang xoá
        >
          {isDeleting ? 'Đang xoá...' : 'Xoá'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteProductModal
