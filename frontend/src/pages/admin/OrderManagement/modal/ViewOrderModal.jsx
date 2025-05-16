import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Tab,
  Tabs,
  Typography,
  Box,
  Stack,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import dayjs from 'dayjs'
import styleAdmin from '~/components/StyleAdmin.jsx'

const ViewOrderModal = ({
  open,
  onClose,
  order,
  histories = [],
  orderDetails = []
}) => {
  const [tab, setTab] = React.useState(0)

  if (!order) return null

  const {
    _id,
    total,
    paymentMethod,
    paymentStatus,
    discountAmount,
    shippingAddressId,
    userId,
    status,
    isDelivered,
    createdAt,
    updatedAt,
    note
  } = order
  const handleTabChange = (e, newValue) => setTab(newValue)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: {
          height: '80vh',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
      BackdropProps={{
        sx: styleAdmin.OverlayModal
      }}
    >
      <DialogTitle>Xem chi tiết đơn hàng</DialogTitle>
      <Divider />
      <DialogContent dividers>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{
            position: 'relative',
            top: '-6px',
            mb: 2,
            marginBottom: '16px', // vẫn cần mb cho spacing, sẽ override màu bằng color
            borderBottom: '1px solid #001f5d', // nếu bạn muốn có gạch dưới
            '& .MuiTab-root': {
              color: '#000', // màu chữ bình thường
              textTransform: 'none'
            },
            '& .Mui-selected': {
              color: '#001f5d !important', // màu chữ khi được chọn
              fontWeight: '900'
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#001f5d' // màu gạch dưới tab đang active
            }
          }}
        >
          <Tab label='Thông tin đơn hàng' />
          <Tab label='Lịch sử đơn hàng' />
          <Tab label='Danh sách sản phẩm' />
        </Tabs>

        {/* Tab 1: Thông tin đơn hàng */}
        {tab === 0 && (
          <Stack spacing={2}>
            <Typography>
              <strong>Mã đơn hàng:</strong> {_id}
            </Typography>
            <Typography>
              {' '}
              <strong>Người nhận:</strong> {shippingAddressId?.fullName}
            </Typography>
            <Typography>
              <strong>SĐT: </strong>
              {shippingAddressId?.phone}
            </Typography>
            <Typography>
              <strong>Địa chỉ giao hàng: </strong>
              {`${shippingAddressId?.address}, ${shippingAddressId?.ward}, ${shippingAddressId?.district}, ${shippingAddressId?.city}`}
            </Typography>
            <Typography>
              <strong>Phương thức thanh toán:</strong>{' '}
              {paymentMethod?.toUpperCase()}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography component='span'>
                <strong>Trạng thái thanh toán:</strong>
              </Typography>
              <Chip
                label={
                  paymentStatus === 'Pending'
                    ? 'Đang chờ'
                    : paymentStatus === 'Completed'
                      ? 'Đã thanh toán'
                      : paymentStatus === 'Failed'
                        ? 'Thất bại'
                        : '—'
                }
                color={
                  paymentStatus === 'Completed'
                    ? 'success'
                    : paymentStatus === 'Failed'
                      ? 'error'
                      : 'warning'
                }
                size='small'
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography component='span'>
                <strong>Trạng thái đơn hàng:</strong>
              </Typography>
              <Chip
                label={
                  status === 'Pending'
                    ? 'Đang chờ'
                    : status === 'Processing'
                      ? 'Đang xử lý'
                      : status === 'Shipped'
                        ? 'Đã gửi hàng'
                        : status === 'Delivered'
                          ? 'Đã giao'
                          : status === 'Cancelled'
                            ? 'Đã hủy'
                            : '—'
                }
                color={
                  status === 'Pending'
                    ? 'warning'
                    : status === 'Cancelled'
                      ? 'error'
                      : 'success'
                }
                size='small'
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography component='span'>
                <strong>Giao hàng:</strong>
              </Typography>
              <Chip
                label={isDelivered ? 'Đã giao' : 'Chưa giao'}
                color={isDelivered ? 'success' : 'default'}
                size='small'
              />
            </Box>
            <Typography>
              <strong>Giảm giá:</strong>{' '}
              {discountAmount > 0
                ? `- ${discountAmount.toLocaleString()}₫`
                : 'Không có'}
            </Typography>
            <Typography>
              {' '}
              <strong>Tổng tiền: </strong> {total.toLocaleString()}₫
            </Typography>
            <Typography>
              <strong>Lời nhắn: </strong>
              {note || 'Không có'}
            </Typography>
            <Typography>
              <strong>Ngày tạo: </strong>{' '}
              {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}
            </Typography>
            <Typography>
              <strong>Ngày cập nhật: </strong>{' '}
              {dayjs(updatedAt).format('DD/MM/YYYY HH:mm')}
            </Typography>
          </Stack>
        )}

        {/* Tab 2: Lịch sử đơn hàng */}
        {tab === 1 && (
          <Box>
            {histories.length === 0 ? (
              <Typography>Không có lịch sử cập nhật.</Typography>
            ) : (
              histories.map((history) => (
                <Box key={history._id} mb={2} p={1} border={1} borderRadius={2}>
                  <Typography>
                    <strong>Trạng thái:</strong>{' '}
                    {history.status === 'Pending'
                      ? 'Đang chờ'
                      : history.status === 'Processing'
                        ? 'Đang xử lý'
                        : history.status === 'Shipped'
                          ? 'Đã gửi hàng'
                          : history.status === 'Delivered'
                            ? 'Đã giao'
                            : history.status === 'Cancelled'
                              ? 'Đã hủy'
                              : '—'}
                  </Typography>
                  <Typography>
                    <strong>Ghi chú:</strong> {history.note || 'Không có'}
                  </Typography>
                  <Typography>
                    <strong>Người cập nhật:</strong>{' '}
                    {userId?.name
                      ?.toLowerCase()
                      .split(' ')
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(' ') ||
                      '' ||
                      history.updatedBy}
                  </Typography>
                  <Typography>
                    <strong>Quyền: </strong>
                    {userId.role === 'admin' ? 'QUẢN TRỊ' : 'KHÁCH HÀNG'}
                  </Typography>
                  <Typography>
                    <strong>Thời gian:</strong>{' '}
                    {dayjs(history.updatedAt).format('DD/MM/YYYY HH:mm')}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        )}

        {/* Tab 3: Danh sách sản phẩm */}
        {tab === 2 && (
          <Box>
            {orderDetails.length === 0 ? (
              <Typography>Không có sản phẩm trong đơn hàng.</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell align='right'>Số lượng</TableCell>
                    <TableCell align='right'>Đơn giá</TableCell>
                    <TableCell align='right'>Thành tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetails.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        {item?.name || 'Không có tên'}
                      </TableCell>
                      <TableCell align='right'>{item.quantity}</TableCell>
                      <TableCell align='right'>
                        {item.priceAtOrder.toLocaleString()}₫
                      </TableCell>
                      <TableCell align='right'>
                        {(item.priceAtOrder * item.quantity).toLocaleString()}₫
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        )}
      </DialogContent>
      <Divider />
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={onClose} variant='contained' color='error'>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewOrderModal
