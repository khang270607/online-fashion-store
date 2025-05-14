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
import { Link, useLocation } from 'react-router-dom'
// icon
import PollIcon from '@mui/icons-material/Poll'
import PersonIcon from '@mui/icons-material/Person'
import CategoryIcon from '@mui/icons-material/Category'
import InventoryIcon from '@mui/icons-material/Inventory'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'

const tab = [
  { name: 'Thống kê', path: '/admin', icon: <PollIcon /> },
  {
    name: 'Quản lý người dùng',
    path: '/admin/user-management',
    icon: <PersonIcon />
  },
  {
    name: 'Quản lý danh mục',
    path: '/admin/categorie-management',
    icon: <CategoryIcon />
  },
  {
    name: 'Quản lý sản phẩm',
    path: '/admin/product-management',
    icon: <InventoryIcon />
  },
  {
    name: 'Quản lý đơn hàng',
    path: '/admin/order-management',
    icon: <ReceiptLongIcon />
  },
  {
    name: 'Quản lý mã giảm giá',
    path: '/admin/discount-management',
    icon: <LocalOfferIcon />
  }
]

export default function AdminDrawer({ open, onClose }) {
  const location = useLocation()
  const currentPath = location.pathname

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
      hideBackdrop={true}
    >
      <div className='drawer-header Drawer-header'></div>
      <Divider />
      <List sx={{ padding: 0 }} className='drawer-list'>
        {tab.map((item) => {
          const isActive = currentPath === item.path
          return (
            <Link to={item.path} className='drawer-link' key={item.name}>
              <ListItem className='list-item' disablePadding>
                <ListItemButton
                  className='list-item-button'
                  sx={{
                    backgroundColor: isActive ? '#ddd' : 'transparent'
                  }}
                >
                  <ListItemIcon
                    className='list-item-icon'
                    sx={{ minWidth: '36px' }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    className='list-item-text'
                    primary={item.name}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        })}
      </List>
    </Drawer>
  )
}
