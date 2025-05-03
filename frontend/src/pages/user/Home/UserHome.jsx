import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Grid,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button
} from '@mui/material'
import { ArrowForward, ArrowBack } from '@mui/icons-material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

const images = [
  'https://intphcm.com/data/upload/banner-thoi-trang-bi-an.jpg',
  'https://intphcm.com/data/upload/banner-thoi-trang-nam.jpg'
]

const cards = [
  {
    id: 1,
    title: 'Card 1',
    image:
      'https://city89.com/wp-content/uploads/2023/03/C89-0095-mockup-black-back.jpg',
    description: 'Description for Card 1'
  },
  {
    id: 2,
    title: 'Card 2',
    image:
      'https://city89.com/wp-content/uploads/2023/03/C89-0095-mockup-black-back.jpg',
    description: 'Description for Card 2'
  },
  {
    id: 3,
    title: 'Card 3',
    image:
      'https://city89.com/wp-content/uploads/2023/03/C89-0095-mockup-black-back.jpg',
    description: 'Description for Card 3'
  },
  {
    id: 4,
    title: 'Card 4',
    image:
      'https://city89.com/wp-content/uploads/2023/03/C89-0095-mockup-black-back.jpg',
    description: 'Description for Card 4'
  },
  {
    id: 5,
    title: 'Card 5',
    image:
      'https://city89.com/wp-content/uploads/2023/03/C89-0095-mockup-black-back.jpg',
    description: 'Description for Card 5'
  },
  {
    id: 6,
    title: 'Card 6',
    image:
      'https://city89.com/wp-content/uploads/2023/03/C89-0095-mockup-black-back.jpg',
    description: 'Description for Card 6'
  },
  {
    id: 7,
    title: 'Card 7',
    image:
      'https://city89.com/wp-content/uploads/2023/03/C89-0095-mockup-black-back.jpg',
    description: 'Description for Card 7'
  },
  {
    id: 8,
    title: 'Card 8',
    image:
      'https://city89.com/wp-content/uploads/2023/03/C89-0095-mockup-black-back.jpg',
    description: 'Description for Card 8'
  }
]

function UserHome() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Tự động chuyển slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, []) // <- chỉ chạy 1 lần

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '500px',
          overflow: 'hidden',
          borderRadius: '8px'
        }}
      >
        {/* Container cho slides */}
        <Box
          sx={{
            display: 'flex',
            width: `${images.length * 100}%`,
            height: '100%',
            transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`slide-${index}`}
              style={{
                width: `${100 / images.length}%`,
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ))}
        </Box>

        {/* Mũi tên trái */}
        <IconButton
          onClick={goToPrevious}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)'
            }
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* Mũi tên phải */}
        <IconButton
          onClick={goToNext}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)'
            }
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
      <Box
        sx={{
          padding: '5px',
          borderRadius: '20px',
          margin: '30px',
          gap: '50px'
        }}
      >
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{ marginTop: '50px', gap: '100px' }}
        >
          {/* Nhóm Áo */}
          <Box
            component={Link}
            to='/phu-kien'
            sx={{
              textAlign: 'center',
              textDecoration: 'none',
              color: 'inherit',
              display: 'inline-block',
              '&:hover img': {
                transform: 'translateY(-8px)'
              }
            }}
          >
            <Box
              component='img'
              src='https://bizweb.dktcdn.net/100/287/440/products/ao-thun-den-streetwear-nen-mua.png?v=1602834266997'
              alt='Nhóm Phụ kiện'
              sx={{
                width: 100,
                height: 100,
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
            />
            <Typography
              variant='h6'
              mt={1}
              sx={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              Nhóm Áo
            </Typography>
          </Box>

          {/* Nhóm Quần */}
          <Box
            component={Link}
            to='/phu-kien'
            sx={{
              textAlign: 'center',
              textDecoration: 'none',
              color: 'inherit',
              display: 'inline-block',
              '&:hover img': {
                transform: 'translateY(-8px)'
              }
            }}
          >
            <Box
              component='img'
              src='https://cdn.boo.vn/media/catalog/product/1/_/1.2.21.2.23.001.124.01.60600034_1__4.webp'
              alt='Nhóm Phụ kiện'
              sx={{
                width: 100,
                height: 100,
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
            />
            <Typography
              variant='h6'
              mt={1}
              sx={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              Nhóm Quần
            </Typography>
          </Box>

          {/* Nhóm Phụ kiện */}
          <Box
            component={Link}
            to='/phu-kien'
            sx={{
              textAlign: 'center',
              textDecoration: 'none',
              color: 'inherit',
              display: 'inline-block',
              '&:hover img': {
                transform: 'translateY(-8px)'
              }
            }}
          >
            <Box
              component='img'
              src='https://zerdio.com.vn/wp-content/uploads/2020/07/non-ket-nam-den-2.jpg'
              alt='Nhóm Phụ kiện'
              sx={{
                width: 100,
                height: 100,
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
            />
            <Typography
              variant='h6'
              mt={1}
              sx={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              Nhóm Phụ kiện
            </Typography>
          </Box>
        </Grid>
      </Box>
      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px',
          gap: '20px'
        }}
      >
        <Grid
          container
          direction='row'
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50px',
            gap: '20px'
          }}
        >
          <h1>SẢN PHẨM CỦA CHÚNG TÔI</h1>
        </Grid>
      </Box>
      {/* Cards section */}
      <Box
        sx={{
          backgroundColor: '#03235e',
          padding: '5px',
          borderRadius: '20px',
          margin: '10px',
          boxShadow: 3
        }}
      >
        <Grid
          container
          direction='row'
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50px',
            gap: '20px'
          }}
        >
          {cards.slice(0, 8).map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
                <a href={'/productdetail'} style={{ textDecoration: 'none' }}>
                  <CardMedia
                    component='img'
                    height='294'
                    image={card.image}
                    alt={card.title}
                  />
                </a>
                <CardContent>
                  <a
                    href={'/productdetail'}
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                      fontWeight: 'bold'
                    }}
                  >
                    {card.description}
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '30px',
            gap: '20px'
          }}
        >
          <Button href={'/product'} sx={{ color: 'white' }}>
            Xem tất cả
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          backgroundColor: '#f9f9f9',
          gap: 4
        }}
      >
        <Box
          component='img'
          src='https://file.hstatic.net/1000360022/file/tsn__1__edf7dad3c24a4ebe8813fe62652b18b4.jpg'
          alt='Giới thiệu cửa hàng'
          sx={{
            width: { xs: '100%', md: '50%' },
            borderRadius: 2,
            objectFit: 'cover',
            boxShadow: 3
          }}
        />
        <Box sx={{ maxWidth: 500 }}>
          <Typography variant='h4' gutterBottom>
            Giới Thiệu ICONDEWIM™
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            ICONDEWIM™ là thương hiệu thời trang hiện đại, mang đậm phong cách
            cá nhân và sự phá cách. Chúng tôi mang đến những thiết kế độc đáo,
            chất lượng cao và luôn cập nhật xu hướng mới nhất dành cho giới trẻ.
            Mục tiêu của chúng tôi là giúp bạn tự tin thể hiện bản thân qua từng
            bộ trang phục.
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default UserHome
