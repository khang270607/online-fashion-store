import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  MenuItem,
  TextField,
  Stack
} from '@mui/material'
import { useForm } from 'react-hook-form'

const EditTransactionModal = ({ open, onClose, onSubmit, transaction }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      status: transaction.status,
      note: transaction.note || ''
    }
  })

  React.useEffect(() => {
    reset({
      status: transaction.status,
      note: transaction.note || ''
    })
  }, [transaction, reset])

  const handleFormSubmit = (data) => {
    onSubmit(data)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Cập nhật giao dịch</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            select
            label='Trạng thái'
            fullWidth
            {...register('status')}
          >
            <MenuItem value='pending'>Chờ xử lý</MenuItem>
            <MenuItem value='success'>Thành công</MenuItem>
            <MenuItem value='failed'>Thất bại</MenuItem>
          </TextField>
          <TextField
            label='Ghi chú'
            fullWidth
            multiline
            rows={3}
            {...register('note')}
          />
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button variant='contained' onClick={handleSubmit(handleFormSubmit)}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditTransactionModal
