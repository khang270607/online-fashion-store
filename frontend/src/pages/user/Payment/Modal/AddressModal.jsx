import React, { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Radio, RadioGroup, FormControlLabel,
  IconButton, TextField, CircularProgress
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useAddress } from '~/hook/useAddress'

export const AddressModal = ({ open, onClose, onConfirm }) => {
  const {
    addresses,
    loading,
    addAddress,
    editAddress,
    fetchAddresses
  } = useAddress()

  const [selectedId, setSelectedId] = useState(null)
  const [mode, setMode] = useState('list') // 'list' | 'form'
  const [editingAddress, setEditingAddress] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    ward: '',
    district: '',
    city: ''
  })

  // Fetch địa chỉ khi mở modal
  useEffect(() => {
    if (open) {
      fetchAddresses()
    }
  }, [open])

  // Reset formData khi chọn để sửa hoặc thêm mới
  useEffect(() => {
    if (editingAddress) {
      setFormData({
        fullName: editingAddress.fullName || '',
        phone: editingAddress.phone || '',
        address: editingAddress.address || '',
        ward: editingAddress.ward || '',
        district: editingAddress.district || '',
        city: editingAddress.city || ''
      })
    } else {
      setFormData({
        fullName: '',
        phone: '',
        address: '',
        ward: '',
        district: '',
        city: ''
      })
    }
  }, [editingAddress])

  // Set selectedId mặc định khi có danh sách
  useEffect(() => {
    if (addresses.length > 0 && !selectedId) {
      setSelectedId(addresses[0]._id)
    }
  }, [addresses])

  // Reset khi modal đóng
  useEffect(() => {
    if (!open) {
      setMode('list')
      setEditingAddress(null)
      setFormData({
        fullName: '',
        phone: '',
        address: '',
        ward: '',
        district: '',
        city: ''
      })
      setSelectedId(null)
    }
  }, [open])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleEdit = (addr) => {
    setEditingAddress(addr)
    setMode('form')
  }

  const handleAddNew = () => {
    setEditingAddress(null)
    setMode('form')
  }

  const handleBack = () => {
    setMode('list')
    setEditingAddress(null)
  }

  const handleSaveAddress = async () => {
    try {
      if (editingAddress?._id) {
        await editAddress(editingAddress._id, formData)
      } else {
        await addAddress(formData)
      }
      await fetchAddresses()
      setMode('list')
      setEditingAddress(null)
    } catch (err) {
      console.error('Lỗi lưu địa chỉ:', err)
    }
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
          loading ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <RadioGroup value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                {addresses.map((addr) => (
                  <Box key={addr._id} sx={{ borderBottom: '1px solid #eee', mb: 2 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <FormControlLabel
                        value={addr._id}
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography fontWeight={700}>
                              {addr.fullName}{' '}
                              <Typography component="span" fontWeight={400}>({addr.phone})</Typography>
                            </Typography>
                            <Typography>{addr.address}</Typography>
                            <Typography>{addr.ward}, {addr.district}, {addr.city}</Typography>
                          </Box>
                        }
                      />
                      <Button size="small" onClick={() => handleEdit(addr)}>Cập nhật</Button>
                    </Box>
                  </Box>
                ))}
              </RadioGroup>

              <Button variant="outlined" fullWidth onClick={handleAddNew} sx={{ mt: 2 }}>
                + Thêm Địa Chỉ Mới
              </Button>
            </>
          )
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField fullWidth label="Họ tên" name="fullName" value={formData.fullName} onChange={handleFormChange} />
            <TextField fullWidth label="Số điện thoại" name="phone" value={formData.phone} onChange={handleFormChange} />
            <TextField fullWidth label="Địa chỉ" name="address" value={formData.address} onChange={handleFormChange} />
            <TextField fullWidth label="Phường/Xã" name="ward" value={formData.ward} onChange={handleFormChange} />
            <TextField fullWidth label="Quận/Huyện" name="district" value={formData.district} onChange={handleFormChange} />
            <TextField fullWidth label="Tỉnh/Thành phố" name="city" value={formData.city} onChange={handleFormChange} />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {mode === 'list' ? (
          <>
            <Button onClick={onClose}>Huỷ</Button>
            <Button variant="contained" onClick={() => onConfirm(selectedId)} disabled={!selectedId}>
              Xác nhận
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={handleSaveAddress}>Lưu</Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
