/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import exitHook from 'async-exit-hook'
import cookieParser from 'cookie-parser'

import { CONNECT_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import { corsOptions } from '~/config/cors'

const START_SERVER = () => {
  const app = express()

  // Middleware cấu hình Cookie Parser
  app.use(cookieParser())

  // Middleware để xử lý CORS
  app.use(cors(corsOptions))

  // Middleware để parse JSON body
  app.use(express.json())

  // Use APIs V1
  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  // Ruuning server
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(
      '\x1b[32m',
      `Xin chào Dev!, Tôi đang chạy tại HOST: ${env.APP_HOST} - PORT: ${env.APP_PORT}`
    )
  })

  // Thực hiện các tác vụ cleanup trước khi dừng server
  exitHook(() => {
    mongoose.disconnect()
    console.log(' Đã ngắt kết nối đến MongoDB!')
  })
}

CONNECT_DB()
  .then(() => console.log('\x1b[32m', 'Kết nối thành công đến MongoDB!'))
  .then(() => {
    START_SERVER()
  })
  .catch((err) => {
    console.error('Kết nối thất bại đến MongoDB!', err)
    // Dừng ứng dụng nếu không thể kết nối đến MongoDB
    process.exit(1)
  })
