import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box
} from '@mui/material'

const ViewProductModal = ({ open, onClose, product }) => {
  if (!product) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          mt: 8, // cách top khoảng 64px, tránh bị che
          maxHeight: '85vh' // chiều cao tối đa
        }
      }}
    >
      <DialogTitle>Chi tiết sản phẩm</DialogTitle>
      <DialogContent
        dividers
        sx={{
          overflowY: 'auto', // cuộn nếu nội dung vượt quá chiều cao
          maxHeight: 'calc(85vh - 64px)' // để phù hợp với tổng chiều cao
        }}
      >
        {/* Hiển thị ảnh sản phẩm */}
        <Box
          component='img'
          src={product.imageProduct}
          alt={product.name}
          sx={{
            width: '100%',
            height: 'auto',
            marginBottom: 2
          }}
        />

        <TextField
          fullWidth
          margin='normal'
          label='Tên sản phẩm'
          value={product.name}
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          margin='normal'
          label='Mô tả'
          value={product.description}
          multiline
          rows={3}
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          margin='normal'
          label='Giá'
          value={product.price}
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          margin='normal'
          label='Danh mục'
          value={product.category}
          InputProps={{ readOnly: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewProductModal
