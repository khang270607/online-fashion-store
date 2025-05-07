import mongoose from 'mongoose'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const verifyId = async (req, res, next) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const userId = req.params.userId

    // Kiểm tra format ObjectId
    if (!mongoose.isValidObjectId(userId)) {
      const error = new ApiError(
        StatusCodes.BAD_REQUEST,
        'Không đúng định dạng MongoDB ObjectId'
      )
      next(error)
    }

    next()
  } catch (err) {
    throw err
  }
}

export const usersValidation = {
  verifyId
}
