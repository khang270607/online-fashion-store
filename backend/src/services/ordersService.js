import { StatusCodes } from 'http-status-codes'

import { OrderModel } from '~/models/OrderModel'
import { ShippingAddressModel } from '~/models/ShippingAddressModel'
import ApiError from '~/utils/ApiError'

const createOrder = async (userId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const isShippingAddressId = await ShippingAddressModel.exists({
      userId
    })

    if (!isShippingAddressId) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        'Không tồn tại địa chỉ giao hàng.'
      )
    }

    // const newOrder = {
    //   userId: userId,
    //   shippingAddressId: reqBody.shippingAddressId,
    //   total: reqBody.total,
    //   couponId: reqBody.couponId,
    //   paymentMethod: reqBody.paymentMethod,
    //
    //   discountAmount: 0,
    //   status: 'Pending',
    //   isPaid: false,
    //   paymentStatus: 'Pending',
    //   isDelivered: false
    // }
    //
    // const Order = await OrderModel.create(newOrder)
    //
    // return Order
  } catch (err) {
    throw err
  }
}

const getOrderList = async (userId) => {
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

const getOrder = async (userId, orderId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await OrderModel.findById({ orderId, destroy: false })
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

const updateOrder = async (userId, orderId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: orderId, destroy: false },
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

const deleteOrder = async (userId, orderId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const orderUpdated = await OrderModel.findOneAndUpdate(
      {
        _id: orderId
      },
      {
        $set: { destroy: true }
      },
      {
        new: true
      }
    )

    return orderUpdated
  } catch (err) {
    throw err
  }
}

export const ordersService = {
  createOrder,
  getOrderList,
  getOrder,
  updateOrder,
  deleteOrder
}
