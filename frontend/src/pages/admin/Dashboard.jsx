import { Outlet } from 'react-router-dom'
function Dashboard() {
  return (
    <>
      Đây là trang thống kê
      <Outlet />
    </>
  )
}

export default Dashboard
