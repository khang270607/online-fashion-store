import React from 'react'
import { MenuItem, Paper, List, Box, Grow } from '@mui/material'

const MenuItems = ['Đăng xuất']

export default function AdminMenu({ anchorEl, isOpen, onClose }) {
  if (!isOpen || !anchorEl) return null

  const rect = anchorEl.getBoundingClientRect()
  const styles = {
    box: {
      position: 'fixed',
      top: 0,
      right: '10px',
      height: '100vh',
      width: '10px',
      zIndex: 1200
    }
  }

  return (
    <Box sx={styles.box}>
      <Grow in={isOpen} style={{ transformOrigin: 'top right' }}>
        <Paper
          sx={{
            position: 'absolute',
            top: rect.bottom + 8,
            right: 0,
            zIndex: 1300,
            boxShadow: 3,
            minWidth: 150
          }}
        >
          <List>
            {MenuItems.map((item) => (
              <MenuItem
                key={item}
                onClick={() => {
                  onClose()
                  console.log('Đăng xuất')
                }}
              >
                {item}
              </MenuItem>
            ))}
          </List>
        </Paper>
      </Grow>
    </Box>
  )
}
