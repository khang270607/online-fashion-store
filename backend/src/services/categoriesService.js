import { StatusCodes } from 'http-status-codes'

import { CategoryModel } from '~/models/CategoryModel'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'
import { ProductModel } from '~/models/ProductModel'

const createCategory = async (reqBody) => {
  try {
    const newCategory = {
      name: reqBody.name,
      description: reqBody.description,
      slug: slugify(reqBody.name),
      destroy: false
    }

    const category = await CategoryModel.create(newCategory)

    return category
  } catch (err) {
    throw new ApiError(StatusCodes.CONFLICT, 'Danh mục sản phẩm đã tồn tại!')
  }
}

const getCategoryList = async () => {
  const result = await CategoryModel.find({}).lean()

  return result
}

const getCategory = async (categoryId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await CategoryModel.findById(categoryId).lean()

    if (!result) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        'Không có dữ liệu Danh mục sản phẩm.'
      )
    }

    return result
  } catch (err) {
    throw err
  }
}

const updateCategory = async (categoryId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updatedCategory = await CategoryModel.findOneAndUpdate(
      { _id: categoryId },
      reqBody,
      { new: true }
    )

    return updatedCategory
  } catch (err) {
    throw err
  }
}

const deleteCategory = async (categoryId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const isProductExist = await ProductModel.exists({
      categoryId: categoryId,
      destroy: false
    })

    if (isProductExist) {
      throw new ApiError(StatusCodes.CONFLICT, 'Danh mục có chứa sản phẩm.')
    }

    const categoryUpdated = await CategoryModel.findOneAndUpdate(
      { _id: categoryId },
      {
        $set: { destroy: true }
      },
      {
        new: true
      }
    )

    return categoryUpdated
  } catch (err) {
    throw err
  }
}

export const categoriesService = {
  createCategory,
  getCategoryList,
  getCategory,
  updateCategory,
  deleteCategory
}
