import React, { useEffect, useState } from 'react'
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
  MenuItem,
  Divider
} from '@mui/material'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import useCategories from '~/hook/useCategories.js'

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
  const fileInputRefs = useRef([])
  useEffect(() => {
    if (product) {
      reset({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        quantity: product.quantity || '',
        categoryId: product.categoryId?._id || ''
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
      quantity: Number(data.quantity),
      categoryId: data.categoryId,
      image: imageUrls
    }

    onSave(product._id, updatedData)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='lg'
      PaperProps={{ sx: { mt: 8, maxHeight: '90vh' } }}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: 20 }}>
        Sửa Sản Phẩm
      </DialogTitle>
      <Divider />

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ display: 'flex', gap: 2, overflowY: 'auto' }}>
          {/* Form bên trái */}
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

            <FormControl fullWidth margin='normal' error={!!errors.categoryId}>
              <InputLabel>Danh mục</InputLabel>
              <Controller
                name='categoryId'
                control={control}
                rules={{ required: 'Danh mục không được bỏ trống' }}
                render={({ field }) => (
                  <Select {...field} label='Danh mục' disabled={loading}>
                    {categories
                      ?.filter((cat) => !cat.destroy)
                      .map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
              <Typography variant='caption' color='error'>
                {errors.categoryId?.message}
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
                <Box key={index} sx={{ position: 'relative' }}>
                  {/* input file riêng biệt để trigger bằng ref */}
                  <input
                    type='file'
                    accept='image/*'
                    hidden
                    ref={(el) => (fileInputRefs.current[index] = el)}
                    onChange={(e) =>
                      handleImageChange(index, e.target.files[0])
                    }
                  />

                  <Box
                    sx={{
                      width: '100%',
                      height: 80,
                      borderRadius: 1,
                      border: '1px solid #ccc',
                      overflow: 'hidden',
                      position: 'relative',
                      '&:hover .overlay': {
                        opacity: 1
                      }
                    }}
                  >
                    {img.preview ? (
                      <Box
                        component='img'
                        src={img.preview}
                        alt={`preview-${index}`}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <Button
                        variant='outlined'
                        component='label'
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: '#001f5d',
                          color: '#001f5d',
                          fontSize: '12px'
                        }}
                      >
                        Thêm ảnh
                        <input
                          type='file'
                          accept='image/*'
                          hidden
                          onChange={(e) =>
                            handleImageChange(index, e.target.files[0])
                          }
                        />
                      </Button>
                    )}

                    {/* Overlay khi hover */}
                    {img.preview && (
                      <Box
                        className='overlay'
                        sx={{
                          position: 'absolute',
                          top: 5,
                          right: 5,
                          display: 'flex',
                          gap: 1,
                          opacity: 0,
                          transition: 'opacity 0.3s'
                        }}
                      >
                        <IconButton onClick={() => handleImageDelete(index)}>
                          <DeleteIcon sx={{ color: '#f44336' }} />
                        </IconButton>
                        <IconButton
                          onClick={() => fileInputRefs.current[index]?.click()}
                        >
                          <EditIcon sx={{ color: '#2196f3' }} />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>

        <Divider />
        <DialogActions>
          <Button onClick={onClose} variant='outlined'>
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
