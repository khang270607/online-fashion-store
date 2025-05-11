import { StatusCodes } from 'http-status-codes'

import { OrderModel } from '~/models/OrderModel'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'

const createOrder = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newOrder = {
      name: reqBody.name,
      description: reqBody.description,
      price: reqBody.price,
      image: reqBody.image,
      categoryId: reqBody.categoryId,
      quantity: reqBody.quantity,
      slug: slugify(reqBody.name),
      destroy: false
    }

    const Order = await OrderModel.create(newOrder)

    return Order
  } catch (err) {
    throw err
  }
}

const getOrderList = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await OrderModel.find({ destroy: false })
      .populate({
        path: 'categoryId',
        select: 'name description slug _id'
      })
      .lean()

    return result
  } catch (err) {
    throw err
  }
}

const getOrder = async (productId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await OrderModel.findById({ productId, destroy: false })
      .populate({
        path: 'categoryId',
        select: 'name description slug _id'
      })
      .lean()

    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Không tồn tại ID này.')
    }

    return result
  } catch (err) {
    throw err
  }
}

const updateOrder = async (productId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: productId, destroy: false },
      reqBody,
      {
        new: true,
        runValidators: true
      }
    )

    return updatedOrder
  } catch (err) {
    throw err
  }
}

const deleteOrder = async (productId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const productUpdated = await OrderModel.findOneAndUpdate(
      {
        _id: productId
      },
      {
        $set: { destroy: true }
      },
      {
        new: true
      }
    )

    return productUpdated
  } catch (err) {
    throw err
  }
}

const getListOrderOfCategory = async (categoryId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const ListOrder = await OrderModel.find({
      categoryId: categoryId,
      destroy: false
    }).lean()

    return ListOrder
  } catch (err) {
    throw err
  }
}

export const ordersService = {
  createOrder,
  getOrderList,
  getOrder,
  updateOrder,
  deleteOrder,
  getListOrderOfCategory
}
