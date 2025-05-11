import mongoose from 'mongoose'
const { Schema, model } = mongoose

// Định nghĩa schema cho đơn hàng
const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Tham chiếu đến người dùng đặt đơn
      required: true
    },
    couponId: {
      type: Schema.Types.ObjectId,
      ref: 'Coupon', // Tham chiếu đến mã giảm giá (nếu có)
      default: null
    },
    discountAmount: {
      type: Number, // Số tiền đã giảm (VNĐ)
      default: 0
    },
    shippingAddressId: {
      type: Schema.Types.ObjectId,
      ref: 'ShippingAddress', // Tham chiếu đến địa chỉ giao hàng
      required: true
    },
    total: {
      type: Number, // Tổng tiền phải trả (sau giảm giá)
      required: true,
      min: 0
    },
    status: {
      type: String, // Trạng thái đơn hàng
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    isPaid: {
      type: Boolean, // Đã thanh toán hay chưa
      default: false
    },
    paymentMethod: {
      type: String, // Phương thức thanh toán
      enum: ['COD', 'vnpay', 'momo', 'paypal', 'credit_card'],
      default: null
    },
    paymentStatus: {
      type: String, // Trạng thái thanh toán
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending'
    },
    isDelivered: {
      type: Boolean, // Đã giao hàng hay chưa
      default: false
    }
  },
  {
    timestamps: true // Tự động thêm và cập nhật createdAt & updatedAt :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
  }
)

// Tạo Model
export const OrderModel = model('Order', OrderSchema)
