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

  const productImage =
    product.image && Array.isArray(product.image) ? product.image[0] : ''

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          mt: 8,
          maxHeight: '85vh'
        }
      }}
    >
      <DialogTitle>Chi tiết sản phẩm</DialogTitle>
      <DialogContent
        dividers
        sx={{
          overflowY: 'auto',
          maxHeight: 'calc(85vh - 64px)'
        }}
      >
        {productImage && (
          <Box
            component='img'
            src={productImage}
            alt={product.name}
            sx={{
              width: '100%',
              height: 'auto',
              marginBottom: 2
            }}
          />
        )}

        <TextField
          fullWidth
          margin='normal'
          label='Tên sản phẩm'
          value={product.name}
          disabled
          color='#000'
        />
        <TextField
          fullWidth
          margin='normal'
          label='Mô tả'
          value={product.description}
          multiline
          rows={3}
          disabled
          color='#000'
        />
        <TextField
          fullWidth
          margin='normal'
          label='Giá'
          value={`${product.price.toLocaleString()} VNĐ`}
          disabled
          color='#000'
        />
        <TextField
          fullWidth
          margin='normal'
          label='Danh mục'
          value={product.category}
          disabled
          color='#000'
        />
      </DialogContent>
      <DialogActions>
        <Button color='#001f5d' onClick={onClose}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewProductModal
