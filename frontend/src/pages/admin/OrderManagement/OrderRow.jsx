import React from 'react'
import { TableCell, IconButton, Stack, Chip } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import dayjs from 'dayjs'
import {
  StyledTableCell,
  StyledTableRow
} from '~/pages/admin/CategorieManagement/CategoryTableStyles.jsx'

const OrderRow = ({ order, onView, onEdit, onDelete }) => {
  const {
    _id,
    total,
    paymentMethod,
    paymentStatus,
    discountAmount,
    status,
    isDelivered,
    createdAt
  } = order

  return (
    <StyledTableRow hover>
      <StyledTableCell>{_id}</StyledTableCell>

      <StyledTableCell>
        {paymentMethod ? paymentMethod.toUpperCase() : '—'}
      </StyledTableCell>

      <StyledTableCell>
        <Chip
          label={
            paymentStatus === 'Pending'
              ? 'Đang chờ'
              : paymentStatus === 'Completed'
                ? 'Đã thanh toán'
                : paymentStatus === 'Failed'
                  ? 'Thất bại'
                  : '—'
          }
          color={
            paymentStatus === 'Completed'
              ? 'success'
              : paymentStatus === 'Failed'
                ? 'error'
                : 'warning'
          }
          size='small'
        />
      </StyledTableCell>

      <StyledTableCell>
        <Chip
          label={
            status === 'Pending'
              ? 'Đang chờ'
              : status === 'Processing'
                ? 'Đang xử lý'
                : status === 'Shipped'
                  ? 'Đã gửi hàng'
                  : status === 'Delivered'
                    ? 'Đã giao'
                    : status === 'Cancelled'
                      ? 'Đã hủy'
                      : '—'
          }
          color={
            status === 'Pending'
              ? 'warning'
              : status === 'Cancelled'
                ? 'error'
                : 'success'
          }
          size='small'
        />
      </StyledTableCell>

      <StyledTableCell>
        <Chip
          label={isDelivered ? 'Đã giao' : 'Chưa giao'}
          color={isDelivered ? 'success' : 'default'}
          size='small'
        />
      </StyledTableCell>

      <StyledTableCell>
        {discountAmount > 0 ? `- ${discountAmount.toLocaleString()}₫` : '—'}
      </StyledTableCell>

      <StyledTableCell>
        {total ? `${total.toLocaleString()}₫` : '—'}
      </StyledTableCell>

      <StyledTableCell>
        {createdAt ? dayjs(createdAt).format('DD/MM/YYYY HH:mm') : '—'}
      </StyledTableCell>

      <StyledTableCell sx={{ maxWidth: 130, width: 130 }}>
        <Stack direction='row' spacing={1}>
          <IconButton onClick={() => onView(order)} size='small'>
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton onClick={() => onEdit(order)} size='small'>
            <BorderColorIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(order)} size='small'>
            <DeleteForeverIcon />
          </IconButton>
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default OrderRow
