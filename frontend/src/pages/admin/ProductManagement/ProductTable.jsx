import React from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Button
} from '@mui/material'
import ProductRow from './ProductRow'
import {
  StyledTableCell,
  StyledTableRow,
  StyledTableContainer
} from '~/pages/admin/CategorieManagement/CategoryTableStyles.jsx'
import AddIcon from '@mui/icons-material/Add'
const ProductTable = ({ products, loading, handleOpenModal }) => {
  if (loading) return <CircularProgress />

  return (
    <>
      <Button
        variant='contained'
        sx={{ mb: 2, backgroundColor: '#001f5d' }}
        startIcon={<AddIcon />}
        onClick={() => handleOpenModal('add')}
      >
        Thêm sản phẩm
      </Button>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>STT</StyledTableCell>
            <StyledTableCell>Ảnh</StyledTableCell>
            <StyledTableCell>Tên</StyledTableCell>
            <StyledTableCell>Giá</StyledTableCell>
            <StyledTableCell>Số lượng</StyledTableCell>
            <StyledTableCell>Mô tả</StyledTableCell>
            <StyledTableCell>Danh mục</StyledTableCell>
            <StyledTableCell>Thao tác</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {products
            .filter((product) => !product.destroy) // Lọc những sản phẩm không có `destroy` là true
            .map((product, index) => {
              return (
                <ProductRow
                  key={product.id ? product.id : index}
                  index={index + 1}
                  product={product}
                  handleOpenModal={handleOpenModal}
                />
              )
            })}
        </TableBody>
      </Table>
    </>
  )
}

export default ProductTable
