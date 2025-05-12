import React from 'react'
import {
  MenuItem,
  Paper,
  List,
  Grow,
  ClickAwayListener,
  Popper
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function AdminMenu({ anchorEl, isOpen, onClose }) {
  const navigate = useNavigate()

  return (
    <Popper
      open={isOpen}
      anchorEl={anchorEl}
      role={undefined}
      placement='bottom-end'
      transition
      disablePortal
      style={{ zIndex: 1300 }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: 'top right' }}>
          <Paper>
            <ClickAwayListener onClickAway={onClose}>
              <List>
                <MenuItem
                  onClick={() => {
                    onClose()
                    navigate('/admin/profile') // Chuyển hướng tới trang profile
                  }}
                  sx={{ borderBottom: '1px solid #ccc' }}
                >
                  Thông tin cá nhân
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onClose()
                    console.log('Đăng xuất') // Giữ logic đăng xuất
                  }}
                >
                  Đăng xuất
                </MenuItem>
              </List>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}
