import { OrderItemModel } from '~/models/OrderItemModel'

const createOrderItem = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newOrderItem = {
      orderId: reqBody.orderId,
      productId: reqBody.productId,
      quantity: reqBody.quantity,
      priceAtOrder: reqBody.priceAtOrder
    }

    const OrderItem = await OrderItemModel.create(newOrderItem)

    return OrderItem
  } catch (err) {
    throw err
  }
}

const getOrderItemList = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await OrderItemModel.find({}).lean()

    return result
  } catch (err) {
    throw err
  }
}

const getOrderItem = async (orderItemId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await OrderItemModel.findById(orderItemId).lean()

    return result
  } catch (err) {
    throw err
  }
}

const updateOrderItem = async (orderItemId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updatedOrderItem = await OrderItemModel.findOneAndUpdate(
      { _id: orderItemId },
      reqBody,
      {
        new: true,
        runValidators: true
      }
    )

    return updatedOrderItem
  } catch (err) {
    throw err
  }
}

const deleteOrderItem = async (orderItemId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const orderItemUpdated = await OrderItemModel.findOneAndDelete({
      _id: orderItemId
    })

    return orderItemUpdated
  } catch (err) {
    throw err
  }
}

export const orderItemsService = {
  createOrderItem,
  getOrderItemList,
  getOrderItem,
  updateOrderItem,
  deleteOrderItem
}
