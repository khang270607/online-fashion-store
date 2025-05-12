import mongoose from 'mongoose'
const { Schema, model } = mongoose

// Định nghĩa schema cho đơn hàng
const OrderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order', // Tham chiếu đến đơn hàng
      required: true
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product', // Tham chiếu đến sản phẩm
      required: true
    },
    quantity: {
      type: Number, // Số lượng đặt
      required: true,
      min: 1
    },
    priceAtOrder: {
      type: Number, // Giá tại thời điểm đặt
      required: true,
      min: 0
    }
  },
  {
    timestamps: true // Tự động thêm createdAt và updatedAt
  }
)

// Tạo Model
export const OrderItemModel = model('OrderItem', OrderItemSchema)
