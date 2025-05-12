// components/SearchBar.jsx
import React from 'react'
import { InputBase, Paper, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/system'

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 220,
  height: 38,
  padding: '0 8px',
  borderRadius: 20,
  backgroundColor: '#f1f3f5',
  boxShadow: 'none',
  [theme.breakpoints.down('md')]: {
    width: 200,
    height: 34
  }
}))

const StyledInput = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
  fontSize: '15px'
}))

const Search = () => {
  return (
    <StyledPaper component='form'>
      <StyledInput placeholder='Tìm kiếm sản phẩm...' />
      <IconButton type='submit' size='small'>
        <SearchIcon />
      </IconButton>
    </StyledPaper>
  )
}

export default Search
