import express from 'express'

import { couponsValidation } from '~/validations/couponsValidation'
import { couponsController } from '~/controllers/couponsController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

// Tạo Mã giảm giá mới
Router.route('/').post(couponsValidation.coupon, couponsController.createCoupon)

// Danh sách Mã giảm giá
Router.route('/').get(couponsController.getCouponList)

// Lấy thông tin một Mã giảm giá.
Router.route('/:couponId').get(
  couponsValidation.verifyId,
  couponsController.getCoupon
)

// Cập nhật thông tin Mã giảm giá
Router.route('/:couponId').patch(
  couponsValidation.verifyId,
  couponsValidation.coupon,
  couponsController.updateCoupon
)

// Xoá Mã giảm giá (Xóa mềm)
Router.route('/:couponId').delete(
  couponsValidation.verifyId,
  couponsController.deleteCoupon
)

export const couponsRoute = Router
