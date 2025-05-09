// components/MainMenu.jsx
import React, { useRef, useState } from 'react'
import { Box, Button, Popover, Typography } from '@mui/material'
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

const sectionStyle = {
  minWidth: 150,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1
}

const Menu = () => {
  const [hoveredMenu, setHoveredMenu] = useState({ name: null, el: null })
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

  const renderPopoverContent = (menu) => {
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

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        gap: 2
      }}
    >
      {['Sản phẩm', 'Áo Nam', 'Quần Nam'].map((menu) => (
        <Box
          key={menu}
          onMouseEnter={(e) => handleHover(menu, e.currentTarget)}
          onMouseLeave={handleLeave}
        >
          <StyledButton
            href={`/${menu === 'Sản phẩm' ? 'product' : menu.toLowerCase().replace(' ', '-')}`}
          >
            {menu}
          </StyledButton>
          <Popover
            open={hoveredMenu.name === menu}
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
            {renderPopoverContent(menu)}
          </Popover>
        </Box>
      ))}
    </Box>
  )
}

export default Menu
