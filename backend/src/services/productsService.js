import { StatusCodes } from 'http-status-codes'

import { ProductModel } from '~/models/ProductModel'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'

const createProduct = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newProduct = {
      name: reqBody.name,
      description: reqBody.description,
      price: reqBody.price,
      image: reqBody.image,
      categoryId: reqBody.categoryId,
      quantity: reqBody.quantity,
      slug: slugify(reqBody.name),
      destroy: false
    }

    const Product = await ProductModel.create(newProduct)

    return Product
  } catch (err) {
    throw err
  }
}

const getProductList = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await ProductModel.find({ destroy: false })
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

const getProduct = async (productId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await ProductModel.findById({
      _id: productId,
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

const updateProduct = async (productId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: productId, destroy: false },
      reqBody,
      {
        new: true,
        runValidators: true
      }
    )

    return updatedProduct
  } catch (err) {
    throw err
  }
}

const deleteProduct = async (productId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const productUpdated = await ProductModel.findOneAndUpdate(
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

const getListProductOfCategory = async (categoryId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const ListProduct = await ProductModel.find({
      categoryId: categoryId,
      destroy: false
    }).lean()

    return ListProduct
  } catch (err) {
    throw err
  }
}

export const productsService = {
  createProduct,
  getProductList,
  getProduct,
  updateProduct,
  deleteProduct,
  getListProductOfCategory
}
