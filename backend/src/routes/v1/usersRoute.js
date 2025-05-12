import express from 'express'

import { usersValidation } from '~/validations/usersValidation'
import { usersController } from '~/controllers/usersController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

// Lấy Profile user
Router.route('/profile').get(
  authMiddleware.isAuthorized,
  usersController.getProfile
)

// Cập nhật thông tin Profile user
Router.route('/profile').patch(
  authMiddleware.isAuthorized,
  usersValidation.updateProfile,
  usersController.updateProfile
)

// Tài khoản người dùng
Router.route('/').get(usersController.getUserList)

// Lấy thông tin một người dùng người dùng.
Router.route('/:userId').get(usersValidation.verifyId, usersController.getUser)

// Cập nhật thông tin user
Router.route('/:userId').patch(
  usersValidation.verifyId,
  usersController.updateUser
)

// Xoá tài khoản (Xóa mềm)
Router.route('/:userId').delete(
  usersValidation.verifyId,
  usersController.deleteUser
)

export const usersRoute = Router
