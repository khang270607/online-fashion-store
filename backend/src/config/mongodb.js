import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb://127.0.0.1:27017/'
const DATABASE_NAME = 'online-fashion-store'

export async function CONNECT_DB() {
  await mongoose.connect(MONGODB_URI + DATABASE_NAME)
}
