import React, { useState } from 'react'
import { Box, CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AdminAppBar from '~/components/HeaderAdmin/AppBar'
import AdminDrawer from '~/components/HeaderAdmin/Drawer'
import AdminMenu from '~/components/HeaderAdmin/Menu'
import '~/layout/AdminLayout.css'

export default function AdminLayout() {
  const [open, setOpen] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)
  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const styles = {
    box: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: '10px',
      zIndex: 1200
    }
  }

  return (
    <Box className={`admin-layout ${open ? 'open' : ''}`}>
      <Box onMouseEnter={() => !open && handleDrawerOpen()} sx={styles.box} />
      <CssBaseline />
      <AdminAppBar
        open={open}
        anchorEl={anchorEl}
        onDrawerOpen={handleDrawerOpen}
        onProfileMenuOpen={handleProfileMenuOpen}
        onProfileMenuClose={handleMenuClose}
        onMenuClose={handleDrawerClose}
      />
      <AdminDrawer open={open} onClose={handleDrawerClose} />
      <AdminMenu
        anchorEl={anchorEl}
        isOpen={Boolean(anchorEl)}
        onClose={handleMenuClose}
      />
      <main className='main-content'>
        <div className='drawer-header' />
        <Outlet />
      </main>
    </Box>
  )
}
