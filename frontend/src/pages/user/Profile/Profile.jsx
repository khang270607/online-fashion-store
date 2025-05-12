import React, { useState } from 'react'
import {
  Box,
  Avatar,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton
} from '@mui/material'
import UploadIcon from '@mui/icons-material/CloudUpload'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'

const Profile = () => {
  const [tab, setTab] = useState(0)
  const [displayName, setDisplayName] = useState('truong')

  const handleTabChange = (_, newValue) => {
    setTab(newValue)
  }

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
      {/* Tabs */}
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

      {/* Main Content */}
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
            <Avatar
              sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
              src=''
              alt='User Avatar'
            />
            <Typography variant='h6'>truong6mui</Typography>
            <Typography variant='body2' color='text.secondary' mb={2}>
              @acquy666
            </Typography>
            <Button
              startIcon={<UploadIcon />}
              variant='contained'
              component='label'
              sx={{ mb: 3 }}
            >
              Upload
              <input hidden accept='image/*' type='file' />
            </Button>

            <TextField
              fullWidth
              label='Your Email'
              value='truonglenhut@gmail.com'
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1 }} />
              }}
              margin='normal'
              InputLabelProps={{ shrink: true }}
              disabled
            />

            <TextField
              fullWidth
              label='Your Username'
              value='acquy666'
              InputProps={{
                startAdornment: <PersonIcon sx={{ mr: 1 }} />
              }}
              margin='normal'
              InputLabelProps={{ shrink: true }}
              disabled
            />

            <TextField
              fullWidth
              label='Your Display Name'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              InputProps={{
                startAdornment: <PersonIcon sx={{ mr: 1 }} />
              }}
              margin='normal'
              InputLabelProps={{ shrink: true }}
            />

            <Button
              variant='contained'
              fullWidth
              sx={{ mt: 3, backgroundColor: '#007bff' }}
            >
              Update
            </Button>
          </Box>
        )}

        {tab === 1 && (
          <Box>
            <Typography variant='h6' textAlign='center' mb={3}>
              Security Settings (Coming Soon)
            </Typography>
            {/* Bạn có thể thêm form thay đổi mật khẩu hoặc xác thực 2 bước ở đây */}
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default Profile
