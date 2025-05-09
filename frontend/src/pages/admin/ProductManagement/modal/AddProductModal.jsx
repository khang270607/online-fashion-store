import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  MenuItem,
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
  InputLabel
} from '@mui/material'
import { addProduct } from '~/services/productService'
import useCategories from '~/hook/useCategories'

const URI = 'https://api.cloudinary.com/v1_1/dkwsy9sph/image/upload'
const CloudinaryProduct = 'product_upload'

const uploadToCloudinary = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'demo_unsigned')
  formData.append('folder', CloudinaryProduct)

  const res = await fetch(URI, {
    method: 'POST',
    body: formData
  })

  const data = await res.json()
  console.log('Cloudinary response:', data)
  return data.secure_url // Trả về URL ảnh
}

const AddProductModal = ({ open, onClose, onSuccess }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  const [images, setImages] = useState([{ file: null, preview: '' }])
  const { categories, loading } = useCategories()

  // Handle change of images
  const handleImageChange = (index, file) => {
    const newImages = [...images]
    newImages[index] = { file, preview: URL.createObjectURL(file) }

    if (index === images.length - 1 && file) {
      newImages.push({ file: null, preview: '' })
    }

    setImages(newImages)
  }

  // Submit form to add product
  const onSubmit = async (data) => {
    try {
      const imageUrls = []
      for (const img of images) {
        if (img.file) {
          const url = await uploadToCloudinary(img.file)
          imageUrls.push(url)
        }
      }
      const result = await addProduct({
        name: data.name,
        description: data.description,
        price: Number(data.price),
        image: imageUrls, // Đổi từ imageProduct -> image
        category: data.category || '', // Nếu không có giá trị category thì để là ''
        quantity: Number(data.quantity)
      })

      if (result) {
        onSuccess()
        onClose()
        reset()
        setImages([{ file: null, preview: '' }])
      } else {
        alert('Thêm sản phẩm không thành công')
      }
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error)
      alert('Có lỗi xảy ra, vui lòng thử lại')
    }
  }
  console.log('categories:', categories)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      PaperProps={{
        sx: {
          mt: 8, // cách top khoảng 64px, tránh bị che
          maxHeight: '85vh' // chiều cao tối đa
        }
      }}
    >
      <DialogTitle>Thêm Sản Phẩm</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{ display: 'flex', gap: 2, overflowY: 'auto', flexGrow: 1 }}
        >
          {/* Cột bên trái: Form nhập liệu */}
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

            {/* FormControl cho danh mục */}
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
                    value={field.value || ''} // Đảm bảo có giá trị mặc định là ''
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

          {/* Cột bên phải: Hình ảnh */}
          <Box sx={{ flex: 1 }}>
            <Typography variant='subtitle1' sx={{ mb: 1 }}>
              Hình ảnh sản phẩm
            </Typography>

            {images.map((img, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Button
                  variant='outlined'
                  component='label'
                  sx={{ borderColor: '#001f5d', color: '#001f5d' }}
                >
                  {img.file ? 'Sửa ảnh' : 'Thêm ảnh'}
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
                    component='img'
                    src={img.preview}
                    alt={`preview-${index}`}
                    sx={{
                      width: '100%',
                      height: 100,
                      mt: 1,
                      objectFit: 'cover',
                      borderRadius: 1,
                      border: '1px solid #ccc'
                    }}
                  />
                )}
              </Box>
            ))}
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
          >
            Thêm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddProductModal
