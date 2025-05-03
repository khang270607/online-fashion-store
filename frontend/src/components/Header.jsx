import React, { useState, useRef, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Popover,
  Container,
  TextField,
  InputAdornment,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Menu,
  MenuItem
} from '@mui/material'
import { styled } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import MenuIcon from '@mui/icons-material/Menu'

// Styled Components
const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#03235e',
  color: 'white',
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  zIndex: 1302,
  [theme.breakpoints.down('sm')]: {
    height: '30px',
    fontSize: '0.8rem'
  }
}))

const MarqueeText = styled('div')({
  display: 'inline-block',
  paddingLeft: '100%',
  animation: 'marquee 15s linear infinite',
  '@keyframes marquee': {
    '0%': { transform: 'translateX(0%)' },
    '100%': { transform: 'translateX(-100%)' }
  }
})

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

const LogoButton = styled(Button)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 700,
  color: '#03235e',
  textTransform: 'none',
  letterSpacing: '1px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '22px'
  }
}))

const SearchField = styled(TextField)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  borderRadius: '20px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    '& fieldset': {
      border: 'none'
    }
  },
  [theme.breakpoints.down('sm')]: {
    width: '150px'
  }
}))

const Header = () => {
  const [hoveredMenu, setHoveredMenu] = useState({ name: null, el: null })
  const [mobileOpen, setMobileOpen] = useState(false)
  const [personMenuAnchor, setPersonMenuAnchor] = useState(null)
  const hoverTimeout = useRef(null)

  const handleHover = (menu, el) => {
    clearTimeout(hoverTimeout.current)
    setHoveredMenu({ name: menu, el })
  }

  const handleLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHoveredMenu({ name: null, el: null })
    }, 200)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handlePersonMenuOpen = (event) => {
    setPersonMenuAnchor(event.currentTarget)
  }

  const handlePersonMenuClose = () => {
    setPersonMenuAnchor(null)
  }

  // Đóng submenu khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      if (personMenuAnchor) {
        handlePersonMenuClose()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [personMenuAnchor])

  const personMenuOpen = Boolean(personMenuAnchor)

  const renderPopoverContent = (menu) => {
    const sectionStyle = {
      minWidth: 150,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }

    if (menu === 'Sản phẩm') {
      return (
        <Box sx={{ display: 'flex', gap: 4, p: 2 }}>
          <Box sx={sectionStyle}>
            <Typography variant='subtitle1' fontWeight={600} align='center'>
              ÁO
            </Typography>
            <Button size='small'>Áo Thun</Button>
            <Button size='small'>Áo Polo</Button>
            <Button size='small'>Áo Sơ Mi</Button>
            <Button size='small'>Áo Gile</Button>
          </Box>
          <Box sx={sectionStyle}>
            <Typography variant='subtitle1' fontWeight={600} align='center'>
              QUẦN
            </Typography>
            <Button size='small'>Quần Jean</Button>
            <Button size='small'>Quần Short</Button>
          </Box>
          <Box sx={sectionStyle}>
            <Typography variant='subtitle1' fontWeight={600} align='center'>
              PHỤ KIỆN
            </Typography>
            <Button size='small'>Nón</Button>
            <Button size='small'>Vớ</Button>
          </Box>
        </Box>
      )
    }

    if (menu === 'Áo Nam') {
      return (
        <Box sx={sectionStyle}>
          <Typography variant='subtitle1' fontWeight={600} align='center'>
            ÁO NAM
          </Typography>
          <Button size='small'>Áo Thun</Button>
          <Button size='small'>Áo Polo</Button>
          <Button size='small'>Áo Sơmi</Button>
        </Box>
      )
    }

    if (menu === 'Quần Nam') {
      return (
        <Box sx={sectionStyle}>
          <Typography variant='subtitle1' fontWeight={600} align='center'>
            QUẦN NAM
          </Typography>
          <Button size='small'>Quần Jean</Button>
          <Button size='small'>Quần Kaki</Button>
          <Button size='small'>Quần Short</Button>
          <Button size='small'>Quần Què</Button>
        </Box>
      )
    }

    return null
  }

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant='h6' sx={{ p: 2, fontWeight: 700 }}>
        ICONDEWIM™
      </Typography>
      <Divider />
      <List>
        <ListItem button component='a' href='/product'>
          <ListItemText primary='Sản phẩm' />
        </ListItem>
        <ListItem button component='a' href='/ao-nam'>
          <ListItemText primary='Áo Nam' />
        </ListItem>
        <ListItem button component='a' href='/quan-nam'>
          <ListItemText primary='Quần Nam' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='Đăng nhập' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='Hồ sơ' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='Đăng xuất' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='Giỏ hàng' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='Thông tin đơn hàng' />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <>
      {/* TopBar */}
      <TopBar>
        <MarqueeText>
          ⚡ Ưu đãi cực sốc lên tới 70% toàn bộ sản phẩm - Chỉ trong tuần lễ
          vàng này! ⚡ Mua ngay hôm nay để nhận quà hấp dẫn!
        </MarqueeText>
      </TopBar>

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
                <LogoButton href='/'>ICONDEWIM™</LogoButton>
              </Typography>
            </Box>

            {/* Phần menu ở giữa */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 2
              }}
            >
              <Box
                onMouseEnter={(e) => handleHover('Sản phẩm', e.currentTarget)}
                onMouseLeave={handleLeave}
              >
                <StyledButton color='inherit' href='/product'>
                  Sản phẩm
                </StyledButton>
                <Popover
                  open={hoveredMenu.name === 'Sản phẩm'}
                  anchorEl={hoveredMenu.el}
                  onClose={handleLeave}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  PaperProps={{
                    onMouseEnter: () => clearTimeout(hoverTimeout.current),
                    onMouseLeave: handleLeave,
                    sx: { mt: 1, p: 2, borderRadius: 2 }
                  }}
                >
                  {renderPopoverContent('Sản phẩm')}
                </Popover>
              </Box>
              <Box
                onMouseEnter={(e) => handleHover('Áo Nam', e.currentTarget)}
                onMouseLeave={handleLeave}
              >
                <StyledButton color='inherit' href='/ao-nam'>
                  Áo Nam
                </StyledButton>
                <Popover
                  open={hoveredMenu.name === 'Áo Nam'}
                  anchorEl={hoveredMenu.el}
                  onClose={handleLeave}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  PaperProps={{
                    onMouseEnter: () => clearTimeout(hoverTimeout.current),
                    onMouseLeave: handleLeave,
                    sx: { mt: 1, p: 2, borderRadius: 2 }
                  }}
                >
                  {renderPopoverContent('Áo Nam')}
                </Popover>
              </Box>
              <Box
                onMouseEnter={(e) => handleHover('Quần Nam', e.currentTarget)}
                onMouseLeave={handleLeave}
              >
                <StyledButton color='inherit' href='/quan-nam'>
                  Quần Nam
                </StyledButton>
                <Popover
                  open={hoveredMenu.name === 'Quần Nam'}
                  anchorEl={hoveredMenu.el}
                  onClose={handleLeave}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  PaperProps={{
                    onMouseEnter: () => clearTimeout(hoverTimeout.current),
                    onMouseLeave: handleLeave,
                    sx: { mt: 1, p: 2, borderRadius: 2 }
                  }}
                >
                  {renderPopoverContent('Quần Nam')}
                </Popover>
              </Box>
            </Box>

            {/* Phần tìm kiếm và icon bên phải */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SearchField
                size='small'
                placeholder='Tìm kiếm...'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
              <StyledButton color='inherit' href='/register'>
                Đăng ký
              </StyledButton>
              <StyledButton
                variant='outlined'
                sx={{ color: 'primary' }}
                href='/login'
              >
                Đăng nhập
              </StyledButton>

              <IconButton color='inherit' onClick={handlePersonMenuOpen}>
                <PersonIcon />
              </IconButton>
              <Menu
                anchorEl={personMenuAnchor}
                open={personMenuOpen}
                onClose={handlePersonMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: { mt: 1, minWidth: 150 }
                }}
              >
                <MenuItem>Hồ sơ</MenuItem>
                <MenuItem>Đăng xuất</MenuItem>
                <MenuItem>Giỏ hàng</MenuItem>
                <MenuItem>Thông tin đơn hàng</MenuItem>
              </Menu>
              <IconButton color='inherit'>
                <Badge badgeContent={3} color='error'>
                  <a href={'/cart'}>
                    <ShoppingCartIcon />
                  </a>
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Drawer cho mobile */}
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 }
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default Header
