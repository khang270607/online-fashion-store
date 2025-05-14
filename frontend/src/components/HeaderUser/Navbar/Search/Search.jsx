import React, { useState, useEffect } from 'react'
import {
  InputBase,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '~/services/productService'

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: 300,
  height: 40,
  padding: '0 8px',
  borderRadius: 20,
  backgroundColor: '#f1f3f5',
  boxShadow: 'none',
  zIndex: 1000
}))

const StyledInput = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
  fontSize: '15px'
}))

const SuggestionList = styled(List)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  borderRadius: 8,
  maxHeight: 200,
  overflowY: 'auto',
  zIndex: 1200
}))

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchText.trim() === '') {
        setSuggestions([])
        setErrorMessage('')
        return
      }
      try {
        const { products } = await getProducts(1, 20) // lấy tất cả sản phẩm (hoặc dùng API riêng nếu có)
        const filtered = products
          .filter((p) =>
            p.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .slice(0, 5)

        if (filtered.length === 0) {
          setSuggestions([])
          setErrorMessage('Không có sản phẩm này')
        } else {
          setSuggestions(filtered)
          setErrorMessage('')
        }
      } catch (error) {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error)
        setSuggestions([])
        setErrorMessage('Không có sản phẩm này')
      }
    }

    const debounce = setTimeout(fetchSuggestions, 300) // debounce 300ms

    return () => clearTimeout(debounce)
  }, [searchText])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchText.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchText.trim())}`)
    }
  }

  const handleSuggestionClick = (productName) => {
    setSearchText(productName)
    navigate(`/products?search=${encodeURIComponent(productName)}`)
  }

  return (
    <div style={{ position: 'relative' }}>
      <StyledPaper component='form' onSubmit={handleSubmit}>
        <StyledInput
          placeholder='Tìm kiếm sản phẩm...'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <IconButton type='submit' size='small'>
          <SearchIcon />
        </IconButton>
      </StyledPaper>

      {errorMessage && (
        <Typography
          variant='body2'
          color='error'
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            padding: '8px 0',
            textAlign: 'center'
          }}
        >
          {errorMessage}
        </Typography>
      )}

      {suggestions.length > 0 && (
        <SuggestionList>
          {suggestions.map((product) => (
            <ListItem
              button
              key={product._id}
              onClick={() => handleSuggestionClick(product.name)}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
              >
                <img
                  src={product.imageUrl} // Giả sử có trường imageUrl
                  alt={product.name}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: 'cover',
                    marginRight: 8
                  }}
                />
                <ListItemText primary={product.name} />
                <Typography
                  variant='body2'
                  color='textSecondary'
                  sx={{ marginLeft: 'auto' }}
                >
                  {product.price} VND {/* Giả sử có trường price */}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </SuggestionList>
      )}
    </div>
  )
}

export default Search
