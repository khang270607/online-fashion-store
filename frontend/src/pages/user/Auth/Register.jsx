import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Card as MuiCard, Typography } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import authorizedAxiosInstance from '~/utils/authorizedAxios.js'
// import { toast } from 'react-toastify'
import { API_ROOT } from '~/utils/constants.js'
import { useNavigate } from 'react-router-dom'

function Resgister() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()

  const submitLogIn = async (data) => {
    const res = await authorizedAxiosInstance.post(
      `${API_ROOT}/v1/auth/login`,
      data
    )
    console.log('Data from API: ', res.data)

    const userInfoFromLocalstorage = localStorage.getItem('userInfo')
    console.log(
      'Data from Localstorage: ',
      JSON.parse(userInfoFromLocalstorage)
    )

    const userInfo = {
      id: res.data.id,
      email: res.data.email
    }

    // Lưu token và thông tin của User vào Localstoge, dùng JS thuần
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
        justifyContent: 'flex-start',
        background: 'url("src/assets/trungquandev-bg-img.jpeg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.4)'
      }}
    >
      <form onSubmit={handleSubmit(submitLogIn)}>
        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <MuiCard
            sx={{
              minWidth: 380,
              maxWidth: 380,
              marginTop: '6em',
              p: '0.5em 0',
              borderRadius: 2
            }}
          >
            <Box sx={{ width: '70px', bgcolor: 'white', margin: '0 auto' }}>
              <img alt='' width='100%' />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: (theme) => theme.palette.grey[500]
              }}
            ></Box>

            <Box sx={{ padding: '0 1em 1em 1em' }}>
              <Typography>Email: anh@gmail.com</Typography>
              <Typography>Pass: Anh@88888888</Typography>

              <Box sx={{ marginTop: '1.2em' }}>
                <TextField
                  autoFocus
                  fullWidth
                  label='Enter Email...'
                  type='text'
                  variant='outlined'
                  error={!!errors.email}
                  {...register('email', {
                    required: 'This field is required.'
                  })}
                />
                {errors.email && (
                  <Alert
                    severity='error'
                    sx={{
                      mt: '0.7em',
                      '.MuiAlert-message': { overflow: 'hidden' }
                    }}
                  >
                    {errors.email.message}
                  </Alert>
                )}
              </Box>

              <Box sx={{ marginTop: '1em' }}>
                <TextField
                  fullWidth
                  label='Enter Password...'
                  type='password'
                  variant='outlined'
                  error={!!errors.password}
                  {...register('password', {
                    required: 'This field is required.'
                  })}
                />
                {errors.password && (
                  <Alert
                    severity='error'
                    sx={{
                      mt: '0.7em',
                      '.MuiAlert-message': { overflow: 'hidden' }
                    }}
                  >
                    {errors.password.message}
                  </Alert>
                )}
              </Box>
            </Box>
            {/*register*/}
            <CardActions sx={{ padding: '0.5em 1em 1em 1em' }}>
              <Button
                className='interceptor-loading'
                type='submit'
                variant='contained'
                color='primary'
                size='large'
                fullWidth
              >
                Đăng ký
              </Button>
            </CardActions>
          </MuiCard>
        </Zoom>
      </form>
    </Box>
  )
}

export default Resgister
