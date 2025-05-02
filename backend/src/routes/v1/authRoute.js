import express from 'express'

import { authValidation } from '~/validations/authValidation'
import { authController } from '~/controllers/authController'

const Router = express.Router()

// Đăng ký tài khoản.
// prettier-ignore
Router.route('/register')
  .post(authValidation.register, authController.register)

// Đăng nhập, nhận JWT token.
Router.route('/login').post(authValidation.login, authController.login)

export const authRoute = Router
