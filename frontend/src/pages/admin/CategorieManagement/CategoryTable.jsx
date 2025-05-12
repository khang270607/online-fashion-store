// components/CategoryTable.jsx
import React from 'react'
import { Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material'
import {
  StyledTableCell,
  StyledTableRow,
  StyledTableContainer
} from './CategoryTableStyles'
import CategoryRow from './CategoryRow'

const CategoryTable = ({ categories, loading, handleOpenModal }) => {
  const FilteredCategories = categories.filter((c) => c.destroy !== true)
  return (
    <Table>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell sx={{ textAlign: 'center', width: '50px' }}>
            STT
          </StyledTableCell>
          <StyledTableCell>Tên danh mục</StyledTableCell>
          <StyledTableCell>Mô tả</StyledTableCell>
          <StyledTableCell sx={{ width: '130px', maxWidth: '130px' }}>
            Hành động
          </StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          <StyledTableRow>
            <StyledTableCell colSpan={4} align='center'>
              Đang tải danh mục...
            </StyledTableCell>
          </StyledTableRow>
        ) : FilteredCategories.length === 0 ? (
          <StyledTableRow>
            <StyledTableCell colSpan={4} align='center'>
              Không có danh mục nào.
            </StyledTableCell>
          </StyledTableRow>
        ) : (
          FilteredCategories.map((category, idx) => (
            <CategoryRow
              key={category._id}
              category={category}
              idx={idx}
              handleOpenModal={handleOpenModal}
            />
          ))
        )}
      </TableBody>
    </Table>
  )
}

export default CategoryTable
