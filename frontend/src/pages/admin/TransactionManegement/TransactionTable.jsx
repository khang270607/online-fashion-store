import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress
} from '@mui/material'
import TransactionRow from './TransactionRow'

const TransactionTable = ({
  transactions,
  loading,
  onView,
  onEdit,
  onDelete
}) => {
  console.log('data', transactions)
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Mã giao dịch</TableCell>
          <TableCell>Đơn hàng</TableCell>
          <TableCell>Phương thức</TableCell>
          <TableCell>Trạng thái</TableCell>
          <TableCell>Số tiền</TableCell>
          <TableCell>Ghi chú</TableCell>
          <TableCell>Ngày tạo</TableCell>
          <TableCell>Hành động</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={8} align='center'>
              <CircularProgress size={24} />
            </TableCell>
          </TableRow>
        ) : transactions.filter((transaction) => !transaction.destroy).length >
          0 ? (
          transactions
            .filter((transaction) => !transaction.destroy)
            .map((transaction) => (
              <TransactionRow
                key={transaction._id}
                transaction={transaction}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} align='center'>
              Không có giao dịch nào.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TransactionTable
