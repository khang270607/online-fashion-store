// components/product/modal/AddProductModal.jsx
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material'
import { addProduct } from '~/services/productService'

const AddProductModal = ({ open, onClose, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const result = await addProduct({
        name: data.name,
        description: data.description,
        price: Number(data.price),
        imageProduct: data.imageProduct,
        category: data.category
      })
      if (result) {
        onSuccess()
        onClose()
        reset()
      } else {
        alert('Thêm sản phẩm không thành công')
      }
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error)
      alert('Có lỗi xảy ra, vui lòng thử lại')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Thêm Sản Phẩm</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
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
            label='URL ảnh sản phẩm'
            fullWidth
            margin='normal'
            {...register('imageProduct', {
              required: 'Ảnh sản phẩm không được bỏ trống'
            })}
            error={!!errors.imageProduct}
            helperText={errors.imageProduct?.message}
          />

          <TextField
            label='Danh mục'
            fullWidth
            margin='normal'
            {...register('category', {
              required: 'Danh mục không được bỏ trống'
            })}
            error={!!errors.category}
            helperText={errors.category?.message}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type='submit' variant='contained'>
            Thêm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddProductModal
