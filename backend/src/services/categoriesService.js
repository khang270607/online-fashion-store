import { StatusCodes } from 'http-status-codes'

import { CategoryModel } from '~/models/CategoryModel'
import ApiError from '~/utils/ApiError'
import { pickUser, slugify } from '~/utils/formatters'
import { ROLE } from '~/utils/constants'

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
    const category = await CategoryModel.findById(categoryId)

    if (!category) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'ID không tồn tại.')
    }

    // Cập nhật dữ liệu
    Object.assign(category, reqBody)

    const updatedCategory = await category.save()

    return updatedCategory
  } catch (err) {
    throw err
  }
}

const deleteCategory = async (categoryId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const category = await CategoryModel.findById(categoryId)

    if (!category) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Không tồn tại ID.')
    }

    // Cập nhật dữ liệu
    category.destroy = true
    const categoryUpdated = await category.save()

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
