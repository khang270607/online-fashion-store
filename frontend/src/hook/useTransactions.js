import { useState, useEffect } from 'react'
import {
  getTransactionsByOrderId,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById
} from '~/services/transactionService'

const useTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTransactions = async (orderId) => {
    setLoading(true)
    const data = await getTransactionsByOrderId(orderId)
    setTransactions(data)
    setLoading(false)
  }

  const getTransactionDetail = async (transactionId) => {
    return await getTransactionById(transactionId)
  }

  const updateTransaction = async (transactionId, data) => {
    return await updateTransactionById(transactionId, data)
  }

  const deleteTransaction = async (transactionId) => {
    return await deleteTransactionById(transactionId)
  }

  return {
    transactions,
    loading,
    fetchTransactions,
    getTransactionDetail,
    updateTransaction,
    deleteTransaction
  }
}

export default useTransactions
