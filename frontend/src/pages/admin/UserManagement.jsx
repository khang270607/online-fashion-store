import * as React from 'react'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Stack
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { tableCellClasses } from '@mui/material/TableCell'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import EditUserModal from '~/components/modals/EditUserModal'
import DeleteUserModal from '~/components/modals/DeleteUserModal'
import ViewUserModal from '~/components/modals/ViewUserModal'
import { API_ROOT } from '~/utils/constants'
import AuthorizedAxiosInstance from '~/utils/authorizedAxios'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#001f5d',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    borderRight: '1px solid #e0e0e0',
    padding: '8px',
    whiteSpace: 'nowrap'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: '1px solid #e0e0e0',
    padding: '8px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
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
  overflowX: 'auto',
  maxWidth: '100%',
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
  [theme.breakpoints.down('sm')]: {
    minWidth: '600px'
  }
}))

const ROWS_PER_PAGE = 10

export default function UserManagement() {
  const [page, setPage] = React.useState(1)
  const [users, setUsers] = React.useState([])
  const [totalPages, setTotalPages] = React.useState(1)
  const [selectedUser, setSelectedUser] = React.useState(null)
  const [modalType, setModalType] = React.useState(null)

  const fetchUsers = async () => {
    try {
      const response = await AuthorizedAxiosInstance.get(`${API_ROOT}/v1/users`)
      console.log('Dữ liệu users trả về:', response.data)

      // Nếu API trả về dạng { data: [...], total: n }
      if (Array.isArray(response.data)) {
        setUsers(response.data)
        setTotalPages(Math.ceil(response.data.length / ROWS_PER_PAGE))
      } else if (response.data.data) {
        setUsers(response.data.data)
        setTotalPages(Math.ceil(response.data.total / ROWS_PER_PAGE))
      } else {
        console.error('Dữ liệu trả về không hợp lệ')
        setUsers([])
        setTotalPages(1)
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error)
      setUsers([])
      setTotalPages(1)
    }
  }

  const handleOpenModal = (type, user) => {
    console.log('User được chọn:', user) // Debug
    if (!user || !user.id) {
      console.error('ID người dùng không hợp lệ')
      return
    }
    setSelectedUser(user)
    setModalType(type)
  }

  React.useEffect(() => {
    fetchUsers()
  }, [page])

  const handleCloseModal = () => {
    setSelectedUser(null)
    setModalType(null)
  }

  const handleSaveEdit = () => {
    fetchUsers()
    handleCloseModal()
  }

  const handleDeleteUser = async (user) => {
    try {
      await AuthorizedAxiosInstance.delete(`${API_ROOT}/v1/users/${user.id}`)
      fetchUsers()
    } catch (error) {
      console.error('Lỗi khi xoá người dùng:', error)
    }
  }

  const handleChangePage = (event, value) => {
    setPage(value)
  }

  return (
    <>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Quản lý người dùng
      </Typography>

      <StyledTableContainer component={Paper}>
        <Table sx={{ tableLayout: 'fixed', minWidth: '100%' }}>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: '50px', textAlign: 'center' }}>
                STT
              </StyledTableCell>
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
            {users.map((user, index) => (
              <StyledTableRow key={user.id || index}>
                <StyledTableCell sx={{ textAlign: 'center' }}>
                  {(page - 1) * ROWS_PER_PAGE + index + 1}
                </StyledTableCell>
                <StyledTableCell title={user.name}>{user.name}</StyledTableCell>
                <StyledTableCell title={user.email}>
                  {user.email}
                </StyledTableCell>
                <StyledTableCell>
                  {user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                </StyledTableCell>
                <StyledTableCell className='hide-on-mobile'>
                  {new Date(user.createdAt).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell className='hide-on-mobile'>
                  {new Date(user.updatedAt).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction='row' spacing={1}>
                    <RemoveRedEyeIcon
                      sx={{ cursor: 'pointer', fontSize: '20px' }}
                      onClick={() => handleOpenModal('view', user)}
                    />
                    <BorderColorIcon
                      sx={{ cursor: 'pointer', fontSize: '20px' }}
                      onClick={() => handleOpenModal('edit', user)}
                    />
                    <DeleteForeverIcon
                      sx={{ cursor: 'pointer', fontSize: '20px' }}
                      onClick={() => handleOpenModal('delete', user)}
                    />
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Modal Hiển thị */}
      {modalType === 'view' && selectedUser && (
        <ViewUserModal
          open={true}
          onClose={handleCloseModal}
          user={selectedUser}
        />
      )}
      {modalType === 'edit' && selectedUser && selectedUser.id && (
        <EditUserModal
          open={true}
          onClose={handleCloseModal}
          user={selectedUser}
          onSave={handleSaveEdit}
        />
      )}
      {modalType === 'delete' && selectedUser && (
        <DeleteUserModal
          open={true}
          onClose={handleCloseModal}
          user={selectedUser}
          onDelete={handleDeleteUser}
        />
      )}

      <Stack spacing={2} sx={{ mt: 2 }} alignItems='center'>
        <Pagination
          count={totalPages}
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
