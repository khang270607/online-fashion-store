import React, { useEffect } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
  Divider
} from '@mui/material'
import { useForm } from 'react-hook-form'

const EditCategoryModal = ({ open, onClose, category, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      description: ''
    }
  })

  useEffect(() => {
    if (open && category) {
      reset({
        name: category.name || '',
        description: category.description || ''
      })
    }
  }, [open, category, reset])

  const onSubmit = async (data) => {
    await onSave(category._id, data)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Sửa danh mục</DialogTitle>
      <Divider sx={{ my: 0 }} />
      <DialogContent>
        <form id='edit-category-form' onSubmit={handleSubmit(onSubmit)}>
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
            minRows={3}
            {...register('description', { required: 'Mô tả là bắt buộc' })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </form>
      </DialogContent>
      <Divider sx={{ my: 0 }} />
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting} color='inherit'>
          Hủy
        </Button>
        <Button
          type='submit'
          form='edit-category-form'
          variant='contained'
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          sx={{ backgroundColor: '#001f5d', color: '#fff' }}
        >
          {isSubmitting ? 'Đang lưu' : 'Lưu'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditCategoryModal
