import { StatusCodes } from 'http-status-codes'

import { CouponModel } from '~/models/CouponModel'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'

const createCoupon = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newCoupon = {
      code: reqBody.code,
      type: reqBody.type,
      amount: reqBody.amount,
      minOrderValue: reqBody.minOrderValue,
      usageLimit: reqBody.usageLimit,
      usedCount: reqBody.usedCount,
      validFrom: reqBody.validFrom,
      validUntil: reqBody.validUntil,
      isActive: reqBody.isActive
    }

    const Coupon = await CouponModel.create(newCoupon)

    return Coupon
  } catch (err) {
    throw err
  }
}

const getCouponList = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await CouponModel.find({}).lean()

    return result
  } catch (err) {
    throw err
  }
}

const getCoupon = async (couponId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await CouponModel.findById(couponId).lean()

    return result
  } catch (err) {
    throw err
  }
}

const updateCoupon = async (couponId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updatedCoupon = await CouponModel.findOneAndUpdate(
      { _id: couponId },
      reqBody,
      {
        new: true,
        runValidators: true
      }
    )

    return updatedCoupon
  } catch (err) {
    throw err
  }
}

const deleteCoupon = async (couponId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const couponUpdated = await CouponModel.findOneAndDelete({ _id: couponId })

    return couponUpdated
  } catch (err) {
    throw err
  }
}

export const couponsService = {
  createCoupon,
  getCouponList,
  getCoupon,
  updateCoupon,
  deleteCoupon
}
