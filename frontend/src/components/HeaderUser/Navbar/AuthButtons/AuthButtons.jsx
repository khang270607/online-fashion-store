// src/components/AuthButtons.js

import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
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
  return (
    <div>
      <StyledButton color='inherit' component={Link} to='/register'>
        Đăng ký
      </StyledButton>
      <StyledButton color='inherit' component={Link} to='/login'>
        Đăng nhập
      </StyledButton>
    </div>
  )
}

export default AuthButtons
