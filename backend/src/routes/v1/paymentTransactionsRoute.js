import express from 'express'

import { paymentTransactionsValidation } from '~/validations/paymentTransactionsValidation'
import { paymentTransactionsController } from '~/controllers/paymentTransactionsController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

// Tạo Sản phẩm mới
Router.route('/').post(
  paymentTransactionsValidation.paymentTransaction,
  paymentTransactionsController.createPaymentTransaction
)

// Danh sách Sản phẩm
Router.route('/').get(paymentTransactionsController.getPaymentTransactionList)

// Lấy thông tin một Sản phẩm.
Router.route('/:paymentTransactionId').get(
  paymentTransactionsValidation.verifyId,
  paymentTransactionsController.getPaymentTransaction
)

// Cập nhật thông tin Sản phẩm
Router.route('/:paymentTransactionId').patch(
  paymentTransactionsValidation.verifyId,
  paymentTransactionsValidation.paymentTransaction,
  paymentTransactionsController.updatePaymentTransaction
)

// Xoá Sản phẩm (Xóa mềm)
Router.route('/:paymentTransactionId').delete(
  paymentTransactionsValidation.verifyId,
  paymentTransactionsController.deletePaymentTransaction
)

// Lấy danh sách sản phẩm theo Danh mục
Router.route('/category/:categoryId').get(
  paymentTransactionsController.getListPaymentTransactionOfCategory
)

export const paymentTransactionsRoute = Router
