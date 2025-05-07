import { useState } from 'react'
import { getProducts } from '~/services/productService'

const useProducts = (page = 1, limit = 10) => {
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async (page = 1) => {
    setLoading(true)
    const { products, total } = await getProducts(page, limit)
    setProducts(products)
    setTotalPages(Math.ceil(total / limit))
    setLoading(false)
  }

  return { products, totalPages, fetchProducts, loading }
}

export default useProducts
