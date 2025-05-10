import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { modalPaperProps, dialogTitleStyle } from './StyleModal.js'

export default function ViewUserModal({ open, onClose, user }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      PaperProps={modalPaperProps}
    >
      <DialogTitle sx={{ ...dialogTitleStyle, pr: 5 }}>
        Thông tin người dùng
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography fontSize={18}>
            <strong>Tên:</strong> {user?.name}
          </Typography>
          <Typography fontSize={18}>
            <strong>Email:</strong> {user?.email}
          </Typography>
          <Typography fontSize={18}>
            <strong>Quyền:</strong>{' '}
            {user?.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
          </Typography>
          <Typography fontSize={18}>
            <strong>Ngày tạo:</strong>{' '}
            {user?.createdAt &&
              new Date(user.createdAt).toLocaleString('vi-VN')}
          </Typography>
          <Typography fontSize={18}>
            <strong>Ngày cập nhật:</strong>{' '}
            {user?.updatedAt &&
              new Date(user.updatedAt).toLocaleString('vi-VN')}
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
