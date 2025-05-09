import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CircularProgress from '@mui/material/CircularProgress'
import { useForm } from 'react-hook-form'
import AuthorizedAxiosInstance from '~/utils/authorizedAxios.js'
import { API_ROOT } from '~/utils/constants.js'

const EditUserModal = React.memo(({ open, onClose, user, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: 'customer'
    }
  })

  // Cập nhật form khi user thay đổi
  useEffect(() => {
    if (open && user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'customer'
      })
    }
  }, [open, user, reset])

  const onSubmit = async (data) => {
    try {
      // Chỉ gửi trường role để cập nhật
      await AuthorizedAxiosInstance.patch(`${API_ROOT}/v1/users/${user._id}`, {
        role: data.role
      })
      onSave()
      onClose()
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
      <DialogContent>
        <form id='edit-user-form' onSubmit={handleSubmit(onSubmit)}>
          {/* Trường Tên - Chỉ hiển thị */}
          <TextField
            label='Tên người dùng'
            fullWidth
            margin='normal'
            value={user?.name || ''}
            InputProps={{ readOnly: true }}
            disabled
          />

          {/* Trường Email - Chỉ hiển thị */}
          <TextField
            label='Email'
            fullWidth
            margin='normal'
            value={user?.email || ''}
            InputProps={{ readOnly: true }}
            disabled
          />

          {/* Trường Quyền - Cho phép chỉnh sửa */}
          <FormControl fullWidth margin='normal' error={!!errors.role}>
            <InputLabel id='role-label'>Quyền</InputLabel>
            <Select
              labelId='role-label'
              label='Quyền'
              {...register('role', { required: 'Vai trò là bắt buộc' })}
              defaultValue={user?.role || 'customer'}
              disabled={isSubmitting}
            >
              <MenuItem value='customer'>Người dùng</MenuItem>
              <MenuItem value='admin'>Quản trị viên</MenuItem>
            </Select>
            {errors.role && (
              <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {errors.role.message}
              </p>
            )}
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting} color='#001f5d'>
          Hủy
        </Button>
        <Button
          type='submit'
          form='edit-user-form'
          variant='contained'
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          sx={{ backgroundColor: '#001f5d', color: 'white' }}
        >
          {isSubmitting ? 'Đang lưu' : 'Lưu'}
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default EditUserModal
