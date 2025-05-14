// EditProductModal.jsx
import React, { useState, useRef, useEffect } from 'react'
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
  IconButton,
  Divider
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useForm, Controller } from 'react-hook-form'

import useCategories from '~/hook/useCategories'
import { updateProduct, getProductById } from '~/services/productService'
import AddCategoryModal from '~/pages/admin/CategorieManagement/modal/AddCategoryModal.jsx'
import StyleAdmin from '~/components/StyleAdmin'

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

const EditProductModal = ({ open, onClose, onSuccess, productId }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const [images, setImages] = useState([{ file: null, preview: '' }])
  const fileInputRefs = useRef([])
  const { categories, loading, fetchCategories } = useCategories()
  const [categoryOpen, setCategoryOpen] = useState(false)

  const loadProduct = async () => {
    if (!productId) return
    const product = await getProductById(productId)
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        categoryId: product.categoryId
      })

      const initialImages =
        product.image?.map((url) => ({
          file: null,
          preview: url
        })) || []

      if (
        initialImages.length === 0 ||
        initialImages[initialImages.length - 1].file ||
        initialImages.length < 9
      ) {
        initialImages.push({ file: null, preview: '' })
      }

      setImages(initialImages)
    }
  }

  useEffect(() => {
    if (open) {
      fetchCategories()
      loadProduct()
    }
  }, [open, productId])

  const handleImageChange = (index, file) => {
    const newImages = [...images]
    newImages[index] = { file, preview: URL.createObjectURL(file) }

    if (index === newImages.length - 1 && file && newImages.length < 9) {
      newImages.push({ file: null, preview: '' })
    }

    setImages(newImages)
  }

  const handleRemoveImage = (index) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    if (newImages.length === 0 || newImages[newImages.length - 1].file) {
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
        } else if (img.preview) {
          imageUrls.push(img.preview)
        }
      }

      const result = await updateProduct(productId, {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        quantity: Number(data.quantity),
        categoryId: data.categoryId,
        image: imageUrls
      })

      if (result) {
        onSuccess()
        onClose()
        reset()
        setImages([{ file: null, preview: '' }])
      } else {
        console.log('Cập nhật sản phẩm không thành công')
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error)
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth='xl'
        PaperProps={{ sx: { mt: 8, maxHeight: '90vh', width: '90vw' } }}
      >
        <DialogTitle>Chỉnh sửa Sản Phẩm</DialogTitle>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ display: 'flex', gap: 2, overflowY: 'auto' }}>
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
                sx={StyleAdmin.InputCustom}
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
                sx={StyleAdmin.InputCustom}
              />
              <TextField
                label='Giá (VNĐ)'
                type='number'
                fullWidth
                margin='normal'
                {...register('price', {
                  required: 'Giá không được bỏ trống'
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
                sx={StyleAdmin.InputCustom}
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
                sx={StyleAdmin.InputCustom}
              />
              <FormControl
                fullWidth
                margin='normal'
                error={!!errors.categoryId}
                sx={StyleAdmin.FormSelect}
              >
                <InputLabel>Danh mục</InputLabel>
                <Controller
                  name='categoryId'
                  control={control}
                  rules={{ required: 'Danh mục không được bỏ trống' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label='Danh mục'
                      value={field.value || ''}
                      disabled={loading}
                      MenuProps={{
                        PaperProps: { sx: StyleAdmin.FormSelect.SelectMenu }
                      }}
                    >
                      {categories
                        ?.filter((c) => !c.destroy)
                        .map((cat) => (
                          <MenuItem key={cat._id} value={cat._id}>
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
                  {errors.categoryId?.message}
                </Typography>
              </FormControl>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant='subtitle1' sx={{ mb: 1 }}>
                Hình ảnh sản phẩm (tối đa 9 ảnh)
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: 2
                }}
              >
                {images.map((img, index) => (
                  <Box key={index} sx={{ position: 'relative' }}>
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
                        height: 140,
                        borderRadius: 1,
                        border: '1px solid #000',
                        overflow: 'hidden',
                        position: 'relative',
                        '&:hover .overlay, &:hover .overlay-bg': { opacity: 1 }
                      }}
                    >
                      {img.preview ? (
                        <>
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
                          <Box
                            className='overlay-bg'
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              backgroundColor: 'rgba(0,0,0,0.3)',
                              opacity: 0,
                              transition: 'opacity 0.3s',
                              zIndex: 1
                            }}
                          />
                          <Box
                            className='overlay'
                            sx={{
                              position: 'absolute',
                              top: 5,
                              right: 5,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 0.5,
                              opacity: 0,
                              transition: 'opacity 0.3s',
                              zIndex: 2
                            }}
                          >
                            <IconButton
                              size='small'
                              onClick={() =>
                                fileInputRefs.current[index]?.click()
                              }
                            >
                              <EditIcon
                                sx={{ fontSize: 18, color: '#2196f3' }}
                              />
                            </IconButton>
                            <IconButton
                              size='small'
                              onClick={() => handleRemoveImage(index)}
                            >
                              <DeleteIcon
                                sx={{ fontSize: 18, color: '#f44336' }}
                              />
                            </IconButton>
                          </Box>
                        </>
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
                            borderColor: '#000',
                            color: '#000',
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
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={onClose} color='inherit'>
              Hủy
            </Button>
            <Button
              type='submit'
              variant='contained'
              sx={{ backgroundColor: '#001f5d' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <AddCategoryModal
        open={categoryOpen}
        onClose={() => setCategoryOpen(false)}
        onAdded={fetchCategories}
      />
    </>
  )
}

export default EditProductModal
