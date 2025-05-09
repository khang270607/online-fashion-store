// components/CategoryRow.jsx
import React from 'react'
import { TableRow, Stack } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
  StyledTableCell,
  StyledTableRow,
  StyledTableContainer
} from './CategoryTableStyles'

export default function CategoryRow({ category, idx, handleOpenModal }) {
  return (
    <StyledTableRow>
      <StyledTableCell sx={{ textAlign: 'center' }}>{idx + 1}</StyledTableCell>
      <StyledTableCell
        sx={{
          maxWidth: 200,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {category.name}
      </StyledTableCell>
      <StyledTableCell
        sx={{
          maxWidth: 300,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {category.description}
      </StyledTableCell>
      <StyledTableCell>
        <Stack direction='row' spacing={1}>
          <RemoveRedEyeIcon onClick={() => handleOpenModal('view', category)} />
          <BorderColorIcon onClick={() => handleOpenModal('edit', category)} />
          <DeleteForeverIcon
            onClick={() => handleOpenModal('delete', category)}
          />
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  )
}
