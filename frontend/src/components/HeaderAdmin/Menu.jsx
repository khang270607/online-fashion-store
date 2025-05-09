import React from 'react'
import { Menu, MenuItem } from '@mui/material'

const MenuItems = ['Đăng xuất']

export default function AdminMenu({ anchorEl, isOpen, onClose }) {
  const menuId = 'primary-search-account-menu'

  return (
    <Menu
      sx={{ marginTop: '30px', zIndex: '99999' }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isOpen}
      onClose={onClose}
    >
      {MenuItems.map((item) => (
        <MenuItem
          key={item}
          onClick={() => {
            onClose()
            console.log('Đăng xuất') // Xử lý đăng xuất tại đây
          }}
        >
          {item}
        </MenuItem>
      ))}
    </Menu>
  )
}
