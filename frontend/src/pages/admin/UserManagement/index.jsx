import * as React from 'react'
import Typography from '@mui/material/Typography'
import UserTable from './UserTable'
import UserPagination from './UserPagination'
import useUsers from '~/hook/useUsers'
// Lazy load các modal
const EditUserModal = React.lazy(
  () => import('../../../components/modals/EditUserModal.jsx')
)
const DeleteUserModal = React.lazy(
  () => import('../../../components/modals/DeleteUserModal.jsx')
)
const ViewUserModal = React.lazy(
  () => import('../../../components/modals/ViewUserModal.jsx')
)

const ROWS_PER_PAGE = 10

export default function UserManagement() {
  const [page, setPage] = React.useState(1)
  const [selectedUser, setSelectedUser] = React.useState(null)
  const [modalType, setModalType] = React.useState(null)
  const [EditUserModal, setEditUserModal] = React.useState(null)

  const { users, totalPages, fetchUsers, removeUser, Loading } = useUsers()

  // Gọi API duy nhất một lần khi component mount
  React.useEffect(() => {
    fetchUsers(page)
  }, [page])

  const handleOpenModal = async (type, user) => {
    if (!user || !user._id) return
    setSelectedUser(user)
    setModalType(type)

    if (type === 'view') {
      const { default: Modal } = await import(
        '../../../components/modals/ViewUserModal.jsx'
      )
      setEditUserModal(() => Modal)
    }
    if (type === 'edit') {
      const { default: Modal } = await import(
        '../../../components/modals/EditUserModal.jsx'
      )
      setEditUserModal(() => Modal)
    }
    if (type === 'delete') {
      const { default: Modal } = await import(
        '../../../components/modals/DeleteUserModal.jsx'
      )
      setEditUserModal(() => Modal)
    }
  }

  const handleCloseModal = () => {
    setSelectedUser(null)
    setModalType(null)
  }

  const handleDeleteUser = async (id) => {
    await removeUser(id, page) // ← truyền đúng page hiện tại
    handleCloseModal()
  }

  const handleChangePage = (event, value) => setPage(value)

  return (
    <>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Quản lý người dùng
      </Typography>
      <UserTable
        users={users}
        page={page}
        loading={Loading}
        handleOpenModal={handleOpenModal}
      />

      <React.Suspense fallback={<></>}>
        {modalType === 'view' && selectedUser && (
          <ViewUserModal open onClose={handleCloseModal} user={selectedUser} />
        )}
        {modalType === 'edit' && selectedUser && (
          <EditUserModal
            open
            onClose={handleCloseModal}
            user={selectedUser}
            onSave={fetchUsers}
          />
        )}
        {modalType === 'delete' && selectedUser && (
          <DeleteUserModal
            open
            onClose={handleCloseModal}
            user={selectedUser}
            onDelete={() => handleDeleteUser(selectedUser._id)}
          />
        )}
      </React.Suspense>

      <UserPagination
        page={page}
        totalPages={totalPages}
        onPageChange={handleChangePage}
      />
    </>
  )
}
