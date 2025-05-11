import { StatusCodes } from 'http-status-codes'

import { orderItemsService } from '~/services/orderItemsService'

const createOrderItem = async (req, res, next) => {
  try {
    const result = await orderItemsService.createOrderItem(req.body)

    res.status(StatusCodes.CREATED).json(result)
  } catch (err) {
    next(err)
  }
}

const getOrderItemList = async (req, res, next) => {
  try {
    const result = await orderItemsService.getOrderItemList()

    res.status(StatusCodes.OK).json(result)
  } catch (err) {
    next(err)
  }
}

const getOrderItem = async (req, res, next) => {
  try {
    const orderItemId = req.params.orderItemId

    const result = await orderItemsService.getOrderItem(orderItemId)

    res.status(StatusCodes.OK).json(result)
  } catch (err) {
    next(err)
  }
}

const updateOrderItem = async (req, res, next) => {
  try {
    const orderItemId = req.params.orderItemId

    const result = await orderItemsService.updateOrderItem(
      orderItemId,
      req.body
    )

    res.status(StatusCodes.OK).json(result)
  } catch (err) {
    next(err)
  }
}

const deleteOrderItem = async (req, res, next) => {
  try {
    const orderItemId = req.params.orderItemId

    const result = await orderItemsService.deleteOrderItem(orderItemId)

    res.status(StatusCodes.OK).json(result)
  } catch (err) {
    next(err)
  }
}

export const orderItemsController = {
  createOrderItem,
  getOrderItemList,
  getOrderItem,
  updateOrderItem,
  deleteOrderItem
}
