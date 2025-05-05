import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'

export default function ViewUserModal({ open, onClose, user }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '14px'
        }
      }}
    >
      <div style={{ padding: '24px' }}>
        <DialogTitle>Thông tin người dùng</DialogTitle>
        <DialogContent>
          <Typography>
            <strong>Tên:</strong> {user?.name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {user?.email}
          </Typography>
          <Typography>
            <strong>Quyền:</strong> {user?.role}
          </Typography>
          <Typography>
            <strong>Ngày tạo:</strong> {user?.registrationDate}
          </Typography>
          <Typography>
            <strong>Ngày cập nhật:</strong> {user?.updateDate}
          </Typography>
        </DialogContent>
      </div>
    </Dialog>
  )
}
