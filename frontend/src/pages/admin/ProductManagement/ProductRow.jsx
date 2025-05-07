import React from 'react'
import { TableRow, TableCell, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const ProductRow = ({ index, product, handleOpenModal }) => (
  <TableRow>
    <TableCell>{index}</TableCell>
    <TableCell>{product.name}</TableCell>
    <TableCell>{product.price.toLocaleString()} VNĐ</TableCell>
    <TableCell>{product.category}</TableCell>
    <TableCell>
      <IconButton onClick={() => handleOpenModal('view', product)}>
        <VisibilityIcon />
      </IconButton>
      <IconButton onClick={() => handleOpenModal('edit', product)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => handleOpenModal('delete', product)}>
        <DeleteIcon />
      </IconButton>
    </TableCell>
  </TableRow>
)

export default ProductRow
