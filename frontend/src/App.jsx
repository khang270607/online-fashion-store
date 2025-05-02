import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// page admin
import AdminLayout from '~/layout/AdminLayout'
import UserManagement from '~/pages/admin/UserManagement'
import Dashboard from '~/pages/admin/Dashboard'
import ProductManagement from '~/pages/admin/ProductManagement'
import CategorieManagement from '~/pages/admin/CategorieManagement'
import OrderManagement from '~/pages/admin/OrderManagement'
// page user

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*Router quản trị*/}
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='users' element={<UserManagement />} />
            <Route path='products' element={<ProductManagement />} />
            <Route path='categories' element={<CategorieManagement />} />
            <Route path='orders' element={<OrderManagement />} />
          </Route>
          {/*Router khách hàng*/}
          <Route path='' element={<div>Trang chủ</div>}></Route>
          <Route path='' element={<div>Không tìm thấy trang</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
