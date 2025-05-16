import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Typography
} from '@mui/material'

const DeleteTransactionModal = ({ open, onClose, transaction, onDelete }) => {
  const handleDelete = () => {
    onDelete(transaction._id)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
      <DialogTitle>Xác nhận xoá</DialogTitle>
      <Divider />
      <DialogContent>
        <Typography>Bạn có chắc chắn muốn xoá giao dịch này không?</Typography>
        <Typography variant='body2' color='text.secondary' mt={1}>
          ID: {transaction?._id}
        </Typography>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button
          onClick={() => handleDelete(transaction._id)}
          variant='contained'
          color='error'
        >
          Xoá
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteTransactionModal
