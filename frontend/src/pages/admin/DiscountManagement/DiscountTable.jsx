import React from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import CircularProgress from '@mui/material/CircularProgress'
import DiscountRow from './DiscountRow'
import {
  StyledTableCell,
  StyledTableRow
} from '../UserManagement/UserTableStyles.js'

const DiscountTable = ({ discounts, loading, onAction }) => {
  if (loading) return <CircularProgress />

  return (
    <Table>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell sx={{ textAlign: 'center' }}>STT</StyledTableCell>
          <StyledTableCell>Mã giảm</StyledTableCell>
          <StyledTableCell>Loại</StyledTableCell>
          <StyledTableCell>Giá trị giảm (VNĐ)</StyledTableCell>
          <StyledTableCell>Số lượt sử dụng tối đa</StyledTableCell>
          <StyledTableCell>Số lượng còn lại</StyledTableCell>
          <StyledTableCell>Ngày bắt đầu</StyledTableCell>
          <StyledTableCell>Ngày kết thúc</StyledTableCell>
          <StyledTableCell sx={{ maxWidth: '130px', width: '130px' }}>
            Hành động
          </StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          <StyledTableRow>
            <StyledTableCell colSpan={9} align='center'>
              <CircularProgress />
            </StyledTableCell>
          </StyledTableRow>
        ) : discounts.length > 0 ? (
          discounts.map((discount, index) => (
            <DiscountRow
              key={discount._id}
              discount={discount}
              index={index}
              onAction={onAction}
            />
          ))
        ) : (
          <StyledTableRow>
            <StyledTableCell colSpan={9} align='center'>
              Không có mã giảm giá nào
            </StyledTableCell>
          </StyledTableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default DiscountTable
