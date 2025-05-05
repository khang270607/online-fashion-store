import * as React from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import CancelIcon from '@mui/icons-material/Cancel'

import ViewOrderModal from '~/components/modals/ViewOrderModal'
import CancelOrderModal from '~/components/modals/CancelOrderModal'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#001f5d',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    borderRight: '1px solid #e0e0e0',
    padding: '8px',
    whiteSpace: 'nowrap'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: '1px solid #e0e0e0',
    padding: '8px',
    whiteSpace: 'nowrap'
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  }
}))

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  overflowX: 'auto',
  maxWidth: '100%',
  '&::-webkit-scrollbar': {
    height: '8px'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#001f5d',
    borderRadius: '4px'
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1'
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '600px'
  }
}))

const ROWS_PER_PAGE = 10

const orders = [
  {
    id: 'DH001',
    products: [
      { name: 'Áo sơ mi trắng', quantity: 1, price: 450000 },
      { name: 'Quần jean xanh', quantity: 1, price: 450000 }
    ],
    totalQuantity: 2,
    totalPrice: 900000,
    status: 'Đang xử lý'
  },
  {
    id: 'DH002',
    productName: 'Quần jean xanh',
    totalQuantity: 1,
    totalPrice: 600000,
    status: 'Đã giao'
  },
  {
    id: 'DH003',
    productName: 'Áo thun đen basic',
    totalQuantity: 3,
    totalPrice: 750000,
    status: 'Đã huỷ'
  }
]

export default function OrderManagement() {
  const [page, setPage] = React.useState(1)
  const [selectedOrder, setSelectedOrder] = React.useState(null)
  const [modalType, setModalType] = React.useState(null)

  const pageCount = Math.ceil(orders.length / ROWS_PER_PAGE)
  const displayedRows = orders.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  )

  const handleOpenModal = (type, order) => {
    setSelectedOrder(order)
    setModalType(type)
  }

  const handleCloseModal = () => {
    setSelectedOrder(null)
    setModalType(null)
  }

  const handleCancelOrder = (order) => {
    console.log('Huỷ đơn hàng:', order)
  }

  const handleChangePage = (event, value) => {
    setPage(value)
  }

  return (
    <>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Quản lý đơn hàng
      </Typography>
      <StyledTableContainer component={Paper}>
        <Table sx={{ tableLayout: 'fixed', minWidth: '100%' }}>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: '50px', textAlign: 'center' }}>
                STT
              </StyledTableCell>
              <StyledTableCell>Mã đơn hàng</StyledTableCell>
              <StyledTableCell>Tên sản phẩm</StyledTableCell>
              <StyledTableCell>Số lượng</StyledTableCell>
              <StyledTableCell>Tổng tiền</StyledTableCell>
              <StyledTableCell>Trạng thái</StyledTableCell>
              <StyledTableCell>Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map(
              (order, index) => (
                console.log(order),
                (
                  <StyledTableRow key={order.id}>
                    <StyledTableCell sx={{ textAlign: 'center' }}>
                      {(page - 1) * ROWS_PER_PAGE + index + 1}
                    </StyledTableCell>
                    <StyledTableCell>{order.id}</StyledTableCell>
                    <StyledTableCell>
                      <span
                        style={{
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          width: '100%'
                        }}
                        title={(order.products
                          ? order.products.map((p) => p.name)
                          : [order.productName]
                        )
                          .filter(Boolean)
                          .join(', ')}
                      >
                        {(order.products
                          ? order.products.map((p) => p.name)
                          : [order.productName]
                        )
                          .filter(Boolean)
                          .join(', ')}
                      </span>
                    </StyledTableCell>
                    <StyledTableCell>{order.totalQuantity}</StyledTableCell>
                    <StyledTableCell>
                      {Number(order.totalPrice).toLocaleString()} đ
                    </StyledTableCell>
                    <StyledTableCell>{order.status}</StyledTableCell>
                    <StyledTableCell sx={{ display: 'flex', gap: '8px' }}>
                      <RemoveRedEyeIcon
                        sx={{ cursor: 'pointer', fontSize: '20px' }}
                        onClick={() => handleOpenModal('view', order)}
                      />
                      {order.status !== 'Đã huỷ' &&
                        order.status !== 'Đã giao' && (
                          <CancelIcon
                            sx={{ cursor: 'pointer', fontSize: '20px' }}
                            onClick={() => handleOpenModal('cancel', order)}
                          />
                        )}
                    </StyledTableCell>
                  </StyledTableRow>
                )
              )
            )}
          </TableBody>
        </Table>

        {modalType === 'view' && (
          <ViewOrderModal
            open={true}
            onClose={handleCloseModal}
            order={selectedOrder}
          />
        )}
        {modalType === 'cancel' && (
          <CancelOrderModal
            open={true}
            onClose={handleCloseModal}
            order={selectedOrder}
            onCancel={handleCancelOrder}
          />
        )}
      </StyledTableContainer>

      <Stack spacing={2} sx={{ mt: 2 }} alignItems='center'>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChangePage}
          color='primary'
          sx={{
            '& .Mui-selected': {
              backgroundColor: '#001f5d !important',
              color: '#fff',
              fontWeight: 'bold'
            }
          }}
        />
      </Stack>
    </>
  )
}
