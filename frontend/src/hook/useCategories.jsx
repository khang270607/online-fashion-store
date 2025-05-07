// hooks/useCategories.js
import { useState } from 'react'
import { getCategories } from '~/services/categoryService'

const useCategories = (page = 1, limit = 10) => {
  const [categories, setCategories] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [Loading, setLoading] = useState(false)

  const fetchCategories = async (page = 1) => {
    setLoading(true)
    const { categories, total } = await getCategories(page, limit)
    setCategories(categories)
    setTotalPages(Math.ceil(total / limit))
    setLoading(false)
  }

  return { categories, totalPages, fetchCategories, Loading }
}

export default useCategories
