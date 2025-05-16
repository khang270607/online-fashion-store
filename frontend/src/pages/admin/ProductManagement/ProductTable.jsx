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
            <StyledTableCell sx={{ textAlign: 'center', width: '50px' }}>
              STT
            </StyledTableCell>
            <StyledTableCell sx={{ width: '50px' }}>Ảnh</StyledTableCell>
            <StyledTableCell>Tên</StyledTableCell>
            <StyledTableCell sx={{ width: '100px' }}>Giá (VNĐ)</StyledTableCell>
            <StyledTableCell sx={{ width: '70px' }}>Số lượng</StyledTableCell>
            <StyledTableCell>Mô tả</StyledTableCell>
            <StyledTableCell sx={{ width: '100px' }}>Xuất xứ</StyledTableCell>
            <StyledTableCell sx={{ width: '100px' }}>Danh mục</StyledTableCell>
            <StyledTableCell sx={{ width: '70px' }}>Trạng thái</StyledTableCell>
            <StyledTableCell sx={{ maxWidth: '130px', width: '130px' }}>
              Hành động
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} align='center'>
                Đang tải sản phẩm...
              </TableCell>
            </TableRow>
          ) : products.filter((product) => !product.destroy).length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align='center'>
                Không có sản phẩm nào.
              </TableCell>
            </TableRow>
          ) : (
            products
              .filter((product) => !product.destroy)
              .map((product, index) => (
                <ProductRow
                  key={product.id || index}
                  index={index + 1}
                  product={product}
                  handleOpenModal={handleOpenModal}
                />
              ))
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default ProductTable
