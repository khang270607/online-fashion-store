import express from 'express'

import { paymentTransactionsValidation } from '~/validations/paymentTransactionsValidation'
import { paymentTransactionsController } from '~/controllers/paymentTransactionsController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

// Danh sách Giao dịch thanh toán
Router.route('/').get(paymentTransactionsController.getPaymentTransactionList)

// Lấy thông tin một Giao dịch thanh toán.
Router.route('/:paymentTransactionId').get(
  paymentTransactionsValidation.verifyId,
  paymentTransactionsController.getPaymentTransaction
)

// Cập nhật thông tin Giao dịch thanh toán
Router.route('/:paymentTransactionId').patch(
  paymentTransactionsValidation.verifyId,
  paymentTransactionsValidation.paymentTransaction,
  paymentTransactionsController.updatePaymentTransaction
)

// Xoá Giao dịch thanh toán (Xóa mềm)
Router.route('/:paymentTransactionId').delete(
  paymentTransactionsValidation.verifyId,
  paymentTransactionsController.deletePaymentTransaction
)

export const paymentTransactionsRoute = Router
