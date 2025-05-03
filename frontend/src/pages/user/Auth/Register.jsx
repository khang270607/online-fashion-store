import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Card as MuiCard, Grid, Typography } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import authorizedAxiosInstance from '~/utils/authorizedAxios.js'
import { API_ROOT } from '~/utils/constants.js'
import { useNavigate } from 'react-router-dom'
import ArrowBack from '@mui/icons-material/ArrowBack' // ICON mới thêm

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()

  const submitLogIn = async (data) => {
    const res = await authorizedAxiosInstance.post(
      `${API_ROOT}/v1/auth/register`,
      data
    )

    const userInfo = {
      id: res.data.id,
      email: res.data.email
    }

    localStorage.setItem('accessToken', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))

    navigate('/')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage:
          'url("https://inuv247.com/wp-content/uploads/2022/12/11702107_21201466-2-1536x614.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.4)',
        p: 2,
        position: 'relative' // cần để hỗ trợ positioning
      }}
    >
      {/* Nút quay về trang chủ */}
      <Button
        variant='contained'
        color='secondary'
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 10,
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
          px: 2
        }}
        startIcon={<ArrowBack />}
      >
        Trang chủ
      </Button>

      <form onSubmit={handleSubmit(submitLogIn)}>
        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <MuiCard
            elevation={6}
            sx={{
              width: { xs: '90vw', sm: 400 },
              mt: 6,
              p: 3,
              borderRadius: 3,
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant='h5' fontWeight='bold' gutterBottom>
                Tạo tài khoản mới
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Vui lòng điền đầy đủ thông tin bên dưới
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label='Tên hiển thị'
                type='text'
                variant='outlined'
                error={!!errors.name}
                {...register('name', {
                  required: 'Vui lòng nhập tên hiển thị.'
                })}
              />
              {errors.name && (
                <Alert severity='error' sx={{ mt: 1 }}>
                  {errors.name.message}
                </Alert>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label='Email'
                type='email'
                variant='outlined'
                error={!!errors.email}
                {...register('email', {
                  required: 'Vui lòng nhập email.'
                })}
              />
              {errors.email && (
                <Alert severity='error' sx={{ mt: 1 }}>
                  {errors.email.message}
                </Alert>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label='Mật khẩu'
                type='password'
                variant='outlined'
                error={!!errors.password}
                {...register('password', {
                  required: 'Vui lòng nhập mật khẩu.'
                })}
              />
              {errors.password && (
                <Alert severity='error' sx={{ mt: 1 }}>
                  {errors.password.message}
                </Alert>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label='Xác nhận mật khẩu'
                type='password'
                variant='outlined'
                error={!!errors.confirmPassword}
                {...register('confirmPassword', {
                  required: 'Vui lòng xác nhận mật khẩu.'
                })}
              />
              {errors.confirmPassword && (
                <Alert severity='error' sx={{ mt: 1 }}>
                  {errors.confirmPassword.message}
                </Alert>
              )}
            </Box>

            <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
              <Button
                className='interceptor-loading'
                type='submit'
                variant='contained'
                color='primary'
                size='large'
                fullWidth
                sx={{ py: 1.2, borderRadius: 2 }}
              >
                Đăng ký
              </Button>
            </CardActions>

            <Grid item xs={12}>
              <Typography
                align='center'
                sx={{ mt: 1, color: '#666', fontSize: '0.9rem' }}
              >
                Bạn đã có tài khoản?{' '}
                <a
                  href='/login'
                  style={{
                    color: '#1976d2',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                >
                  Đăng nhập ngay
                </a>
              </Typography>
            </Grid>
          </MuiCard>
        </Zoom>
      </form>
    </Box>
  )
}

export default Register
