import mongoose from 'mongoose'
const { Schema, model } = mongoose

// Định nghĩa schema cho đơn hàng
const OrderStatusHistorySchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      required: true
    },
    note: {
      type: String,
      default: null
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', // hoặc 'Admin' tuỳ structure của bạn
      required: true
    }
  },
  {
    timestamps: {
      createdAt: false, // tắt createdAt
      updatedAt: 'updatedAt' // bật updatedAt với tên custom
    }
  }
)

// Tạo Model
export const OrderStatusHistoryModel = model(
  'OrderStatusHistory',
  OrderStatusHistorySchema
)
