import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { authRoute } from '~/routes/v1/authRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs V1 đã sẵn sàng để sử dụng'
  })
})

// User APIs
Router.use('/auth', authRoute)

export const APIs_V1 = Router
