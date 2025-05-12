import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {
  TableCell,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box
} from '@mui/material'
import {
  StyledTableCell,
  StyledTableRow
} from '~/pages/admin/CategorieManagement/CategoryTableStyles.jsx'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const styles = {
  groupIcon: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  iconStyle: {
    cursor: 'pointer'
  }
}

const ProductRow = ({ index, product, handleOpenModal }) => {
  const [openImage, setOpenImage] = useState(false)

  const handleImageClick = () => {
    setOpenImage(true)
  }

  const handleClose = () => {
    setOpenImage(false)
  }

  return (
    <>
      <StyledTableRow>
        <StyledTableCell>{index}</StyledTableCell>
        <StyledTableCell>
          <img
            src={product.image?.[0]}
            alt={product.name}
            style={{
              width: 50,
              height: 50,
              cursor: 'pointer',
              objectFit: 'cover'
            }}
            onClick={handleImageClick}
          />
        </StyledTableCell>
        <StyledTableCell>{product.name}</StyledTableCell>
        <StyledTableCell>{product.price.toLocaleString()} VNĐ</StyledTableCell>
        <StyledTableCell>{product.quantity}</StyledTableCell>
        <StyledTableCell
          sx={{
            maxWidth: '130px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {product.description}
        </StyledTableCell>
        <StyledTableCell>{product.categoryId.name}</StyledTableCell>
        <StyledTableCell>
          {product.destroy ? 'Ngừng bán' : 'Đang bán'}
        </StyledTableCell>
        <StyledTableCell sx={{ maxWidth: '130px', width: '130px' }}>
          <Stack direction='row' spacing={1} sx={styles.groupIcon}>
            <IconButton
              onClick={() => handleOpenModal('view', product)}
              size='small'
            >
              <RemoveRedEyeIcon />
            </IconButton>
            <IconButton
              onClick={() => handleOpenModal('edit', product)}
              size='small'
            >
              <BorderColorIcon />
            </IconButton>
            <IconButton
              onClick={() => handleOpenModal('delete', product)}
              size='small'
            >
              <DeleteForeverIcon />
            </IconButton>
          </Stack>
        </StyledTableCell>
      </StyledTableRow>

      {/* Dialog hiển thị ảnh lớn */}
      <Dialog open={openImage} onClose={handleClose} maxWidth='md'>
        <DialogTitle sx={{ position: 'relative', pr: 6 }}>
          Ảnh sản phẩm
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: '48px',
              height: '48px'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img
            src={product.image?.[0]}
            alt={product.name}
            style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProductRow
