// hooks/useCategories.js
import { useState, useEffect } from 'react'
import { getCategories } from '~/services/categoryService'

const useCategories = (page = 1, limit = 10) => {
  const [categories, setCategories] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setloading] = useState(false)
  useEffect(() => {
    fetchCategories(page)
  }, [page])
  const fetchCategories = async (page = 1) => {
    setloading(true)
    const { categories, total } = await getCategories(page, limit)
    setCategories(categories)
    setTotalPages(Math.ceil(total / limit))
    setloading(false)
  }

  return { categories, totalPages, fetchCategories, loading }
}

export default useCategories
