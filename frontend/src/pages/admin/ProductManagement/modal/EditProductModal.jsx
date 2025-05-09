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
  MenuItem,
  DialogContentText
} from '@mui/material'
import useCategories from '~/hook/useCategories'

const EditProductModal = ({ open, onClose, product, onSave }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const [images, setImages] = useState([{ file: null, preview: '' }])
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null)
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

    if (index === images.length - 1 && file) {
      newImages.push({ file: null, preview: '' })
    }

    setImages(newImages)
  }

  const handleRemoveImage = (index) => {
    setConfirmDeleteIndex(index)
  }

  const confirmRemoveImage = () => {
    const newImages = [...images]
    newImages.splice(confirmDeleteIndex, 1)
    setImages(newImages)
    setConfirmDeleteIndex(null)
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
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
        <DialogTitle>Sửa Sản Phẩm</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 2 }}>
              <TextField
                label='Tên sản phẩm'
                fullWidth
                margin='normal'
                {...register('name', { required: 'Tên không được bỏ trống' })}
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

            <Box sx={{ flex: 1 }}>
              <Typography variant='subtitle1' sx={{ mb: 1 }}>
                Hình ảnh sản phẩm
              </Typography>

              {images.map((img, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Button
                    variant='outlined'
                    component='label'
                    style={{
                      borderColor: '#001f5d',
                      color: '#001f5d',
                      marginRight: '8px'
                    }}
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
                    <>
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
                      <Button
                        onClick={() => handleRemoveImage(index)}
                        color='error'
                        size='small'
                        sx={{ mt: 1 }}
                      >
                        Xoá ảnh
                      </Button>
                    </>
                  )}
                </Box>
              ))}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} color='primary'>
              Hủy
            </Button>
            <Button
              type='submit'
              variant='contained'
              sx={{ backgroundColor: '#001f5d', color: '#fff' }}
            >
              Lưu
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Dialog xác nhận xoá ảnh */}
      <Dialog
        open={confirmDeleteIndex !== null}
        onClose={() => setConfirmDeleteIndex(null)}
      >
        <DialogTitle>Xác nhận xoá ảnh</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn xoá ảnh này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: '#001f5d' }}
            onClick={() => setConfirmDeleteIndex(null)}
          >
            Hủy
          </Button>
          <Button
            color='error'
            variant='contained'
            onClick={confirmRemoveImage}
          >
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditProductModal
