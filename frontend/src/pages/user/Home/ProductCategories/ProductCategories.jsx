import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const ProductCategories = () => {
  return (
    <Box
      sx={{ padding: '5px', borderRadius: '20px', margin: '30px', gap: '50px' }}
    >
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        sx={{ marginTop: '50px', gap: '100px' }}
      >
        {['Áo', 'Quần', 'Phụ kiện'].map((category, index) => (
          <Box
            component={Link}
            to='/phu-kien'
            key={index}
            sx={{
              textAlign: 'center',
              textDecoration: 'none',
              color: 'inherit',
              display: 'inline-block',
              '&:hover img': { transform: 'translateY(-8px)' }
            }}
          >
            <Box
              component='img'
              src={`https://example.com/category-${index}.jpg`}
              alt={`Nhóm ${category}`}
              sx={{
                width: 100,
                height: 100,
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
            />
            <Typography variant='h6' mt={1}>{`Nhóm ${category}`}</Typography>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

export default ProductCategories
