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

const ProductTable = ({ products, loading, handleOpenModal }) => {
  if (loading) return <CircularProgress />

  return (
    <>
      <Button
        variant='contained'
        onClick={() => handleOpenModal('add')}
        sx={{ mb: 2 }}
      >
        Thêm sản phẩm
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Danh mục</TableCell>
            <TableCell>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p, i) => (
            <ProductRow
              key={p._id}
              index={i + 1}
              product={p}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default ProductTable
