import React from 'react'
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Link } from 'react-router-dom'

const tab = [
  { name: 'Thống kê', path: '/admin' },
  { name: 'Quản lý người dùng', path: '/admin/user-management' },
  { name: 'Quản lý danh mục', path: '/admin/categorie-management' },
  { name: 'Quản lý sản phẩm', path: '/admin/product-management' },
  { name: 'Quản lý đơn hàng', path: '/admin/order-management' }
]

export default function AdminDrawer({ open, onClose }) {
  return (
    <Drawer
      className={`drawer ${open ? 'open' : ''}`}
      classes={{ paper: 'drawer-paper' }}
      variant='temporary'
      anchor='left'
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
        BackdropProps: { sx: { backgroundColor: 'transparent' } }
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
                <ListItemText className='list-item-text' primary={text.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  )
}
