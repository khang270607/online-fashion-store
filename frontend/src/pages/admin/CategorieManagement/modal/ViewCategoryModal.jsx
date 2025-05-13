import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Divider
} from '@mui/material'

const ViewCategoryModal = ({ open, onClose, category }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Xem thông tin danh mục</DialogTitle>
      <Divider sx={{ my: 0 }} />
      <DialogContent>
        <form id='view-category-form'>
          {/* Tên danh mục - chỉ đọc */}
          <TextField
            label='Tên danh mục'
            fullWidth
            margin='normal'
            defaultValue={category.name}
            InputProps={{
              readOnly: true // Đặt trường này chỉ để đọc, không thể chỉnh sửa
            }}
          />
          {/* Mô tả - chỉ đọc */}
          <TextField
            label='Mô tả'
            fullWidth
            margin='normal'
            multiline
            minRows={3}
            defaultValue={category.description}
            InputProps={{
              readOnly: true // Đặt trường này chỉ để đọc, không thể chỉnh sửa
            }}
          />
        </form>
      </DialogContent>
      <Divider sx={{ my: 0 }} />
      <DialogActions>
        <Button onClick={onClose} color='error' variant='contained'>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewCategoryModal
