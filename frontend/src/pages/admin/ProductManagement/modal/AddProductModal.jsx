import React, { useState, useRef } from 'react'
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
import { addCategory } from '~/services/categoryService'
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
  return data.secure_url
}

const AddProductModal = ({ open, onClose, onSuccess }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()
  const [images, setImages] = useState([{ file: null, preview: '' }])
  const { categories, loading, fetchCategories } = useCategories()
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const categoryNameRef = useRef()
  const categoryDescriptionRef = useRef()

  const handleImageChange = (index, file) => {
    const newImages = [...images]
    newImages[index] = { file, preview: URL.createObjectURL(file) }

    if (
      index === images.length - 1 &&
      file &&
      newImages.length < 9 // giới hạn tối đa 10 ảnh
    ) {
      newImages.push({ file: null, preview: '' })
    }

    setImages(newImages)
  }

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
        image: imageUrls,
        category: data.category || '',
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

  const handleAddCategory = async () => {
    const newCategory = {
      name: categoryName,
      description: categoryDescription
    }

    const addedCategory = await addCategory(newCategory)
    if (addedCategory) {
      setCategoryOpen(false)
      setCategoryName('')
      setCategoryDescription('')
      // Cập nhật lại danh sách danh mục
      fetchCategories() // Gọi lại API để lấy danh sách danh mục mới
    } else {
      alert('Lỗi khi thêm danh mục')
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='lg' // tăng kích thước modal
      PaperProps={{
        sx: {
          mt: 8,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle>Thêm Sản Phẩm</DialogTitle>
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
                    value={field.value || ''}
                    disabled={loading}
                  >
                    {categories
                      ?.filter((cat) => !cat.destroy)
                      .map((cat) => (
                        <MenuItem key={cat._id} value={cat.name}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    <MenuItem onClick={() => setCategoryOpen(true)}>
                      Thêm danh mục mới
                    </MenuItem>
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
              Hình ảnh sản phẩm (tối đa 9 ảnh)
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: 2
              }}
            >
              {images.map((img, index) => (
                <Box key={index}>
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
                    {img.file ? 'Sửa' : 'Thêm'}
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
                        height: 80,
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
            {isSubmitting ? 'Đang thêm...' : 'Thêm'}
          </Button>
        </DialogActions>
      </form>

      {/* Thêm danh mục mới */}
      <Dialog open={categoryOpen} onClose={() => setCategoryOpen(false)}>
        <DialogTitle>Thêm Danh Mục Mới</DialogTitle>
        <DialogContent>
          <TextField
            label='Tên danh mục'
            fullWidth
            margin='normal'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            inputRef={categoryNameRef}
          />
          <TextField
            label='Mô tả'
            fullWidth
            margin='normal'
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            inputRef={categoryDescriptionRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCategoryOpen(false)} color='#001f5d'>
            Hủy
          </Button>
          <Button
            onClick={handleAddCategory}
            variant='contained'
            sx={{ backgroundColor: '#001f5d' }}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}

export default AddProductModal
