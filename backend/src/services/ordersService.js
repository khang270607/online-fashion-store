import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'
import { OrderModel } from '~/models/OrderModel'
import { ShippingAddressModel } from '~/models/ShippingAddressModel'
import { CartModel } from '~/models/CartModel'
import { couponsService } from '~/services/couponsService'
import { ProductModel } from '~/models/ProductModel'
import { OrderItemModel } from '~/models/OrderItemModel'
import { OrderStatusHistoryModel } from '~/models/OrderStatusHistoryModel'
import { UserModel } from '~/models/UserModel'

const createOrder = async (userId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Kiểm tra giỏ hàng
    const cart = await CartModel.findOne({ userId })

    if (!cart || cart.cartItems.length === 0) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Giỏ hàng trống hoặc không tồn tại.'
      )
    }

    // Kiểm tra địa chỉ giao hàng
    const address = await ShippingAddressModel.findOne({
      _id: reqBody.shippingAddressId,
      userId
    })
    if (!address)
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        'Địa chỉ giao hàng không tồn tại.'
      )

    // Kiểm tra mã giảm giá
    const productIds = cart.cartItems.map((i) => i.productId)

    const products = await ProductModel.find({
      _id: { $in: productIds }
    }).lean()

    const productMap = new Map(products.map((p) => [p._id.toString(), p]))

    let calculatedSubtotal = 0
    for (const item of cart.cartItems) {
      const product = productMap.get(item.productId.toString())

      calculatedSubtotal += product.price * item.quantity
    }

    const validateCoupon = await couponsService.validateCoupon(userId, {
      couponCode: reqBody.couponCode,
      cartTotal: calculatedSubtotal
    })

    if (!validateCoupon.valid && reqBody?.couponCode) {
      throw new ApiError(StatusCodes.BAD_REQUEST, validateCoupon.message)
    }

    const cartTotal = validateCoupon.newTotal || calculatedSubtotal
    const discountAmount = validateCoupon.discountAmount || 0

    // Kiểm tra cartToal FE gửi lên
    if (cartTotal !== reqBody.total) {
      throw new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Tổng tiền giỏ hàng không chính xác.'
      )
    }

    const newOrder = {
      userId: userId,
      shippingAddressId: reqBody.shippingAddressId,
      total: cartTotal,
      couponId: reqBody.couponId,
      paymentMethod: reqBody.paymentMethod,
      couponCode: reqBody.couponCode,
      note: reqBody.note,

      discountAmount: discountAmount,
      status: 'Pending',
      isPaid: false,
      paymentStatus: 'Pending',
      isDelivered: false
    }

    const Order = await OrderModel.create(newOrder)

    // Lưu vào OrderItems
    for (const item of cart.cartItems) {
      const product = await ProductModel.findOne({
        _id: item.productId,
        destroy: false
      })

      const orderItemData = {
        orderId: Order._id,
        productId: product._id,
        quantity: item.quantity,
        priceAtOrder: product.price
      }

      // Lưu vào OrderItem trong DB
      await OrderItemModel.create(orderItemData)
    }

    await CartModel.updateOne({ userId }, { $set: { cartItems: [] } })

    return Order
  } catch (err) {
    throw err
  }
}

const getOrderList = async (userId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await OrderModel.find({}).lean()

    return result
  } catch (err) {
    throw err
  }
}

const getOrder = async (orderId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await OrderModel.findById(orderId)
      .populate({
        path: 'userId couponId shippingAddressId',
        select: '-password -role -destroy -isActive -verifyToken'
      })
      .lean()

    return result
  } catch (err) {
    throw err
  }
}

const updateOrder = async (userId, orderId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const existingOrder = await OrderModel.findById(orderId)
      .select('status')
      .lean()

    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: orderId },
      reqBody,
      {
        new: true,
        runValidators: true
      }
    )

    const newStatus = reqBody.status

    if (newStatus && newStatus !== existingOrder.status) {
      // status đã đổi, tạo history
      await OrderStatusHistoryModel.create({
        orderId: orderId,
        status: newStatus,
        note: reqBody.note || null,
        updatedBy: userId,
        updatedAt: new Date()
      })
    }

    return updatedOrder
  } catch (err) {
    throw err
  }
}

const deleteOrder = async (orderId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const orderUpdated = await OrderModel.findOneAndUpdate(
      {
        _id: orderId
      },
      {
        $set: { status: 'Cancelled' }
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
