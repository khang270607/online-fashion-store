import { useEffect, useState } from 'react'
import * as addressService from '~/services/addressService'

export const useAddress = () => {
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAddresses = async () => {
    setLoading(true)
    try {
      const res = await addressService.getAddresses()
      setAddresses(res)
    } catch (error) {
      console.error('Lỗi khi lấy địa chỉ:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  const addAddress = async (data) => {
    try {
      const newAddr = await addressService.createAddress(data)
      setAddresses(prev => [...prev, newAddr])
      return newAddr
    } catch (error) {
      console.error('Lỗi thêm địa chỉ:', error)
    }
  }

  const editAddress = async (id, data) => {
    try {
      const updated = await addressService.updateAddress(id, data)
      setAddresses(prev =>
        prev.map(addr => (addr._id === id ? updated : addr))
      )
      return updated
    } catch (error) {
      console.error('Lỗi cập nhật địa chỉ:', error)
    }
  }

  const removeAddress = async (id) => {
    try {
      await addressService.deleteAddress(id)
      setAddresses(prev => prev.filter(addr => addr._id !== id))
    } catch (error) {
      console.error('Lỗi xoá địa chỉ:', error)
    }
  }

  return {
    addresses,
    loading,
    addAddress,
    editAddress,
    removeAddress,
    fetchAddresses
  }
}
