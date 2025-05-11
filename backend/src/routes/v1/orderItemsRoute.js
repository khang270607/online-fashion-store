import express from 'express'

import { orderItemsValidation } from '~/validations/orderItemsValidation'
import { orderItemsController } from '~/controllers/orderItemsController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

// Tạo Đơn hàng chi tiết mới
Router.route('/').post(
  orderItemsValidation.orderItem,
  orderItemsController.createOrderItem
)

// Danh sách Đơn hàng chi tiết
Router.route('/').get(orderItemsController.getOrderItemList)

// Lấy thông tin một Đơn hàng chi tiết.
Router.route('/:orderItemId').get(
  orderItemsValidation.verifyId,
  orderItemsController.getOrderItem
)

// Cập nhật thông tin Đơn hàng chi tiết
Router.route('/:orderItemId').patch(
  orderItemsValidation.verifyId,
  orderItemsValidation.orderItem,
  orderItemsController.updateOrderItem
)

// Xoá Đơn hàng chi tiết (Xóa mềm)
Router.route('/:orderItemId').delete(
  orderItemsValidation.verifyId,
  orderItemsController.deleteOrderItem
)

export const orderItemsRoute = Router
