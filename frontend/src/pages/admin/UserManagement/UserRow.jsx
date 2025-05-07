// UserRow.jsx
import React from 'react'
import { TableRow, Stack } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { StyledTableCell, StyledTableRow } from './UserTableStyles'

export default React.memo(function UserRow({ user, index, handleOpenModal }) {
  return (
    <StyledTableRow>
      <StyledTableCell sx={{ textAlign: 'center' }}>{index}</StyledTableCell>
      <StyledTableCell title={user.name}>{user.name}</StyledTableCell>
      <StyledTableCell title={user.email}>{user.email}</StyledTableCell>
      <StyledTableCell>
        {user.role === 'Header' ? 'Quản trị viên' : 'Người dùng'}
      </StyledTableCell>
      <StyledTableCell className='hide-on-mobile'>
        {new Date(user.createdAt).toLocaleDateString()}
      </StyledTableCell>
      <StyledTableCell className='hide-on-mobile'>
        {new Date(user.updatedAt).toLocaleDateString()}
      </StyledTableCell>
      <StyledTableCell>
        <Stack direction='row' spacing={1}>
          <RemoveRedEyeIcon onClick={() => handleOpenModal('view', user)} />
          <BorderColorIcon onClick={() => handleOpenModal('edit', user)} />
          <DeleteForeverIcon onClick={() => handleOpenModal('delete', user)} />
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  )
})
