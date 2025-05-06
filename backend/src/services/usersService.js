import { StatusCodes } from 'http-status-codes'

import { UserModel } from '~/models/UserModel'
import ApiError from '~/utils/ApiError'
import { pickUser } from '~/utils/formatters'
import { ROLE } from '~/utils/constants'

const getUserList = async () => {
  const result = await UserModel.find({}).lean()
  const userList = []

  for (let i = 0; i < result.length; i++) {
    const user = pickUser(result[i])
    userList.push(user)
  }

  return userList
}

const getUser = async (userId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await UserModel.findById(userId)

    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Không có dữ liệu người dùng.')
    }

    return pickUser(result)
  } catch (err) {
    throw err
  }
}

const updateUser = async (userId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const user = await UserModel.findById(userId)

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Không có dữ liệu người dùng.')
    }

    const role = reqBody.role
    if (!Object.values(ROLE).includes(role)) {
      throw new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Không đúng định dạng dữ liệu.'
      )
    }

    // Cập nhật dữ liệu
    user.role = role

    const updatedUser = await user.save()

    return pickUser(updatedUser)
  } catch (err) {
    throw err
  }
}

const deleteUser = async (userId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const user = await UserModel.findById(userId)

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Không có dữ liệu người dùng.')
    }

    // Cập nhật dữ liệu
    user.destroy = true
    const updatedUser = await user.save()

    return pickUser(updatedUser)
  } catch (err) {
    throw err
  }
}

export const usersService = {
  getUserList,
  getUser,
  updateUser,
  deleteUser
}
