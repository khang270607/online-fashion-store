import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

import ApiError from '~/utils/ApiError'
import validObjectId from '~/utils/validObjectId'

const verifyId = (req, res, next) => {
  const productId = req.params.productId

  // Kiểm tra format ObjectId
  validObjectId(productId, next)

  next()
}

const order = async (req, res, next) => {
  // Xác thực dữ liệu đầu vào correctCondition: điều kiện đúng
  const correctCondition = Joi.object({
    couponId: Joi.string().hex().length(24).allow(null),

    discountAmount: Joi.number().min(0).default(0),

    shippingAddressId: Joi.string().hex().length(24).required(),

    total: Joi.number().min(0).required(),

    status: Joi.string()
      .valid('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled')
      .default('Pending'),

    isPaid: Joi.boolean().default(false),

    paymentMethod: Joi.string()
      .valid('COD', 'vnpay', 'momo', 'paypal', 'credit_card')
      .allow(null),

    paymentStatus: Joi.string()
      .valid('Pending', 'Completed', 'Failed')
      .allow(null),

    isDelivered: Joi.boolean().default(false)
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false // Không dừng lại khi gặp lỗi đầu tiên
    })

    next() // Nếu không có lỗi, tiếp tục xử lý request sang controller
  } catch (err) {
    const errorMessage = new Error(err).message
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage
    )
    next(customError) // Gọi middleware xử lý lỗi tập trung
  }
}

export const ordersValidation = {
  verifyId,
  order
}
