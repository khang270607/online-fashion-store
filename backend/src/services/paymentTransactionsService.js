import { StatusCodes } from 'http-status-codes'

import { PaymentTransactionModel } from '~/models/PaymentTransactionModel'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'

const createPaymentTransaction = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newPaymentTransaction = {
      name: reqBody.name,
      description: reqBody.description,
      price: reqBody.price,
      image: reqBody.image,
      categoryId: reqBody.categoryId,
      quantity: reqBody.quantity,
      slug: slugify(reqBody.name),
      destroy: false
    }

    const PaymentTransaction = await PaymentTransactionModel.create(
      newPaymentTransaction
    )

    return PaymentTransaction
  } catch (err) {
    throw err
  }
}

const getPaymentTransactionList = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await PaymentTransactionModel.find({ destroy: false })
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

const getPaymentTransaction = async (paymentTransactionId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await PaymentTransactionModel.findById({
      _id: paymentTransactionId,
      destroy: false
    })
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

const updatePaymentTransaction = async (paymentTransactionId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updatedPaymentTransaction =
      await PaymentTransactionModel.findOneAndUpdate(
        { _id: paymentTransactionId, destroy: false },
        reqBody,
        {
          new: true,
          runValidators: true
        }
      )

    return updatedPaymentTransaction
  } catch (err) {
    throw err
  }
}

const deletePaymentTransaction = async (paymentTransactionId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const paymentTransactionUpdated =
      await PaymentTransactionModel.findOneAndUpdate(
        {
          _id: paymentTransactionId
        },
        {
          $set: { destroy: true }
        },
        {
          new: true
        }
      )

    return paymentTransactionUpdated
  } catch (err) {
    throw err
  }
}

const getListPaymentTransactionOfCategory = async (categoryId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const ListPaymentTransaction = await PaymentTransactionModel.find({
      categoryId: categoryId,
      destroy: false
    }).lean()

    return ListPaymentTransaction
  } catch (err) {
    throw err
  }
}

export const paymentTransactionsService = {
  createPaymentTransaction,
  getPaymentTransactionList,
  getPaymentTransaction,
  updatePaymentTransaction,
  deletePaymentTransaction,
  getListPaymentTransactionOfCategory
}
