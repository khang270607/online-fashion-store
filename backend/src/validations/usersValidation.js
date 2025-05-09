import validObjectId from '~/utils/validObjectId'

const verifyId = (req, res, next) => {
  const userId = req.params.userId

  // Kiểm tra format ObjectId
  validObjectId(userId, next)

  next()
}

export const usersValidation = {
  verifyId
}
