import React, { useState, useEffect } from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Grow,
  Paper,
  Avatar
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice'
import { getProfile } from '~/services/userService'

const HeaderAction = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [localUser, setLocalUser] = useState(null)
  const open = Boolean(anchorEl)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile()
        if (profileData && profileData.name) {
          setLocalUser({
            name: profileData.name,
            avatarUrl: profileData.avatarUrl || ''
          })
          console.log('Thông tin người dùng từ API:', profileData)
        } else {
          setLocalUser(null)
          dispatch(logoutUserAPI())
        }
      } catch (error) {
        console.error('Lỗi khi gọi getProfile:', error)
        setLocalUser(null)
        dispatch(logoutUserAPI())
      }
    }

    fetchProfile()
  }, [dispatch])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logoutUserAPI())
    setLocalUser(null)
    handleClose()
    navigate('/login') // Điều hướng về trang đăng nhập sau khi đăng xuất
  }

  // Tự động đóng menu khi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (anchorEl) handleClose()
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [anchorEl])

  return (
    <>
      <IconButton color='inherit' onClick={handleClick}>
        {localUser && localUser.avatarUrl ? (
          <Avatar
            src={localUser.avatarUrl}
            alt={localUser.name || 'User'}
            sx={{ width: 30, height: 30 }}
          />
        ) : (
          <PersonIcon />
        )}
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
        {currentUser || localUser ? (
          <>
            <MenuItem component={Link} to='/profile' onClick={handleClose}>
              Hồ sơ
            </MenuItem>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </>
        ) : (
          <MenuItem component={Link} to='/login' onClick={handleClose}>
            Đăng nhập
          </MenuItem>
        )}
        <MenuItem component={Link} to='/cart' onClick={handleClose}>
          Giỏ hàng
        </MenuItem>
        <MenuItem component={Link} to='/order' onClick={handleClose}>
          Thông tin đơn hàng
        </MenuItem>
      </Menu>

      <IconButton color='inherit' component={Link} to='/cart'>
        <Badge badgeContent={3} color='error'>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </>
  )
}

export default HeaderAction
