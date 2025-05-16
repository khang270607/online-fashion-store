import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  CircularProgress
} from '@mui/material'

const DeleteTransactionModal = ({
  open,
  onClose,
  transaction,
  onConfirm,
  loading
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>Xác nhận xoá giao dịch</DialogTitle>
      <Divider />
      <DialogContent dividers>
        <Typography>
          Bạn có chắc muốn xoá giao dịch <strong>{transaction?._id}</strong>{' '}
          không?
        </Typography>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} disabled={loading} color='inherit'>
          Huỷ
        </Button>
        <Button
          onClick={onConfirm}
          variant='contained'
          color='error'
          disabled={loading}
          startIcon={loading && <CircularProgress size={16} />}
        >
          Xoá
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteTransactionModal
