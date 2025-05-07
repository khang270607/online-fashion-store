import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material'

const EditProductModal = ({ open, onClose, product, onSave }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      imageProduct: product?.image?.[0],
      category: product?.category
    }
  })

  React.useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        imageProduct: product.image?.[0],
        category: product.category
      })
    }
  }, [product, reset])

  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      image: [data.imageProduct]
    }
    onSave(product._id, updatedData)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Sửa sản phẩm</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            label='Tên sản phẩm'
            margin='normal'
            {...register('name', { required: true })}
          />
          <TextField
            fullWidth
            label='Mô tả'
            margin='normal'
            {...register('description', { required: true })}
          />
          <TextField
            fullWidth
            label='Giá'
            margin='normal'
            type='number'
            {...register('price', { required: true })}
          />
          <TextField
            fullWidth
            label='Ảnh (URL)'
            margin='normal'
            {...register('imageProduct', { required: true })}
          />
          <TextField
            fullWidth
            label='Danh mục'
            margin='normal'
            {...register('category', { required: true })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type='submit' variant='contained'>
            Lưu
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditProductModal
