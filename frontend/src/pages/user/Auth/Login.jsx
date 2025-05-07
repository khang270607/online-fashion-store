import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Card as MuiCard, Grid, Typography } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Facebook, GitHub, Google } from '@mui/icons-material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { styled } from '@mui/system'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import authorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'
import { loginUserAPI } from '~/redux/user/userSlice'
import { registerUserAPI } from '~/apis/index.js'
import { selectCurrentUser } from '~/redux/user/userSlice'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // const currentUser = useSelector(selectCurrentUser)
  //
  // if (currentUser) {
  //   return <Navigate to='/' replace={true} />
  // }

  const submitLogIn = async (data) => {
    toast
      .promise(dispatch(loginUserAPI(data)), {
        pending: 'Đang đăng nhập...'
      })
      .then((res) => {
        // Đoạn này phải kiểm tra không có lỗi thì mới redirect về route /
        console.log(res)
        if (!res.error) {
          navigate('/')
        }
      })

    // const res = await authorizedAxiosInstance.post(
    //   `${API_ROOT}/v1/auth/login`,
    //   data
    // )
    // console.log('Data from API: ', res.data)
    //
    // const userInfoFromLocalstorage = localStorage.getItem('userInfo')
    // console.log(
    //   'Data from Localstorage: ',
    //   JSON.parse(userInfoFromLocalstorage)
    // )
    //
    // const userInfo = {
    //   id: res.data.id,
    //   email: res.data.email
    // }
    //
    // localStorage.setItem('accessToken', res.data.accessToken)
    // localStorage.setItem('refreshToken', res.data.refreshToken)
    // localStorage.setItem('userInfo', JSON.stringify(userInfo))
    //
    // navigate('/')
  }
  const SocialButton = styled(Button)({
    padding: '8px',
    borderRadius: '50%',
    minWidth: '40px',
    height: '40px',
    borderColor: '#e0e0e0',
    '&:hover': {
      borderColor: '#1976d2',
      backgroundColor: '#f5f5f5'
    }
  })
  const StyledButton = styled(Button)({
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 600,
    borderRadius: '8px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#1565c0',
      transform: 'translateY(-1px)',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
    }
  })
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
        p: 2
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
              p: 3,
              borderRadius: 3,
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              marginTop: '50px'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant='h5' fontWeight='bold' gutterBottom>
                Chào mừng trở lại
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Vui lòng đăng nhập để tiếp tục
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                autoFocus
                fullWidth
                label='Email'
                type='email'
                variant='outlined'
                error={!!errors.email}
                {...register('email', {
                  required: 'Email không được để trống.'
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
                  required: 'Mật khẩu không được để trống.'
                })}
              />
              {errors.password && (
                <Alert severity='error' sx={{ mt: 1 }}>
                  {errors.password.message}
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
                Đăng nhập
              </Button>
            </CardActions>
            <Grid item xs={12}>
              <Typography
                align='center'
                sx={{ mt: 1.5, color: '#666', fontSize: '0.9rem' }}
              >
                <a
                  href='/forgot-password'
                  style={{
                    color: '#1976d2',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                >
                  Quên mật khẩu?
                </a>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                align='center'
                sx={{ mt: 1, color: '#666', fontSize: '0.9rem' }}
              >
                Bạn chưa có tài khoản?{' '}
                <a
                  href='/Register'
                  style={{
                    color: '#1976d2',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                >
                  Đăng ký ngay
                </a>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2
                }}
              >
                <SocialButton variant='outlined'>
                  <Facebook sx={{ color: '#3b5998' }} />
                </SocialButton>
                <SocialButton variant='outlined'>
                  <Google sx={{ color: '#db4437' }} />
                </SocialButton>
                <SocialButton variant='outlined'>
                  <GitHub sx={{ color: '#333333' }} />
                </SocialButton>
              </Box>
            </Grid>
          </MuiCard>
        </Zoom>
      </form>
    </Box>
  )
}

export default Login
