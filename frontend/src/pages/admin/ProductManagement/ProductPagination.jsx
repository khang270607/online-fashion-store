import React from 'react'
import { Pagination } from '@mui/material'

const ProductPagination = ({ page, totalPages, onPageChange }) => (
  <Pagination
    count={totalPages}
    page={page}
    onChange={onPageChange}
    sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
  />
)

export default ProductPagination
