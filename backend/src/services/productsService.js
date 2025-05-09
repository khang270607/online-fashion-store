import { StatusCodes } from 'http-status-codes'

import { ProductModel } from '~/models/ProductModel'
import ApiError from '~/utils/ApiError'
import { pickUser, slugify } from '~/utils/formatters'
import { ROLE } from '~/utils/constants'

const createProduct = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newProduct = {
      name: reqBody.name,
      description: reqBody.description,
      price: reqBody.price,
      image: reqBody.image,
      category: reqBody.category,
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
    const result = await ProductModel.find({}).lean()

    return result
  } catch (err) {
    throw err
  }
}

const getProduct = async (productId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await ProductModel.findById(productId).lean()

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
    const product = await ProductModel.findById(productId)

    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'ID không tồn tại.')
    }

    // Cập nhật dữ liệu
    Object.assign(product, reqBody)

    const updatedProduct = await product.save()

    return updatedProduct
  } catch (err) {
    throw err
  }
}

const deleteProduct = async (productId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const product = await ProductModel.findById(productId)

    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Không tồn tại ID.')
    }

    // Cập nhật dữ liệu
    product.destroy = true
    const productUpdated = await product.save()

    return productUpdated
  } catch (err) {
    throw err
  }
}

export const productsService = {
  createProduct,
  getProductList,
  getProduct,
  updateProduct,
  deleteProduct
}
