import express from 'express'

import { ordersValidation } from '~/validations/ordersValidation'
import { ordersController } from '~/controllers/ordersController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

// Tạo Sản phẩm mới
Router.route('/').post(ordersValidation.order, ordersController.createOrder)

// Danh sách Sản phẩm
Router.route('/').get(ordersController.getOrderList)

// Lấy thông tin một Sản phẩm.
Router.route('/:orderId').get(
  ordersValidation.verifyId,
  ordersController.getOrder
)

// Cập nhật thông tin Sản phẩm
Router.route('/:orderId').patch(
  ordersValidation.verifyId,
  ordersValidation.order,
  ordersController.updateOrder
)

// Xoá Sản phẩm (Xóa mềm)
Router.route('/:orderId').delete(
  ordersValidation.verifyId,
  ordersController.deleteOrder
)

// Lấy danh sách sản phẩm theo Danh mục
Router.route('/category/:categoryId').get(
  ordersController.getListOrderOfCategory
)

export const ordersRoute = Router
