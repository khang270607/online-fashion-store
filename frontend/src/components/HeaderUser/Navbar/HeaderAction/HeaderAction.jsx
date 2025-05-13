import React, { useState, useEffect } from 'react'
import {
  IconButton, Menu, MenuItem, Badge, Grow, Paper
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice'
import { clearCart } from '~/redux/cart/cartSlice'

const HeaderAction = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  
  // Lấy giỏ hàng từ Redux store
  const cartItems = useSelector(state => state.cart.cartItems)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logoutUserAPI())
    dispatch(clearCart()) // Xóa giỏ hàng khi đăng xuất
    handleClose()
  }

  useEffect(() => {
    const handleScroll = () => {
      if (anchorEl) handleClose()
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [anchorEl])

  return (
    <>
      <IconButton color='inherit' onClick={handleClick}>
        <PersonIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Grow}
        PaperProps={{
          component: Paper,
          elevation: 4,
          sx: {
            mt: 1,
            minWidth: 150,
            zIndex: (theme) => theme.zIndex.tooltip + 10
          }
        }}
      >
        {currentUser ? (
          <>
            <MenuItem component={Link} to='/profile'>Hồ sơ</MenuItem>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </>
        ) : (
          <MenuItem component={Link} to='/login'>Đăng nhập</MenuItem>
        )}
        <MenuItem component={Link} to='/cart'>Giỏ hàng</MenuItem>
        <MenuItem component={Link} to='/order'>Thông tin đơn hàng</MenuItem>
      </Menu>

      <IconButton color='inherit' component={Link} to='/cart'>
        <Badge badgeContent={cartCount} color='error'>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </>
  )
}

export default HeaderAction
