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
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'

import EditProductModal from '~/components/modals/EditProductModal'
import DeleteProductModal from '~/components/modals/DeleteProductModal'
import ViewProductModal from '~/components/modals/ViewProductModal'

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
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  [theme.breakpoints.down('sm')]: {
    '&.hide-on-mobile': {
      display: 'none'
    }
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

const products = [
  {
    name: 'Áo sơ mi trắng',
    description: 'Áo sơ mi chất liệu cotton cao cấp',
    price: '450000',
    createdAt: '01/01/2024',
    updatedAt: '05/01/2024'
  },
  {
    name: 'Quần jean xanh',
    description: 'Quần jean ống đứng, phong cách trẻ trung',
    price: '600000',
    createdAt: '10/01/2024',
    updatedAt: '12/01/2024'
  },
  {
    name: 'Áo thun đen basic',
    description: 'Áo thun trơn, kiểu dáng unisex',
    price: '250000',
    createdAt: '15/02/2024',
    updatedAt: '16/02/2024'
  }
]

export default function ProductManagement() {
  const [page, setPage] = React.useState(1)
  const [selectedProduct, setSelectedProduct] = React.useState(null)
  const [modalType, setModalType] = React.useState(null)

  const pageCount = Math.ceil(products.length / ROWS_PER_PAGE)
  const displayedRows = products.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  )

  const handleOpenModal = (type, product) => {
    setSelectedProduct(product)
    setModalType(type)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
    setModalType(null)
  }

  const handleSaveEdit = (updatedProduct) => {
    console.log('Cập nhật:', updatedProduct)
  }

  const handleDeleteProduct = (product) => {
    console.log('Xoá:', product)
  }

  const handleChangePage = (event, value) => {
    setPage(value)
  }

  return (
    <>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Quản lý sản phẩm
      </Typography>
      <StyledTableContainer component={Paper}>
        <Table
          sx={{
            tableLayout: 'fixed',
            minWidth: '100%'
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: '30px', textAlign: 'center' }}>
                STT
              </StyledTableCell>
              <StyledTableCell sx={{ width: '200px' }}>
                Tên sản phẩm
              </StyledTableCell>
              <StyledTableCell sx={{ width: '250px' }}>Mô tả</StyledTableCell>
              <StyledTableCell sx={{ width: '100px' }}>Giá</StyledTableCell>
              <StyledTableCell
                sx={{ width: '120px' }}
                className='hide-on-mobile'
              >
                Ngày thêm
              </StyledTableCell>
              <StyledTableCell
                sx={{ width: '120px' }}
                className='hide-on-mobile'
              >
                Ngày cập nhật
              </StyledTableCell>
              <StyledTableCell sx={{ width: '100px' }}>
                Hành động
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((product, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell sx={{ textAlign: 'center' }}>
                  {(page - 1) * ROWS_PER_PAGE + index + 1}
                </StyledTableCell>
                <StyledTableCell>
                  <span
                    style={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%'
                    }}
                    title={product.name}
                  >
                    {product.name}
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <span
                    style={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%'
                    }}
                    title={product.description}
                  >
                    {product.description}
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  {Number(product.price).toLocaleString()} đ
                </StyledTableCell>
                <StyledTableCell className='hide-on-mobile'>
                  {product.createdAt}
                </StyledTableCell>
                <StyledTableCell className='hide-on-mobile'>
                  {product.updatedAt}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <RemoveRedEyeIcon
                    sx={{ cursor: 'pointer', fontSize: '20px' }}
                    onClick={() => handleOpenModal('view', product)}
                  />
                  <BorderColorIcon
                    sx={{ cursor: 'pointer', fontSize: '20px' }}
                    onClick={() => handleOpenModal('edit', product)}
                  />
                  <DeleteForeverIcon
                    sx={{ cursor: 'pointer', fontSize: '20px' }}
                    onClick={() => handleOpenModal('delete', product)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {modalType === 'view' && (
          <ViewProductModal
            open={true}
            onClose={handleCloseModal}
            product={selectedProduct}
          />
        )}
        {modalType === 'edit' && (
          <EditProductModal
            open={true}
            onClose={handleCloseModal}
            product={selectedProduct}
            onSave={handleSaveEdit}
          />
        )}
        {modalType === 'delete' && (
          <DeleteProductModal
            open={true}
            onClose={handleCloseModal}
            product={selectedProduct}
            onDelete={handleDeleteProduct}
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
