import { StatusCodes } from 'http-status-codes'
import ms from 'ms'

import { authService } from '~/services/authService'

const register = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service
    const register = await authService.register(req.body)

    // Có kết quả thì trả về Client
    res.status(StatusCodes.CREATED).json(register)
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service
    const login = await authService.login(req.body)

    // Tạo cookie cho access token
    res.cookie('accessToken', login.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    // Tạo cookie cho refresh token
    res.cookie('refreshToken', login.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })

    // Có kết quả thì trả về Client
    res.status(StatusCodes.OK).json(login)
  } catch (err) {
    next(err)
  }
}

export const authController = {
  register,
  login
}
