import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function DeleteUserModal({ open, onClose, user, onDelete }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xoá người dùng</DialogTitle>
      <DialogContent>
        <Typography>
          Bạn có chắc chắn muốn xoá tài khoản của <strong>{user?.name}</strong>{' '}
          không?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button
          variant='contained'
          color='error'
          onClick={() => {
            onDelete(user)
            onClose()
          }}
        >
          Xoá
        </Button>
      </DialogActions>
    </Dialog>
  )
}
