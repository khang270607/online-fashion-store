import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MoreIcon from '@mui/icons-material/MoreVert'
import * as React from 'react'

const menuId = 'primary-search-account-menu'
const mobileMenuId = 'primary-search-account-menu-mobile'

function Profile() {
  const [AnchorEl, setAnchorEl] = React.useState(null)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  return (
    <>
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
    </>
  )
}
export default Profile
