import React from 'react'
import {
  Table,
  TableBody,
  TableHead,
  Paper,
  CircularProgress,
  Typography
} from '@mui/material'
import OrderRow from './OrderRow'
import {
  StyledTableCell,
  StyledTableRow,
  StyledTableContainer
} from '~/pages/admin/CategorieManagement/CategoryTableStyles.jsx'

const OrderTable = ({
  orders = [],
  loading = false,
  onView,
  onEdit,
  onDelete
}) => {
  const columnsCount = 9
  return (
    <StyledTableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <Table stickyHeader>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Mã đơn</StyledTableCell>
            <StyledTableCell>Thanh toán</StyledTableCell>
            <StyledTableCell>Trạng thái thanh toán</StyledTableCell>
            <StyledTableCell>Trạng thái đơn hàng</StyledTableCell>
            <StyledTableCell>Trạng thái giao hàng</StyledTableCell>
            <StyledTableCell>Giảm giá</StyledTableCell>
            <StyledTableCell>Tổng tiền</StyledTableCell>
            <StyledTableCell>Ngày tạo</StyledTableCell>
            <StyledTableCell sx={{ maxWidth: '130px', width: '130px' }}>
              Hành động
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <StyledTableRow>
              <StyledTableCell colSpan={columnsCount} align='center'>
                <CircularProgress />
              </StyledTableCell>
            </StyledTableRow>
          ) : orders.length === 0 ? (
            <StyledTableRow>
              <StyledTableCell colSpan={columnsCount} align='center'>
                <Typography>Không có đơn hàng nào.</Typography>
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}

export default OrderTable
