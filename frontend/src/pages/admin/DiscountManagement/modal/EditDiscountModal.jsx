import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
  Box
} from '@mui/material'
import { updateDiscount } from '~/services/discountService'

// Hàm định dạng lại datetime cho input type="datetime-local"
const formatDateTimeLocal = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  const offset = date.getTimezoneOffset() * 60000
  return new Date(date - offset).toISOString().slice(0, 16)
}

const EditDiscountModal = ({ open, onClose, discount, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm()

  React.useEffect(() => {
    if (discount) {
      reset({
        ...discount,
        validFrom: formatDateTimeLocal(discount.validFrom),
        validUntil: formatDateTimeLocal(discount.validUntil)
      })
    }
  }, [discount, reset])

  const onSubmit = async (data) => {
    const payload = {
      code: data.code,
      type: data.type,
      amount: Number(data.amount),
      minOrderValue: Number(data.minOrderValue),
      usageLimit: Number(data.usageLimit),
      validFrom: new Date(data.validFrom).toISOString(),
      validUntil: new Date(data.validUntil).toISOString(),
      isActive: data.isActive === true || data.isActive === 'true'
    }

    try {
      await onSave(discount._id, payload)
      onClose()
    } catch (error) {
      console.error('Lỗi khi cập nhật mã giảm giá:', error)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='lg'>
      <DialogTitle>Chỉnh sửa mã giảm giá</DialogTitle>
      <Divider sx={{ my: 0 }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box
            display='flex'
            gap={2}
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            {/* Cột trái */}
            <Box flex={1}>
              <TextField
                label='Mã giảm giá'
                fullWidth
                margin='normal'
                {...register('code', { required: true })}
              />
              <TextField
                defaultValue={discount?.type}
                select
                label='Loại giảm giá'
                fullWidth
                margin='normal'
                {...register('type')}
              >
                <MenuItem value='fixed'>Giảm theo số tiền</MenuItem>
                <MenuItem value='percent'>Giảm theo phần trăm</MenuItem>
              </TextField>
              <TextField
                label='Giá trị giảm'
                type='number'
                fullWidth
                margin='normal'
                {...register('amount', { required: true })}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked {...register('isActive')} />}
                label='Kích hoạt'
                sx={{ mt: 1 }}
              />
            </Box>

            {/* Cột phải */}
            <Box flex={1}>
              <TextField
                label='Giá trị đơn hàng tối thiểu'
                type='number'
                fullWidth
                margin='normal'
                {...register('minOrderValue')}
              />
              <TextField
                label='Số lượt sử dụng tối đa'
                type='number'
                fullWidth
                margin='normal'
                {...register('usageLimit')}
              />
              <TextField
                label='Hiệu lực từ'
                type='datetime-local'
                fullWidth
                margin='normal'
                InputLabelProps={{ shrink: true }}
                {...register('validFrom')}
              />
              <TextField
                label='Hiệu lực đến'
                type='datetime-local'
                fullWidth
                margin='normal'
                InputLabelProps={{ shrink: true }}
                {...register('validUntil')}
              />
            </Box>
          </Box>
        </DialogContent>
        <Divider sx={{ my: 0 }} />
        <DialogActions>
          <Button onClick={handleClose} color='inherit'>
            Hủy
          </Button>
          <Button
            type='submit'
            variant='contained'
            sx={{ backgroundColor: '#001f5d', color: '#fff' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditDiscountModal
