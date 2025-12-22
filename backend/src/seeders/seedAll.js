// import { seedRoles } from '../seeders/scripts/seedRoles.js'
// import { seedPermissions } from '../seeders/scripts/seedPermissions.js'

// // Chạy các hàm seed để tạo dữ liệu mẫu
// await seedRoles()

// await seedPermissions()

import { CONNECT_DB } from '~/config/mongodb'
import mongoose from 'mongoose'

import { seedRoles } from './scripts/seedRoles.js'
import { seedPermissions } from './scripts/seedPermissions.js'

const seedAll = async () => {
  try {
    await CONNECT_DB()
    console.log('Kết nối DB để seed thành công')

    await seedRoles()
    await seedPermissions()

    console.log('Seed dữ liệu thành công')
  } catch (error) {
    console.error('Seed thất bại:', error)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

seedAll()
