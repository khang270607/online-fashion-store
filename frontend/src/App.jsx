import { Routes, Route, Navigate } from 'react-router-dom'
// Trang người dùng
import UserHome from '~/pages/user/Home'
import UserLogin from '~/pages/user/Auth/Login'
import UserRegister from '~/pages/user/Auth/Register'

// Trang admin
import AdminHome from '~/pages/admin/Home'

// Trang 404
import NotFound from '~/pages/404/NotFound'

function App() {
  return (
    <Routes>
      {/*Customer*/}
      <Route path='/' element={<UserHome />} />
      <Route path='/register' element={<UserRegister />} />
      <Route path='/login' element={<UserLogin />} />

      {/*Admin*/}
      <Route path='/admin' element={<AdminHome />} />
      {/*Trang 404*/}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
