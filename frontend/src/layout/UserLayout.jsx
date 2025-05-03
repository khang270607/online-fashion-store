import { Outlet, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
function UserLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default UserLayout
