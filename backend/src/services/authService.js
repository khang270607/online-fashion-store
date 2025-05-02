import { StatusCodes } from 'http-status-codes'
import { v4 as uuidv4 } from 'uuid'

import { slugify } from '~/utils/formatters'
import { UserModel } from '~/models/userModel'
import { password } from '~/utils/password'
import ApiError from '~/utils/ApiError'
import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'
import { pickUser } from '~/utils/formatters'

const register = async (reqBody) => {
  // Kiểm tra email đã tồn tại?
  const exists = await UserModel.exists({ email: reqBody.email })
  if (exists) {
    // Trả về lỗi rõ ràng
    throw new ApiError(StatusCodes.CONFLICT, 'Email đã tồn tại')
  }

  // Băm mật khẩu (Hash) trước khi lưu vào DB
  const passwordHash = await password.hash(reqBody.password)

  const newUser = {
    name: reqBody.name,
    email: reqBody.email,
    password: passwordHash,
    avatarUrl: reqBody.avatarUrl,
    role: 'customer',
    slug: slugify(reqBody.name),
    destroy: false,
    verifyToken: uuidv4(),
    createdAt: reqBody.createdAt,
    updatedAt: reqBody.updatedAt
  }

  // Gọi tới tần Model để xử lý lưu bản ghi user vào trong Database
  // Lưu user vào DB
  const user = await UserModel.create(newUser)

  //   Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án
  //   Bắn email, notification về cho admin khi có 1 cái user mới được tạo

  return pickUser(user)
}

const login = async (reqBody) => {
  console.log('Login: ', reqBody)

  // Tìm kiếm người dùng theo email
  const user = await UserModel.findOne({ email: reqBody.email })

  if (user) {
    // Kiểm tra mật khẩu bằng cách so sánh mật khẩu đã băm
    const isMatch = await password.compare(reqBody.password, user.password)

    if (isMatch) {
      const userInfo = {
        name: user.name,
        email: user.email,
        role: user.role,
        slug: user.slug,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }

      // Tạo access token
      const accessToken = await JwtProvider.generateToken(
        userInfo,
        env.ACCESS_TOKEN_SECRET_SIGNATURE,
        '1h'
      )

      // Tạo refresh token
      const refreshToken = await JwtProvider.generateToken(
        userInfo,
        env.REFRESH_TOKEN_SECRET_SIGNATURE,
        '14 days'
      )
      return {
        ...userInfo,
        accessToken,
        refreshToken
      }
    } else {
      return Promise.reject(
        new ApiError(StatusCodes.UNAUTHORIZED, 'Mật khẩu không chính xác!')
      )
    }
  }

  return Promise.reject(
    new ApiError(StatusCodes.UNAUTHORIZED, 'Tài khoản khoản chưa đăng ký!')
  )
}

export const authService = {
  register,
  login
}
