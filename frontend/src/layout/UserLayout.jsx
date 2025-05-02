import { Outlet, Link } from 'react-router-dom'
function UserLayout() {
  return (
    <>
      <div>Header</div>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default UserLayout
