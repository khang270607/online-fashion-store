import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  Typography,
  Divider
} from '@mui/material'

const ViewProductModal = ({ open, onClose, product }) => {
  if (!product) return null

  const imageList = Array.isArray(product.image) ? product.image : []
  const [selectedImage, setSelectedImage] = useState(imageList[0] || '')

  const handleImageClick = (img) => {
    setSelectedImage(img)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: {
          mt: 8,
          maxHeight: '85vh'
        }
      }}
    >
      <DialogTitle>Chi tiết sản phẩm</DialogTitle>
      <DialogContent dividers sx={{ maxHeight: 'calc(85vh - 64px)' }}>
        <Grid container spacing={2}>
          {/* Cột ảnh */}
          <Grid item xs={12} md={5}>
            {selectedImage && (
              <Box
                component='img'
                src={selectedImage}
                alt='Ảnh sản phẩm'
                sx={{
                  width: '500px',
                  height: 300,
                  objectFit: 'contain', // giữ tỷ lệ gốc và không bị cắt
                  backgroundColor: '#f5f5f5', // thêm nền để ảnh nhỏ không bị “lọt thỏm”
                  borderRadius: 2,
                  border: '1px solid #ccc',
                  mb: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              />
            )}

            {/* Thumbnail ảnh nhỏ */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {imageList.map((img, index) => (
                <Box
                  key={index}
                  component='img'
                  src={img}
                  alt={`Ảnh ${index + 1}`}
                  onClick={() => handleImageClick(img)}
                  sx={{
                    width: 64,
                    height: 64,
                    objectFit: 'cover',
                    borderRadius: 1,
                    border:
                      img === selectedImage
                        ? '2px solid #001f5d'
                        : '1px solid #ccc',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Box>
          </Grid>

          {/* Cột thông tin */}
          <Grid item xs={12} md={7} width='calc(98% - 500px)'>
            <Box sx={{ width: '100%' }}>
              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
                sx={{ width: '100%' }}
              >
                Tên sản phẩm
              </Typography>
              <Typography variant='body1' gutterBottom sx={{ width: '100%' }}>
                {product.name}
              </Typography>
              <Divider sx={{ my: 1, width: '100%' }} />

              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
                sx={{ width: '100%' }}
              >
                Mô tả
              </Typography>
              <Typography
                variant='body1'
                gutterBottom
                sx={{
                  width: '100%',
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {product.description}
              </Typography>
              <Divider sx={{ my: 1, width: '100%' }} />

              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
                sx={{ width: '100%' }}
              >
                Giá
              </Typography>
              <Typography variant='body1' gutterBottom sx={{ width: '100%' }}>
                {product.price?.toLocaleString()} VNĐ
              </Typography>
              <Divider sx={{ my: 1, width: '100%' }} />

              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
                sx={{ width: '100%' }}
              >
                Danh mục
              </Typography>
              <Typography variant='body1' gutterBottom sx={{ width: '100%' }}>
                {product.categoryId.name}
              </Typography>
              <Divider sx={{ my: 1, width: '100%' }} />

              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
                sx={{ width: '100%' }}
              >
                Số lượng
              </Typography>
              <Typography variant='body1' gutterBottom sx={{ width: '100%' }}>
                {product.quantity}
              </Typography>
              <Divider sx={{ my: 1, width: '100%' }} />

              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
                sx={{ width: '100%' }}
              >
                Trạng thái
              </Typography>
              <Typography variant='body1' sx={{ width: '100%' }}>
                {product.destroy ? 'Ngừng bán' : 'Đang bán'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button color='error' variant='contained' onClick={onClose}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewProductModal
