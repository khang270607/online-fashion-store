import React, { useState, useEffect } from 'react'
import {
  Box,
  Avatar,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert
} from '@mui/material'
import UploadIcon from '@mui/icons-material/CloudUpload'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import { getProfile, updateProfile } from '~/services/userService'

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
  console.log('Phản hồi từ Cloudinary:', data)
  return data.secure_url
}

const Profile = () => {
  const [tab, setTab] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  const handleTabChange = (_, newValue) => {
    setTab(newValue)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setAvatarFile(file)
      const blobUrl = URL.createObjectURL(file)
      setAvatarPreview(blobUrl)
      console.log('URL blob ảnh xem trước:', blobUrl)
    }
  }

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  const handleUpdate = async () => {
    const trimmedName = name.trim()
    console.log('Giá trị name trước khi gửi:', trimmedName)
    if (!trimmedName) {
      showSnackbar('Tên không được để trống!', 'error')
      return
    }
    if (trimmedName.length < 3) {
      showSnackbar('Tên phải có ít nhất 3 ký tự!', 'error')
      return
    }

    setLoading(true)
    const payload = { name: trimmedName }
    if (avatarFile) {
      const avatarUrl = await uploadToCloudinary(avatarFile)
      if (!avatarUrl) {
        showSnackbar('Không thể upload ảnh!', 'error')
        setLoading(false)
        return
      }
      payload.avatarUrl = avatarUrl
    }

    console.log('Payload gửi lên:', payload)
    const result = await updateProfile(payload)
    setLoading(false)

    if (result && !result.error) {
      setName(result.name)
      setAvatarPreview(result.avatarUrl || '')
      setAvatarFile(null)
      showSnackbar('Cập nhật thành công!')
    } else {
      showSnackbar(
        `Cập nhật thất bại: ${result?.error?.message || 'Lỗi không xác định'}`,
        'error'
      )
      if (result?.error?.message.includes('avatarUrl')) {
        console.log('Thử lại chỉ với name')
        const retryResult = await updateProfile({ name: trimmedName })
        if (retryResult && !retryResult.error) {
          setName(retryResult.name)
          setAvatarPreview(retryResult.avatarUrl || '')
          setAvatarFile(null)
          showSnackbar('Cập nhật thành công (không bao gồm avatarUrl)!')
        } else {
          showSnackbar(
            `Cập nhật thất bại: ${retryResult?.error?.message || 'Lỗi không xác định'}`,
            'error'
          )
        }
      }
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      const profileData = await getProfile()
      if (profileData) {
        const initialName = profileData.name || 'User'
        console.log('Tên từ API:', initialName)
        console.log('Avatar URL từ API:', profileData.avatarUrl)
        setName(initialName)
        setEmail(profileData.email || '')
        setAvatarPreview(profileData.avatarUrl || '')
      } else {
        showSnackbar('Không thể tải thông tin hồ sơ!', 'error')
        setName('User')
        setAvatarPreview('')
      }
      setLoading(false)
    }

    fetchProfile()
  }, [])

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4
      }}
    >
      <Tabs
        value={tab}
        onChange={handleTabChange}
        centered
        textColor='primary'
        indicatorColor='primary'
        sx={{ mb: 3 }}
      >
        <Tab icon={<PersonIcon />} iconPosition='start' label='Account' />
        <Tab icon={<LockIcon />} iconPosition='start' label='Security' />
      </Tabs>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 500,
          backgroundColor: '#fff',
          borderRadius: 2
        }}
      >
        {tab === 0 && (
          <Box textAlign='center'>
            {loading ? (
              <Typography>Đang tải thông tin...</Typography>
            ) : (
              <>
                <Avatar
                  sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                  src={avatarPreview}
                  alt='User Avatar'
                />
                <Button
                  startIcon={<UploadIcon />}
                  variant='contained'
                  component='label'
                  sx={{ mb: 3 }}
                >
                  Chọn ảnh
                  <input
                    hidden
                    accept='image/*'
                    type='file'
                    onChange={handleImageChange}
                  />
                </Button>

                <TextField
                  fullWidth
                  label='Your Email'
                  value={email}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1 }} />
                  }}
                  margin='normal'
                  InputLabelProps={{ shrink: true }}
                  disabled
                />

                <TextField
                  fullWidth
                  label='Your Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1 }} />
                  }}
                  margin='normal'
                  InputLabelProps={{ shrink: true }}
                  error={!name.trim() || name.trim().length < 3}
                  helperText={
                    !name.trim()
                      ? 'Tên không được để trống'
                      : name.trim().length < 3
                        ? 'Tên phải có ít nhất 3 ký tự'
                        : ''
                  }
                />

                <Button
                  variant='contained'
                  fullWidth
                  sx={{ mt: 3, backgroundColor: '#007bff' }}
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? 'Đang cập nhật...' : 'Update'}
                </Button>
              </>
            )}
          </Box>
        )}

        {tab === 1 && (
          <Box>
            <Typography variant='h6' textAlign='center' mb={3}>
              Security Settings (Coming Soon)
            </Typography>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Profile
