import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function EditUserModal({ open, onClose, user, onSave }) {
  const [formData, setFormData] = React.useState(
    user || { name: '', email: '', role: '' }
  )

  // Update formData when user prop changes
  React.useEffect(() => {
    setFormData(user || { name: '', email: '', role: '' })
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Sửa thông tin người dùng</DialogTitle>
      <DialogContent>
        <TextField
          label='Tên'
          fullWidth
          margin='dense'
          name='name'
          value={formData.name || ''}
          onChange={handleChange}
        />
        <TextField
          label='Email'
          fullWidth
          margin='dense'
          name='email'
          value={formData.email || ''}
          onChange={handleChange}
        />
        <InputLabel id='role-label'>Quyền</InputLabel>
        <Select
          labelId='role-label'
          name='role'
          value={formData.role || ''}
          label='Quyền'
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value=''>-- Chọn quyền --</MenuItem>
          <MenuItem value='user'>Người dùng</MenuItem>
          <MenuItem value='admin'>Quản trị viên</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#001f5d' }}>
          Huỷ
        </Button>
        <Button
          sx={{ backgroundColor: '#001f5d' }}
          variant='contained'
          onClick={handleSave}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}
