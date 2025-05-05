import * as React from 'react'
// import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Outlet, Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MoreIcon from '@mui/icons-material/MoreVert'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import '~/layout/AdminLayout.css' // Import file CSS

const tab = [
  { name: 'Thống kê', path: '/admin' },
  { name: 'Quản lý người dùng', path: '/admin/users' },
  { name: 'Quản lý danh mục', path: '/admin/categories' },
  { name: 'Quản lý sản phẩm', path: '/admin/products' },
  { name: 'Quản lý đơn hàng', path: '/admin/orders' }
]

const MenuItems = ['Đăng xuất']

export default function AdminLayout() {
  // const theme = useTheme()
  const [open, setOpen] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const IsMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMobileMoreAnchorEl(null)
  }

  const HandleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const mobileMenuId = 'primary-search-account-menu-mobile'

  return (
    <Box className={`admin-layout ${open ? 'open' : ''}`}>
      {/* Vùng cảm biến để mở Drawer khi hover gần lề trái */}
      <Box
        onMouseEnter={() => {
          if (!open) handleDrawerOpen()
        }}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '10px',
          zIndex: 1200 // cao hơn nội dung khác nhưng thấp hơn Drawer
        }}
      />

      <Menu
        sx={{ marginTop: '30px', zIndex: '99999' }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {MenuItems.map((item) => (
          <MenuItem
            key={item}
            onClick={() => {
              handleMenuClose()
              // Xử lý đăng xuất tại đây
              console.log('Đăng xuất') // Thay bằng hành động thực tế, ví dụ xóa token, redirect,...
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>

      <CssBaseline />
      <AppBar
        position='fixed'
        className={`app-bar ${open ? 'open' : ''}`} // Thêm class cho AppBar
      >
        <Toolbar className='app-bar--header'>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Xin chào {/*tên quản trị viên*/}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
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
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        className={`drawer ${open ? 'open' : ''}`}
        classes={{ paper: 'drawer-paper' }}
        variant='temporary'
        anchor='left'
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
          BackdropProps: {
            sx: {
              backgroundColor: 'transparent' // Không làm mờ nền
            }
          }
        }}
      >
        <div className='drawer-header Drawer-header'></div>
        <Divider />
        <List sx={{ padding: 0 }} className='drawer-list'>
          {tab.map((text) => (
            <Link to={text.path} className='drawer-link' key={text.name}>
              <ListItem className='list-item' disablePadding>
                <ListItemButton className='list-item-button'>
                  <ListItemIcon
                    className='list-item-icon'
                    sx={{ minWidth: '36px' }}
                  >
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    className='list-item-text'
                    primary={text.name}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <main className={'main-content'}>
        <div className='drawer-header' />
        <Outlet />
      </main>
    </Box>
  )
}
