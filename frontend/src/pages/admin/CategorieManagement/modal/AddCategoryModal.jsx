import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Divider
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { addCategory } from '~/services/categoryService'

const AddCategoryModal = ({ open, onClose, onAdded }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm()

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      description: data.description || ''
    }
    const result = await addCategory(payload)
    if (result) {
      onAdded() // callback để load lại danh sách
      onClose()
      reset()
    } else {
      alert('Thêm danh mục thất bại. Vui lòng thử lại!')
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>Thêm danh mục mới</DialogTitle>
      <Divider sx={{ my: 0 }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            label='Tên danh mục'
            fullWidth
            margin='normal'
            {...register('name', { required: 'Tên danh mục là bắt buộc' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label='Mô tả'
            fullWidth
            margin='normal'
            multiline
            rows={3}
            {...register('description', { required: 'Mô tả là bắt buộc' })}
          />
        </DialogContent>
        <Divider sx={{ my: 0 }} />
        <DialogActions>
          <Button color='inherit' onClick={handleClose}>
            Hủy
          </Button>
          <Button
            type='submit'
            variant='contained'
            sx={{ backgroundColor: '#001f5d', color: '#fff' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang thêm...' : 'Thêm'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddCategoryModal
