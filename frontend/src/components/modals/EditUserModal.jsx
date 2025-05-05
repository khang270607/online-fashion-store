import React, { useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material'
import { useForm } from 'react-hook-form'
import AuthorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const EditUserModal = ({ open, onClose, user, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user'
      })
    }
  }, [user, reset])

  const onSubmit = async (data) => {
    try {
      await AuthorizedAxiosInstance.put(`${API_ROOT}/v1/users/${user.id}`, data)
      onSave()
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
      <DialogContent>
        <form id='edit-user-form' onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label='Tên'
            fullWidth
            margin='normal'
            {...register('name', { required: 'Tên không được để trống' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label='Email'
            fullWidth
            margin='normal'
            {...register('email', {
              required: 'Email không được để trống',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Email không hợp lệ'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label='Quyền'
            fullWidth
            margin='normal'
            {...register('role', { required: 'Vai trò là bắt buộc' })}
            error={!!errors.role}
            helperText={errors.role?.message}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          type='submit'
          form='edit-user-form'
          variant='contained'
          color='primary'
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditUserModal
