import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'
import { useForm } from 'react-hook-form'

const DeleteUserModal = ({ open, onClose, user, onDelete }) => {
  const { handleSubmit } = useForm()

  const onSubmit = async () => {
    try {
      await onDelete(user)
      onClose()
    } catch (error) {
      console.error('Xóa người dùng thất bại:', error)
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
        <Button onClick={onClose}>Hủy</Button>
        <Button
          variant='contained'
          color='error'
          onClick={handleSubmit(onSubmit)}
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteUserModal
