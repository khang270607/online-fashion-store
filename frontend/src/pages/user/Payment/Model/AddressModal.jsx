import React, { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Radio, RadioGroup, FormControlLabel, IconButton, TextField
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const AddressModal = ({ open, onClose, onConfirm }) => {
  const [selectedId, setSelectedId] = useState(null)
  const [mode, setMode] = useState('list') // 'list' | 'form'
  const [editingAddress, setEditingAddress] = useState(null)

  const addresses = [
    {
      id: 1,
      name: 'abc 1111',
      phone: '0984142332',
      line1: 'abc/123',
      line2: 'Xã Côn Đảo, Huyện Côn Đảo, Bà Rịa - Vũng Tàu'
    }
  ]

  const handleEdit = (address) => {
    setEditingAddress(address)
    setMode('form')
  }

  const handleAddNew = () => {
    setEditingAddress(null)
    setMode('form')
  }

  const handleBack = () => {
    setMode('list')
  }

  const handleSaveAddress = () => {
    // Gọi API hoặc cập nhật state nếu cần
    setMode('list')
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === 'form' ? (
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleBack} size="small" sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            {editingAddress ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}
          </Box>
        ) : (
          'Chọn địa chỉ giao hàng'
        )}
      </DialogTitle>

      <DialogContent dividers>
        {mode === 'list' ? (
          <>
            <RadioGroup value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
              {addresses.map((addr) => (
                <Box key={addr.id} sx={{ borderBottom: '1px solid #eee', mb: 2 }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <FormControlLabel
                      value={addr.id.toString()}
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography fontWeight={700}>{addr.name} <Typography component="span" fontWeight={400}>({addr.phone})</Typography></Typography>
                          <Typography>{addr.line1}</Typography>
                          <Typography>{addr.line2}</Typography>
                        </Box>
                      }
                    />
                    <Button size="small" onClick={() => handleEdit(addr)}>Cập nhật</Button>
                  </Box>
                </Box>
              ))}
            </RadioGroup>

            <Button
              variant="outlined"
              fullWidth
              onClick={handleAddNew}
              sx={{ mt: 2 }}
            >
              + Thêm Địa Chỉ Mới
            </Button>
          </>
        ) : (
          // FORM NHẬP / CẬP NHẬT
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField fullWidth label="Họ tên" defaultValue={editingAddress?.name || ''} />
            <TextField fullWidth label="Số điện thoại" defaultValue={editingAddress?.phone || ''} />
            <TextField fullWidth label="Địa chỉ " defaultValue={editingAddress?.line1 || ''} />
            <TextField fullWidth label="Địa chỉ cụ thể" defaultValue={editingAddress?.line2 || ''} />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {mode === 'list' ? (
          <>
            <Button onClick={onClose}>Huỷ</Button>
            <Button variant="contained" onClick={() => onConfirm(selectedId)}>Xác nhận</Button>
          </>
        ) : (
          <Button variant="contained" onClick={handleSaveAddress}>Lưu</Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
