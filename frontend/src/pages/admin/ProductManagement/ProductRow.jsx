import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { TableCell, Stack, IconButton, Box } from '@mui/material'
import {
  StyledTableCell,
  StyledTableRow
} from '~/pages/admin/CategorieManagement/CategoryTableStyles.jsx'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ProductImageModal from './modal/ProductImageModal.jsx'

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
        <StyledTableCell sx={{ textAlign: 'center' }}>{index}</StyledTableCell>
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
        <StyledTableCell>{product.price.toLocaleString()}</StyledTableCell>
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

      {/* ✅ Modal hiển thị ảnh đã tách riêng */}
      <ProductImageModal
        open={openImage}
        onClose={handleClose}
        imageSrc={product.image?.[0]}
        productName={product.name}
      />
    </>
  )
}

export default ProductRow
