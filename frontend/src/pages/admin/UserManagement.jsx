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

import EditUserModal from '~/components/modals/EditUserModal'
import DeleteUserModal from '~/components/modals/DeleteUserModal'
import ViewUserModal from '~/components/modals/ViewUserModal'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#001f5d',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    borderRight: '1px solid #e0e0e0',
    padding: '8px',
    whiteSpace: 'nowrap' // Ngăn văn bản xuống dòng
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: '1px solid #e0e0e0',
    padding: '8px',
    whiteSpace: 'nowrap', // Ngăn văn bản xuống dòng
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  // Ẩn cột không quan trọng trên mobile
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
  overflowX: 'auto', // Cho phép cuộn ngang
  maxWidth: '100%', // Không vượt quá màn hình
  // Tùy chỉnh thanh cuộn
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
  // Đảm bảo bảng đủ rộng để kích hoạt thanh cuộn trên mobile
  [theme.breakpoints.down('sm')]: {
    minWidth: '600px' // Chiều rộng tối thiểu để chứa các cột
  }
}))

const rows = [
  {
    name: 'Nguyễn Văn ANguyễn Văn ANguyễn Văn ANguyễn Văn ANguyễn Văn ANguyễn Văn ANguyễn Văn ANguyễn Văn ANguyễn Văn ANguyễn Văn ANguyễn Văn ANguyễn Văn ANguyễn Văn A',
    email:
      'vana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.comvana@gmail.com',
    role: 'user',
    registrationDate: '01/01/2024',
    updateDate: '01/01/2024'
  },
  {
    name: 'Trần Thị B',
    email: 'thib@gmail.com',
    role: 'admin',
    registrationDate: '15/01/2024',
    updateDate: '15/01/2024'
  },
  {
    name: 'Lê Văn C',
    email: 'vanc@gmail.com',
    role: 'user',
    registrationDate: '20/02/2024',
    updateDate: '20/02/2024'
  },
  {
    name: 'Nguyễn Văn D',
    email: 'alsdfhal@gmail.com',
    role: 'user',
    registrationDate: '20/02/2024',
    updateDate: '20/02/2024'
  },
  {
    name: 'Nguyễn Văn E',
    email: 'dahfad#gmai.com',
    role: 'user',
    registrationDate: '20/02/2024',
    updateDate: '20/02/2024'
  },
  {
    name: 'Nguyễn Văn A',
    email: 'vana@gmail.com',
    role: 'user',
    registrationDate: '01/01/2024',
    updateDate: '01/01/2024'
  },
  {
    name: 'Trần Thị B',
    email: 'thib@gmail.com',
    role: 'user',
    registrationDate: '15/01/2024',
    updateDate: '15/01/2024'
  },
  {
    name: 'Lê Văn C',
    email: 'vanc@gmail.com',
    role: 'user',
    registrationDate: '20/02/2024',
    updateDate: '20/02/2024'
  },
  {
    name: 'Nguyễn Văn D',
    email: 'alsdfhal@gmail.com',
    role: 'admin',
    registrationDate: '20/02/2024',
    updateDate: '20/02/2024'
  },
  {
    name: 'Nguyễn Văn E',
    email: 'dahfad#gmai.com',
    role: 'user',
    registrationDate: '20/02/2024',
    updateDate: '20/02/2024'
  },
  {
    name: 'Nguyễn Văn A',
    email: 'vana@gmail.com',
    role: 'user',
    registrationDate: '01/01/2024',
    updateDate: '01/01/2024'
  },
  {
    name: 'Trần Thị B',
    email: 'thib@gmail.com',
    role: 'user',
    registrationDate: '15/01/2024',
    updateDate: '15/01/2024'
  },
  {
    name: 'Lê Văn C',
    email: 'vanc@gmail.com',
    role: 'user',
    registrationDate: '20/02/2024',
    updateDate: '20/02/2024'
  },
  {
    name: 'Nguyễn Văn D',
    email: 'alsdfhal@gmail.com',
    role: 'admin',
    registrationDate: '20/02/2024',
    updateDate: '20/02/2024'
  },
  {
    name: 'Nguyễn Văn E',
    email: 'dahfad#gmai.com',
    role: 'user',
    registrationDate: '20/02/2024',
    updateDate: '20/02/2024'
  }
]
const ROWS_PER_PAGE = 10

export default function UserManagement() {
  const [page, setPage] = React.useState(1)
  const [selectedUser, setSelectedUser] = React.useState(null)
  const [modalType, setModalType] = React.useState(null)

  const handleOpenModal = (type, user) => {
    setSelectedUser(user)
    setModalType(type)
  }

  const handleCloseModal = () => {
    setSelectedUser(null)
    setModalType(null)
  }

  const handleSaveEdit = (updatedUser) => {
    console.log('Cập nhật:', updatedUser)
  }

  const handleDeleteUser = (user) => {
    console.log('Xoá:', user)
  }

  const pageCount = Math.ceil(rows.length / ROWS_PER_PAGE)
  const displayedRows = rows.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  )

  const handleChangePage = (event, value) => {
    setPage(value)
  }

  return (
    <>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Quản lý người dùng
      </Typography>
      <StyledTableContainer component={Paper}>
        <Table
          sx={{
            tableLayout: 'fixed', // Đảm bảo chiều rộng cột cố định
            minWidth: '100%' // Bảng chiếm toàn bộ không gian container
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: '60px' }}>STT</StyledTableCell>
              <StyledTableCell sx={{ width: '200px' }}>
                Tên người dùng
              </StyledTableCell>
              <StyledTableCell sx={{ width: '250px' }}>Email</StyledTableCell>
              <StyledTableCell sx={{ width: '100px' }}>Quyền</StyledTableCell>
              <StyledTableCell
                sx={{ width: '120px' }}
                className='hide-on-mobile'
              >
                Ngày tạo
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
            {displayedRows.map((row, index) => (
              <StyledTableRow key={`${row.email}-${index}`}>
                <StyledTableCell>
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
                    title={row.name}
                  >
                    {row.name}
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
                    title={row.email}
                  >
                    {row.email}
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  {row.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                </StyledTableCell>
                <StyledTableCell className='hide-on-mobile'>
                  {row.registrationDate}
                </StyledTableCell>
                <StyledTableCell className='hide-on-mobile'>
                  {row.updateDate}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <BorderColorIcon
                    sx={{ cursor: 'pointer', fontSize: '20px' }}
                    onClick={() => handleOpenModal('edit', row)}
                  />
                  <DeleteForeverIcon
                    sx={{ cursor: 'pointer', fontSize: '20px' }}
                    onClick={() => handleOpenModal('delete', row)}
                  />
                  <RemoveRedEyeIcon
                    sx={{ cursor: 'pointer', fontSize: '20px' }}
                    onClick={() => handleOpenModal('view', row)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {modalType === 'edit' && (
          <EditUserModal
            open={true}
            onClose={handleCloseModal}
            user={selectedUser}
            onSave={handleSaveEdit}
          />
        )}
        {modalType === 'delete' && (
          <DeleteUserModal
            open={true}
            onClose={handleCloseModal}
            user={selectedUser}
            onDelete={handleDeleteUser}
          />
        )}
        {modalType === 'view' && (
          <ViewUserModal
            open={true}
            onClose={handleCloseModal}
            user={selectedUser}
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
