import React, { useEffect, useState } from 'react'
import { Button, Menu, MenuItem, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
import { getProfile } from '~/services/userService'

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#000',
  fontWeight: 500,
  padding: '8px 16px',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#e9ecef',
    transform: 'translateY(-2px)'
  },
  [theme.breakpoints.down('md')]: {
    padding: '6px 12px',
    fontSize: '0.9rem'
  }
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: '#000',
  fontWeight: 500,
  padding: '8px 16px',
  borderRadius: '20px',
  display: 'inline-block',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#e9ecef',
    transform: 'translateY(-2px)'
  },
  [theme.breakpoints.down('md')]: {
    padding: '6px 12px',
    fontSize: '0.9rem'
  }
}))

const AuthButtons = () => {
  const [userName, setUserName] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  // Lấy thông tin người dùng từ API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile()
        if (profileData && profileData.name) {
          setUserName(profileData.name)
          console.log('Tên từ API:', profileData.name)
        } else {
          setUserName(null)
          localStorage.removeItem('token')
        }
      } catch (error) {
        console.error('Lỗi khi gọi getProfile:', error)
        setUserName(null)
        localStorage.removeItem('token')
      }
    }

    fetchProfile()
  }, [])

  return (
    <div>
      {!userName ? (
        <>
          <StyledButton color='inherit' component={Link} to='/register'>
            Đăng ký
          </StyledButton>
          <StyledButton color='inherit' component={Link} to='/login'>
            Đăng nhập
          </StyledButton>
        </>
      ) : (
        <>
          <StyledTypography>{userName || 'Người dùng'}</StyledTypography>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}></Menu>
        </>
      )}
    </div>
  )
}

export default AuthButtons
