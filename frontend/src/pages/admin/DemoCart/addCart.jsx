import React from 'react'
import { useCart } from './useCart.jsx'

export const CartModal = () => {
  const { cart, loading, deleteItem, clearCart } = useCart()
  React.useEffect(() => {
    console.log('cart', cart)
  }, [cart])
  console.log(cart)
  if (loading) return <p>Đang tải giỏ hàng...</p>

  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return (
      <div style={{ marginTop: '2rem' }}>
        <h2>Giỏ hàng</h2>
        <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
      </div>
    )
  }

  return (
    <div
      style={{
        marginTop: '2rem',
        borderTop: '1px solid #ccc',
        paddingTop: '1rem'
      }}
    >
      <h2>Giỏ hàng hiện tại</h2>
      <ul>
        {cart.cartItems.map(
          (item) => (
            console.log('item', item),
            (
              <li key={item.productId} style={{ marginBottom: '1rem' }}>
                <p>
                  <strong>{item.productId.name}</strong>
                </p>
                <p>Số lượng: {item.productId.quantity}</p>
                <button onClick={() => deleteItem(item.productId._id)}>
                  Xóa
                </button>
              </li>
            )
          )
        )}
      </ul>
      <button
        onClick={clearCart}
        style={{ marginTop: '1rem', backgroundColor: 'red', color: 'white' }}
      >
        Xóa toàn bộ giỏ hàng
      </button>
    </div>
  )
}
