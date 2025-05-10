import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material'
import useCategories from '~/hook/useCategories'

const EditProductModal = ({ open, onClose, product, onSave }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const [images, setImages] = useState([{ file: null, preview: '' }])
  const { categories, loading } = useCategories()

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        quantity: product.quantity || ''
      })

      const imagePreviews =
        product.image?.map((url) => ({ file: null, preview: url })) || []

      setImages([...imagePreviews, { file: null, preview: '' }])
    }
  }, [product, reset])

  const handleImageChange = (index, file) => {
    const newImages = [...images]
    newImages[index] = { file, preview: URL.createObjectURL(file) }

    if (index === images.length - 1 && file && newImages.length < 9) {
      newImages.push({ file: null, preview: '' })
    }

    setImages(newImages)
  }

  const handleImageDelete = (index) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const onSubmit = (data) => {
    const imageUrls = images
      .filter((img) => img.preview)
      .map((img) => img.preview)

    const updatedData = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      image: imageUrls,
      category: data.category || '',
      quantity: Number(data.quantity)
    }

    console.log('Dữ liệu submit:', updatedData)
    onSave(product._id, updatedData)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='lg' // Tăng kích thước modal
      PaperProps={{
        sx: {
          mt: 8,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle>Sửa Sản Phẩm</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{ display: 'flex', gap: 2, overflowY: 'auto', flexGrow: 1 }}
        >
          {/* Form nhập liệu bên trái */}
          <Box sx={{ flex: 2 }}>
            <TextField
              label='Tên sản phẩm'
              fullWidth
              margin='normal'
              {...register('name', {
                required: 'Tên sản phẩm không được bỏ trống'
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label='Mô tả'
              fullWidth
              multiline
              rows={3}
              margin='normal'
              {...register('description', {
                required: 'Mô tả không được bỏ trống'
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label='Giá (VNĐ)'
              type='number'
              fullWidth
              margin='normal'
              {...register('price', { required: 'Giá không được bỏ trống' })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <TextField
              label='Số lượng'
              type='number'
              fullWidth
              margin='normal'
              {...register('quantity', {
                required: 'Số lượng không được bỏ trống'
              })}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />

            <FormControl fullWidth margin='normal' error={!!errors.category}>
              <InputLabel>Danh mục</InputLabel>
              <Controller
                name='category'
                control={control}
                rules={{ required: 'Danh mục không được bỏ trống' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label='Danh mục'
                    defaultValue={product?.category || ''}
                    disabled={loading}
                  >
                    {categories?.map((cat) => (
                      <MenuItem key={cat._id} value={cat.name}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <Typography variant='caption' color='error'>
                {errors.category?.message}
              </Typography>
            </FormControl>
          </Box>

          {/* Hình ảnh bên phải */}
          <Box sx={{ flex: 1 }}>
            <Typography variant='subtitle1' sx={{ mb: 1 }}>
              Hình ảnh sản phẩm (Tối đa 9 ảnh)
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: 2
              }}
            >
              {images.map((img, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <Button
                    variant='outlined'
                    component='label'
                    sx={{
                      width: '100%',
                      borderColor: '#001f5d',
                      color: '#001f5d',
                      fontSize: '12px',
                      minHeight: '36px'
                    }}
                  >
                    {img.preview ? 'Sửa' : 'Thêm'}
                    <input
                      type='file'
                      accept='image/*'
                      hidden
                      onChange={(e) =>
                        handleImageChange(index, e.target.files[0])
                      }
                    />
                  </Button>

                  {img.preview && (
                    <Box
                      sx={{
                        position: 'relative',
                        mt: 1,
                        '&:hover .overlay': {
                          opacity: 1
                        },
                        '&:hover img': {
                          filter: 'brightness(40%)'
                        }
                      }}
                    >
                      <Box
                        component='img'
                        src={img.preview}
                        alt={`preview-${index}`}
                        sx={{
                          width: '100%',
                          height: 80,
                          objectFit: 'cover',
                          borderRadius: 1,
                          border: '1px solid #ccc',
                          transition: '0.3s'
                        }}
                      />
                      <Box
                        className='overlay'
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '90%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: '#f00',
                          fontWeight: 'bold',
                          fontSize: 14,
                          opacity: 0,
                          transition: 'opacity 0.3s',
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          borderRadius: 1,
                          cursor: 'pointer'
                        }}
                        onClick={() => handleImageDelete(index)}
                      >
                        Xóa
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color='#001f5d'>
            Hủy
          </Button>
          <Button
            type='submit'
            variant='contained'
            sx={{ backgroundColor: '#001f5d' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditProductModal
