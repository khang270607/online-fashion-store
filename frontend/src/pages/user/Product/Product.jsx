import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Pagination,
  List,
  ListItem,
  ListItemText,
  Divider,
  CardActions,
  IconButton,
  ListItemButton,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemIcon,
  FormGroup,
  FormControlLabel,
  Button
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

const mockProducts = Array.from({ length: 30 }).map((_, index) => ({
  id: index + 1,
  name: `Sản phẩm ${index + 1}`,
  image:
    'https://bizweb.dktcdn.net/100/415/697/products/ts170.png?v=1701401873157',
  description: `Mô tả ngắn cho sản phẩm ${index + 1}`
}))

const PRODUCTS_PER_PAGE = 12

// Styled component for sidebar
const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 240,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  flexShrink: 0,
  height: '100%', // Match the height of the parent container
  display: 'flex',
  flexDirection: 'column',
  '& .MuiTypography-h6': {
    color: theme.palette.primary.dark,
    fontWeight: 600,
    marginBottom: theme.spacing(1)
  }
}))

// Styled component for filter section title
const FilterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1)
}))

function Product() {
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('')
  const [origin, setOrigin] = useState('')
  const [size, setSize] = useState([])
  const [color, setColor] = useState([])

  const totalPages = Math.ceil(mockProducts.length / PRODUCTS_PER_PAGE)

  const handleChangePage = (_, value) => {
    setPage(value)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleOriginChange = (event) => {
    setOrigin(event.target.value)
  }

  const handleSizeChange = (event) => {
    const value = event.target.name
    setSize((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }

  const handleColorChange = (event) => {
    const value = event.target.name
    setColor((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }

  const handleSearch = () => {
    setPage(1)
    // Here you can add logic to filter products based on selected filters
    console.log('Search with filters:', { category, origin, size, color })
  }

  const handleReset = () => {
    setCategory('')
    setOrigin('')
    setSize([])
    setColor([])
    setPage(1)
  }

  const paginatedProducts = mockProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  )

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        p: 2,
        gap: 2,
        mt: '150px'
      }}
    >
      {/* Sidebar */}
      <SidebarContainer>
        <Typography variant='h6' gutterBottom>
          Bộ lọc tìm kiếm
        </Typography>
        <Divider sx={{ mb: 1 }} />

        {/* Category Filter */}
        <FilterTitle variant='subtitle1'>Danh mục</FilterTitle>
        <FormControl fullWidth size='small'>
          <InputLabel>Danh mục</InputLabel>
          <Select
            value={category}
            label='Danh mục'
            onChange={handleCategoryChange}
          >
            <MenuItem value=''>Tất cả</MenuItem>
            <MenuItem value='category1'>Danh mục 1</MenuItem>
            <MenuItem value='category2'>Danh mục 2</MenuItem>
            <MenuItem value='category3'>Danh mục 3</MenuItem>
          </Select>
        </FormControl>

        {/* Origin Filter */}
        <FilterTitle variant='subtitle1'>Xuất xứ</FilterTitle>
        <FormControl fullWidth size='small'>
          <InputLabel>Xuất xứ</InputLabel>
          <Select value={origin} label='Xuất xứ' onChange={handleOriginChange}>
            <MenuItem value=''>Tất cả</MenuItem>
            <MenuItem value='vietnam'>Việt Nam</MenuItem>
            <MenuItem value='china'>Trung Quốc</MenuItem>
            <MenuItem value='japan'>Nhật Bản</MenuItem>
          </Select>
        </FormControl>

        {/* Size Filter */}
        <FilterTitle variant='subtitle1'>Kích thước</FilterTitle>
        <FormGroup>
          {['S', 'M', 'L', 'XL'].map((sizeOption) => (
            <FormControlLabel
              key={sizeOption}
              control={
                <Checkbox
                  checked={size.includes(sizeOption)}
                  onChange={handleSizeChange}
                  name={sizeOption}
                  size='small'
                />
              }
              label={sizeOption}
            />
          ))}
        </FormGroup>

        {/* Color Filter */}
        <FilterTitle variant='subtitle1'>Màu sắc</FilterTitle>
        <FormGroup>
          {['Đỏ', 'Xanh', 'Đen', 'Trắng'].map((colorOption) => (
            <FormControlLabel
              key={colorOption}
              control={
                <Checkbox
                  checked={color.includes(colorOption)}
                  onChange={handleColorChange}
                  name={colorOption}
                  size='small'
                />
              }
              label={colorOption}
            />
          ))}
        </FormGroup>

        {/* Search and Reset Buttons */}
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSearch}
            fullWidth
          >
            Tìm
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            onClick={handleReset}
            fullWidth
          >
            Reset
          </Button>
        </Box>
      </SidebarContainer>

      {/* Main product content */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {paginatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  width: '100%',
                  height: 450,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <a
                  href={`/productdetail/${product.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <CardMedia
                    component='img'
                    height='330'
                    image={product.image}
                    alt={product.name}
                  />
                </a>
                <CardContent sx={{ flex: 1 }}>
                  <a
                    href={`/productdetail/${product.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                      fontWeight: 'bold'
                    }}
                  >
                    {product.description}
                  </a>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label='add to favorites'>
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label='cart'>
                    <AddShoppingCartIcon />
                  </IconButton>
                  <Box sx={{ marginLeft: 'auto', paddingRight: '10px' }}>
                    <Typography variant='subtitle1' fontWeight='bold'>
                      50$
                    </Typography>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color='primary'
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Product
