import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar
} from '@mui/material'
import useProfile from '~/hook/useUserProfile'

const CLOUDINARY_URI = 'https://api.cloudinary.com/v1_1/dkwsy9sph/image/upload'
const UPLOAD_PRESET = 'demo_unsigned'
const CLOUD_FOLDER = 'user_avatar'

const uploadToCloudinary = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('folder', CLOUD_FOLDER)

  const res = await fetch(CLOUDINARY_URI, {
    method: 'POST',
    body: formData
  })

  const data = await res.json()
  return data.secure_url
}

const EditProfileModal = ({ open, onClose, profile }) => {
  const { updateUserProfile } = useProfile()
  const [name, setName] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (profile) {
      setName(profile.name || '')
      setAvatarPreview(profile.avatarUrl || '')
    }
  }, [profile])

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    console.log('handleSubmit: test')
    setLoading(true)
    let avatarUrl = profile.avatarUrl
    if (avatarFile) {
      avatarUrl = await uploadToCloudinary(avatarFile)
    }

    console.log('name: ', name)
    console.log('avatarUrl: ', avatarUrl)
    await updateUserProfile({ name, avatarUrl })
    setLoading(false)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label='Tên'
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin='normal'
        />

        <Box display='flex' alignItems='center' mt={2}>
          <Avatar src={avatarPreview} sx={{ width: 80, height: 80, mr: 2 }} />
          <Button variant='outlined' component='label'>
            Chọn ảnh
            <input
              type='file'
              accept='image/*'
              hidden
              onChange={handleAvatarChange}
            />
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          onClick={handleSubmit}
          variant='contained'
          disabled={loading}
          sx={{ backgroundColor: '#001f5d' }}
        >
          {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditProfileModal
