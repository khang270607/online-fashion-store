import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Pagination,
  Divider,
  CardActions,
  IconButton,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Snackbar,
  Alert
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { getProducts, getProductsByCategory } from '~/services/productService'
import { getCategories } from '~/services/categoryService'

const PRODUCTS_PER_PAGE = 12

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 240,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  flexShrink: 0,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '& .MuiTypography-h6': {
    color: theme.palette.primary.dark,
    fontWeight: 600,
    marginBottom: theme.spacing(1)
  }
}))

const FilterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1)
}))

function Product() {
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [categories, setCategories] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const [category, setCategory] = useState('')
  const [origin, setOrigin] = useState('')
  const [size, setSize] = useState([])
  const [color, setColor] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE)

  // Lấy category từ URL khi load trang
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const categoryId = searchParams.get('category')
    if (categoryId && categoryId !== category) {
      setCategory(categoryId)
      setPage(1)
    } else if (!categoryId && category) {
      setCategory('')
      setPage(1)
    }
  }, [location.search])

  // Lấy danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(1, 100)
        const categories = response.categories || response || []
        setCategories(categories)
      } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error)
        setError('Không thể tải danh mục. Vui lòng thử lại.')
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      // Đọc danh mục từ URL
      const searchParams = new URLSearchParams(location.search)
      const categoryId = searchParams.get('category') || ''

      // Cập nhật trạng thái category nếu cần
      if (categoryId !== category) {
        setCategory(categoryId)
        setPage(1) // Đặt lại trang khi danh mục thay đổi
      }

      // Lấy sản phẩm
      setIsLoading(true)
      try {
        let result
        if (categoryId) {
          result = await getProductsByCategory(
            categoryId,
            page,
            PRODUCTS_PER_PAGE
          )
        } else {
          result = await getProducts(page, PRODUCTS_PER_PAGE)
        }
        setProducts(Array.isArray(result.products) ? result.products : [])
        setTotalProducts(Number(result.total) || 0)
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error)
        setError('Không thể tải sản phẩm. Vui lòng thử lại.')
        setProducts([])
        setTotalProducts(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [location.search, page])
  const handleChangePage = (_, value) => {
    setPage(value)
  }

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value
    setCategory(selectedCategory)
    setPage(1)
    navigate(
      selectedCategory ? `/product?category=${selectedCategory}` : '/product'
    )
  }

  const handleOriginChange = (event) => setOrigin(event.target.value)

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
    // Chỉ lọc ở frontend nếu cần
    console.log('Search with filters:', { category, origin, size, color })
  }

  const handleReset = () => {
    setCategory('')
    setOrigin('')
    setSize([])
    setColor([])
    setPage(1)
    navigate('/product')
  }

  return (
    <Box
      sx={{ display: 'flex', minHeight: '100vh', p: 2, gap: 2, mt: '150px' }}
    >
      {/* Sidebar */}
      <SidebarContainer>
        <Typography variant='h6' gutterBottom>
          Bộ lọc tìm kiếm
        </Typography>
        <Divider sx={{ mb: 1 }} />

        <FilterTitle variant='subtitle1'>Danh mục</FilterTitle>
        <FormControl fullWidth size='small'>
          <InputLabel>Danh mục</InputLabel>
          <Select
            value={category}
            label='Danh mục'
            onChange={handleCategoryChange}
          >
            <MenuItem value=''>Tất cả</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FilterTitle variant='subtitle1'>Xuất xứ</FilterTitle>
        <FormControl fullWidth size='small'>
          <InputLabel>Xuất xứ</InputLabel>
          <Select value={origin} label='Xuất xứ' onChange={handleOriginChange}>
            <MenuItem value=''>Tất cả</MenuItem>
            <MenuItem value='vietnam'>Việt Nam</MenuItem>
            <MenuItem value='china'>Trung Quốc</MenuItem>
          </Select>
        </FormControl>

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

      {/* Product List */}
      <Box sx={{ flexGrow: 1 }}>
        {isLoading ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>Đang tải...</Box>
        ) : products.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            {category
              ? 'Không có sản phẩm nào trong danh mục này.'
              : 'Không có sản phẩm nào.'}
          </Box>
        ) : (
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <Card
                  sx={{
                    width: '290px',
                    height: 420,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <a
                    href={`/productdetail/${product._id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <CardMedia
                      component='img'
                      height='280'
                      image={product.image?.[0] || '/default.jpg'}
                      alt={product.name}
                    />
                  </a>
                  <CardContent sx={{ flex: 1 }}>
                    <a
                      href={`/productdetail/${product._id}`}
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                        fontWeight: 'bold'
                      }}
                    >
                      {product.name}
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
                        {product.price ? `${product.price}₫` : '---'}
                      </Typography>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color='primary'
          />
        </Box>
      </Box>

      {/* Snackbar lỗi */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity='error' onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Product
