import express from 'express'

import { CONNECT_DB } from '~/config/mongodb'

const START_SERVER = () => {
  const app = express()
  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    res.send('<h1>CHÀO MỪNG! ĐẾN VỚI DỰ ÁN WEBSITE KINH DOANH THỜI TRANG</h1>')
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Dev, I am running at http://${hostname}:${port}/`)
  })
}

CONNECT_DB()
  // eslint-disable-next-line no-console
  .then(() => console.log('Kết nối thành công đến MongoDB!'))
  .then(() => {
    START_SERVER()
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Kết nối thất bại đến MongoDB!', err)
    // Dừng ứng dụng nếu không thể kết nối đến MongoDB
    process.exit(1)
  })
