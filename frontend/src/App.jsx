import { Routes, Route, Navigate } from 'react-router-dom'

// Trang người dùng

import UserHome from '~/pages/user/Home/UserHome'
import AccountVerification from '~/pages/user/Auth/AccountVerification'
import UserLayout from '~/layout/UserLayout'
import Login from '~/pages/user/Auth/Login'
import Register from '~/pages/user/Auth/Register'
import Product from '~/pages/user/Product/Product'
import ProductDetail from '~/pages/user/ProductDetail/ProductDetail'
import Payment from '~/pages/user/Payment/Payment'
import Cart from '~/pages/user/Cart/Cart'

// Trang admin
import AdminLayout from '~/layout/AdminLayout'
import UserManagement from '~/pages/admin/UserManagement'
import Dashboard from '~/pages/admin/Dashboard'
import ProductManagement from '~/pages/admin/ProductManagement'
import CategorieManagement from '~/pages/admin/CategorieManagement'
import OrderManagement from '~/pages/admin/OrderManagement'

// Trang 404
import NotFound from '~/pages/404/NotFound'

function App() {
  return (
    <Routes>
      {/*Authentication*/}
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='/account/verifycation' element={<AccountVerification />} />

      {/*Customer*/}
      <Route path='/' element={<UserLayout />}>
        <Route path='product' element={<Product />} />
        <Route path='productdetail' element={<ProductDetail />} />
        <Route path='payment' element={<Payment />} />
        <Route path='cart' element={<Cart />} />

        <Route index element={<UserHome />} />
      </Route>

      {/*Admin*/}
      <Route path='/admin' element={<AdminLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='users' element={<UserManagement />} />
        <Route path='products' element={<ProductManagement />} />
        <Route path='categories' element={<CategorieManagement />} />
        <Route path='orders' element={<OrderManagement />} />
      </Route>

      {/*Not found 404*/}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
