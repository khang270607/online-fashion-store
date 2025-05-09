import { useState } from 'react'
import { getUsers, deleteUser } from '~/services/userService'

export default function useUsers() {
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [Loading, setLoading] = useState(false)
  const ROWS_PER_PAGE = 10

  const fetchUsers = async (page = 1) => {
    setLoading(true)
    const { users, total } = await getUsers(page, ROWS_PER_PAGE)
    setUsers(users)
    setTotalPages(Math.ceil(total / ROWS_PER_PAGE))
    setLoading(false)
  }

  const removeUser = async (id, page) => {
    const success = await deleteUser(id)
    if (success) fetchUsers(page)
  }

  return { users, totalPages, fetchUsers, removeUser, Loading }
}
