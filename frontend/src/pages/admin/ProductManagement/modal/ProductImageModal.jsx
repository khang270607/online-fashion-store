import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const ProductImageModal = ({ open, onClose, imageSrc, productName }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      {/* ===== Header ===== */}
      <DialogTitle sx={{ position: 'relative', pr: 6 }}>
        Ảnh sản phẩm
        {/*<IconButton*/}
        {/*  onClick={onClose}*/}
        {/*  sx={{*/}
        {/*    position: 'absolute',*/}
        {/*    top: 8,*/}
        {/*    right: 8,*/}
        {/*    width: 48,*/}
        {/*    height: 48*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <CloseIcon />*/}
        {/*</IconButton>*/}
      </DialogTitle>

      {/* ===== Content ===== */}
      <DialogContent>
        <img
          src={imageSrc}
          alt={productName}
          style={{
            width: '100%',
            maxHeight: '80vh',
            objectFit: 'contain'
          }}
        />
      </DialogContent>

      {/* ===== Footer ===== */}
      <DialogActions>
        <Button onClick={onClose} color='error' variant='contained'>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductImageModal
