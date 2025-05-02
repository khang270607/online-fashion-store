/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import exitHook from 'async-exit-hook'

import { CONNECT_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import { corsOptions } from '~/config/cors'

const START_SERVER = () => {
  const app = express()

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
      `Xin chào Dev!, Tôi đang chạy tại http://${env.APP_HOST}:${env.APP_PORT}/`
    )
  })

  // Thực hiện các tác vụ cleanup trước khi dừng server
  exitHook(() => {
    mongoose.disconnect()
    console.log(' Đã ngắt kết nối đến MongoDB!')
  })
}

CONNECT_DB()
  .then(() => console.log('Kết nối thành công đến MongoDB!'))
  .then(() => {
    START_SERVER()
  })
  .catch((err) => {
    console.error('Kết nối thất bại đến MongoDB!', err)
    // Dừng ứng dụng nếu không thể kết nối đến MongoDB
    process.exit(1)
  })
