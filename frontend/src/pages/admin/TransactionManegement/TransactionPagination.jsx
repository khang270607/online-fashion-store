import React from 'react'
import { Pagination, Stack } from '@mui/material'

const TransactionPagination = ({ page, totalPages, onChange }) => {
  return (
    <Stack spacing={2} alignItems='center' mt={2}>
      <Pagination
        color='primary'
        count={totalPages}
        page={page}
        onChange={(e, value) => onChange(value)}
        shape='rounded'
      />
    </Stack>
  )
}

export default TransactionPagination
