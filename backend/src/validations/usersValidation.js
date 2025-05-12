import validObjectId from '~/utils/validObjectId'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const verifyId = (req, res, next) => {
  const userId = req.params.userId

  // Kiểm tra format ObjectId
  validObjectId(userId, next)

  next()
}

const updateProfile = async (req, res, next) => {
  // Xác thực dữ liệu đầu vào correctCondition: điều kiện đúng
  const correctCondition = Joi.object({
    name: Joi.string() // Khai báo kiểu chuỗi
      .min(3) // Chuỗi tối thiểu 3 ký tự
      .max(50) // Chuỗi tối đa 50 ký tự
      .trim() // Loại bỏ khoảng trắng đầu/cuối trước khi validate
      .strict() // Không cho phép ký tự không hợp lệ
      .required(), // Bắt buộc phải có trường này

    avatarUrl: Joi.string() // phải là chuỗi :contentReference[oaicite:0]{index=0}
      .trim() // loại bỏ khoảng trắng đầu/cuối :contentReference[oaicite:1]{index=1}
      .default('images/default-avatar.png') // giá trị mặc định nếu không có
      .pattern(/\.(jpeg|jpg|png|gif)$/, 'image file extension') // chỉ cho phép đuôi ảnh phổ biến :contentReference[oaicite:2]{index=2}
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

export const usersValidation = {
  verifyId,
  updateProfile
}
