// import { ProductModel } from '~/models/ProductModel'
// import { productHandler } from '~/sockets/handlers/productsHandler'

// export const setupProductStream = (io) => {
//   const stream = ProductModel.watch([], { fullDocument: 'updateLookup' })

//   stream.on('change', async (change) => {
//     const { operationType, fullDocument } = change

//     const result = await productHandler.getCountProduct()

//     console.log('result: ', result)

//     io.emit('products:update', { operationType, data: { count: result } })
//   })

//   stream.on('error', (err) => {
//     console.error('Product stream error:', err)
//   })
// }

import mongoose from 'mongoose'
import { ProductModel } from '~/models/ProductModel'
import { productHandler } from '~/sockets/handlers/productsHandler'

export const setupProductStream = (io) => {
  const isReplicaSet =
    mongoose.connection.client?.s?.options?.replicaSet

  if (!isReplicaSet) {
    console.warn('MongoDB không phải Replica Set → bỏ qua Product Stream')
    return
  }

  const stream = ProductModel.watch([], { fullDocument: 'updateLookup' })

  stream.on('change', async (change) => {
    const { operationType } = change
    const result = await productHandler.getCountProduct()

    io.emit('products:update', {
      operationType,
      data: { count: result }
    })
  })

  stream.on('error', (err) => {
    console.error('Product stream error:', err)
  })
}
