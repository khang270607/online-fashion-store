import React, { useEffect, useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'

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

const AuthButtons = () => {
  const [user, setUser] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'))
      if (storedUser && storedUser.name) {
        setUser(storedUser)
      } else {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.error('Lỗi khi đọc user từ localStorage:', error)
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }, [])

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    handleMenuClose()
    navigate('/') // Điều hướng về trang chủ
  }

  return (
    <div>
      {!user ? (
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
          <StyledButton onClick={handleMenuClick}>
            {user.name || 'Người dùng'}
          </StyledButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to='/profile' onClick={handleMenuClose}>
              Hồ sơ
            </MenuItem>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </>
      )}
    </div>
  )
}

export default AuthButtons
