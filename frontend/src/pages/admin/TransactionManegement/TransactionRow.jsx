import React from 'react'
import { TableCell, TableRow, IconButton, Tooltip } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const TransactionRow = ({ transaction, onView, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{transaction._id}</TableCell>
      <TableCell>{transaction.orderId}</TableCell>
      <TableCell>{transaction.method}</TableCell>
      <TableCell>{transaction.status}</TableCell>
      <TableCell>{transaction.amount?.toLocaleString()}₫</TableCell>
      <TableCell>{transaction.note || '-'}</TableCell>
      <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
      <TableCell>
        <Tooltip title='Xem'>
          <IconButton onClick={() => onView(transaction)}>
            <VisibilityIcon color='primary' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Sửa'>
          <IconButton onClick={() => onEdit(transaction)}>
            <EditIcon color='warning' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Xoá'>
          <IconButton onClick={() => onDelete(transaction)}>
            <DeleteIcon color='error' />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default TransactionRow
