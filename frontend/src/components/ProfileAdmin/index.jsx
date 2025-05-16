import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Box,
  Typography,
  Grid,
  Divider,
  Button
} from '@mui/material'
import EditProfileModal from './modal/EditProfileModal.jsx'

export default function ProfileModal({ open, onClose, profile, fetchProfile }) {
  const [openEdit, setOpenEdit] = useState(false)

  if (!profile) {
    return null
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth='sm'
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            textAlign: 'center',
            fontSize: '1.5rem'
          }}
        >
          Hồ sơ người dùng
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ py: 3 }}>
          <Grid container spacing={3} alignItems='center'>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Avatar
                src={profile.avatarUrl}
                alt={profile.name}
                sx={{ width: 100, height: 100, border: '2px solid #ccc' }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant='subtitle2' color='text.secondary'>
                Tên
              </Typography>
              <Typography variant='body1' gutterBottom>
                {profile?.name
                  ?.toLowerCase()
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ') || ''}
              </Typography>

              <Typography variant='subtitle2' color='text.secondary'>
                Email
              </Typography>
              <Typography variant='body1'>{profile.email}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button color='inherit' onClick={onClose}>
            Đóng
          </Button>
          <Button
            variant='contained'
            sx={{ backgroundColor: '#001f5d' }}
            onClick={() => setOpenEdit(true)}
          >
            Chỉnh sửa hồ sơ
          </Button>
        </DialogActions>
      </Dialog>

      <EditProfileModal
        open={openEdit}
        onClose={() => {
          setOpenEdit(false)
          fetchProfile()
        }}
        profile={profile}
      />
    </>
  )
}
