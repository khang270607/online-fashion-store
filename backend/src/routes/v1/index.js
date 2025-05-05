import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { authMiddleware } from '~/middlewares/authMiddleware'

// Router
import { authRoute } from '~/routes/v1/authRoute'
import { usersRoute } from '~/routes/v1/usersRoute'

const Router = express.Router()

// Route kiểm tra trạng thái
Router.route('/status').get(authMiddleware.isAuthorized, (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs V1 đã sẵn sàng để sử dụng'
  })
})

// Authentication APIs
Router.use('/auth', authRoute)

// Users APIs
Router.use('/users', usersRoute)

export const APIs_V1 = Router
