import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MoreIcon from '@mui/icons-material/MoreVert'

export default function AdminAppBar({ open, onDrawerOpen, onProfileMenuOpen }) {
  const menuId = 'primary-search-account-menu'
  const mobileMenuId = 'primary-search-account-menu-mobile'

  return (
    <AppBar position='fixed' className={`app-bar ${open ? 'open' : ''}`}>
      <Toolbar className='app-bar--header'>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={onDrawerOpen}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap component='div'>
          Xin chào {/*Tên quản trị viên*/}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
            size='large'
            edge='end'
            aria-label='account of current user'
            aria-controls={menuId}
            aria-haspopup='true'
            onClick={onProfileMenuOpen}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size='large'
            aria-label='show more'
            aria-controls={mobileMenuId}
            aria-haspopup='true'
            onClick={onProfileMenuOpen}
            color='inherit'
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
