import React, { useState } from 'react'
import {
  TableCell,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material'
import {
  StyledTableCell,
  StyledTableRow
} from '~/pages/admin/CategorieManagement/CategoryTableStyles.jsx'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

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
        <StyledTableCell>{product.description}</StyledTableCell>
        <StyledTableCell>{product.category}</StyledTableCell>
        <StyledTableCell>
          <Stack direction='row' spacing={1}>
            <RemoveRedEyeIcon
              onClick={() => handleOpenModal('view', product)}
            />
            <BorderColorIcon onClick={() => handleOpenModal('edit', product)} />
            <DeleteForeverIcon
              onClick={() => handleOpenModal('delete', product)}
            />
          </Stack>
        </StyledTableCell>
      </StyledTableRow>

      {/* Dialog hiển thị ảnh lớn */}
      <Dialog open={openImage} onClose={handleClose} maxWidth='md'>
        <DialogTitle>Ảnh sản phẩm</DialogTitle>
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
