// components/Header.jsx
import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Box,
  Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { styled } from '@mui/system'
import Logo from './Navbar/Logo/Logo'
import Search from './Navbar/Search/Search'
import HeaderAction from './Navbar/HeaderAction/HeaderAction'
import MobileDrawer from './Navbar/MobileDrawer/MobileDrawer'
import Topbar from '../HeaderUser/Topbar/Topbar'
import Menu from './Navbar/Menu/Menu'
import AuthButtons from './Navbar/AuthButtons/AuthButtons'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #ffffff 0%, #f8f9fa 100%)',
  color: '#000',
  top: 40,
  position: 'fixed',
  zIndex: 1301,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  borderBottom: '1px solid rgba(0,0,0,0.05)',
  [theme.breakpoints.down('md')]: {
    top: 30
  }
}))

const HeaderUser = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      <Topbar></Topbar>
      {/* Navbar */}
      <StyledAppBar>
        <Container maxWidth='lg'>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: { xs: 56, sm: 64 }
            }}
          >
            {/* Phần logo và menu icon */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color='inherit'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h6'>
                <Logo href='/'>ICONDEWIM™</Logo>
              </Typography>
            </Box>
            <Box>
              <Menu></Menu>
            </Box>
            {/* Phần tìm kiếm và các hành động người dùng */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Search />
              <AuthButtons />
              <HeaderAction />
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Drawer cho mobile */}
      <MobileDrawer open={mobileOpen} onClose={handleDrawerToggle} />
    </>
  )
}

export default HeaderUser
