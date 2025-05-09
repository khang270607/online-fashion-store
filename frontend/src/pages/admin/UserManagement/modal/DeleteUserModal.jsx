import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import AuthorizedAxiosInstance from '~/utils/authorizedAxios.js'
import { API_ROOT } from '~/utils/constants.js'
const DeleteUserModal = React.memo(({ open, onClose, user, onDelete }) => {
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleDelete = async () => {
    if (!user?._id) return // Kiểm tra ID trước khi xóa
    setIsDeleting(true)
    try {
      await onDelete(user._id)
      onClose()
    } catch (error) {
      console.error('Xóa người dùng thất bại:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa người dùng</DialogTitle>
      <DialogContent>
        Bạn có chắc chắn muốn xóa người dùng <strong>{user?.name}</strong>{' '}
        không?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting} color='#001f5d'>
          Hủy
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={handleDelete}
          disabled={isDeleting}
          startIcon={isDeleting ? <CircularProgress size={20} /> : null}
        >
          {isDeleting ? 'Đang xóa' : 'Xóa'}
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default DeleteUserModal
