import React, { useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Divider
} from '@mui/material'
import StyleAdmin from '~/components/StyleAdmin.jsx'
const ViewUserModal = React.memo(({ open, onClose, user }) => {
  useEffect(() => {
    if (!open) {
      // Reset dữ liệu khi đóng modal
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle sx={{ paddingBottom: 0 }}>Chi tiết người dùng</DialogTitle>
      <Divider />
      <DialogContent>
        <TextField
          label='Tên người dùng'
          fullWidth
          margin='normal'
          value={user?.name || ''}
          InputProps={{ readOnly: true }}
          sx={{
            ...StyleAdmin.InputCustom,
            ...StyleAdmin.InputCustom.CursorNone
          }}
        />
        <TextField
          label='Email'
          fullWidth
          margin='normal'
          value={user?.email || ''}
          InputProps={{ readOnly: true }}
          sx={{
            ...StyleAdmin.InputCustom,
            ...StyleAdmin.InputCustom.CursorNone
          }}
        />
        <TextField
          label='Quyền'
          fullWidth
          margin='normal'
          value={user?.role === 'admin' ? 'QUẢN TRỊ' : 'KHÁCH HÀNG'}
          InputProps={{ readOnly: true }}
          sx={{
            ...StyleAdmin.InputCustom,
            ...StyleAdmin.InputCustom.CursorNone
          }}
        />
        <TextField
          label='Ngày tạo'
          fullWidth
          margin='normal'
          value={
            user?.createdAt ? new Date(user.createdAt).toLocaleString() : ''
          }
          InputProps={{ readOnly: true }}
          sx={{
            ...StyleAdmin.InputCustom,
            ...StyleAdmin.InputCustom.CursorNone
          }}
        />
        <TextField
          label='Ngày cập nhật'
          fullWidth
          margin='normal'
          value={
            user?.updatedAt ? new Date(user.updatedAt).toLocaleString() : ''
          }
          InputProps={{ readOnly: true }}
          sx={{
            ...StyleAdmin.InputCustom,
            ...StyleAdmin.InputCustom.CursorNone
          }}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} variant='contained' color='error'>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default ViewUserModal
