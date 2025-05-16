import React from 'react'
import useProducts from '~/hook/useProducts'
import { useCart } from './useCart'
import { CartModal } from './addCart.jsx'

export default function ProductListPage() {
  const { products, loading: loadingProducts } = useProducts()
  const { addToCart, loading: loadingCart } = useCart()

  const handleAddToCart = async (productId) => {
    const payload = {
      cartItems: [
        {
          productId,
          quantity: 1
        }
      ]
    }
    await addToCart(payload)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Danh sách sản phẩm</h1>
      {loadingProducts && <p>Đang tải sản phẩm...</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 250px)',
          gap: '1rem'
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{ border: '1px solid #ddd', padding: '1rem' }}
          >
            <h3>{product.name}</h3>
            <p>Giá: {product.price} đ</p>
            <button
              onClick={() => handleAddToCart(product._id)}
              disabled={loadingCart}
            >
              {loadingCart ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
            </button>
          </div>
        ))}
      </div>

      {/* Modal hoặc Component hiển thị giỏ hàng */}
      <CartModal />
    </div>
  )
}
