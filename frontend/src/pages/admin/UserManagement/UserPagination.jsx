import React from 'react'
import { Pagination, Stack } from '@mui/material'

export default function UserPagination({ page, totalPages, onPageChange }) {
  return (
    <Stack spacing={2} sx={{ mt: 2 }} alignItems='center'>
      <Pagination
        count={totalPages}
        page={page}
        onChange={onPageChange}
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
  )
}
