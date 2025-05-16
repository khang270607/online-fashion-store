import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import TransactionTable from './TransactionTable'
import TransactionPagination from './TransactionPagination'
import ViewTransactionModal from './modal/ViewTransactionModal'
import EditTransactionModal from './modal/EditTransactionModal'
import DeleteTransactionModal from './modal/DeleteTransactionModal'
import useTransactions from '~/hook/useTransactions'

const TransactionManagement = () => {
  const { orderId: orderIdParam } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const orderIdQuery = queryParams.get('orderId')

  // ưu tiên lấy từ params, nếu không có lấy từ query string
  const orderId = orderIdParam || orderIdQuery

  const [page, setPage] = useState(1)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [loadingAction, setLoadingAction] = useState(false)

  const {
    transactions,
    loading,
    fetchTransactions,
    getTransactionDetail,
    updateTransaction,
    deleteTransaction
  } = useTransactions()

  useEffect(() => {
    if (orderId) {
      fetchTransactions(orderId)
    }
  }, [orderId, page])

  const handleOpenView = async (transaction) => {
    const detail = await getTransactionDetail(transaction._id)
    setSelectedTransaction(detail)
    setOpenView(true)
  }

  const handleOpenEdit = async (transaction) => {
    const detail = await getTransactionDetail(transaction._id)
    setSelectedTransaction(detail)
    setOpenEdit(true)
  }

  const handleOpenDelete = (transaction) => {
    setSelectedTransaction(transaction)
    setOpenDelete(true)
  }

  const handleDeleteConfirm = async () => {
    setLoadingAction(true)
    await deleteTransaction(selectedTransaction._id)
    setOpenDelete(false)
    fetchTransactions(orderId)
    setLoadingAction(false)
  }

  const handleUpdateTransaction = async (transactionId, data) => {
    await updateTransaction(transactionId, data)
    fetchTransactions(orderId)
    setOpenEdit(false)
  }

  return (
    <>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Quản lý giao dịch
      </Typography>

      <TransactionTable
        transactions={transactions}
        loading={loading}
        onView={handleOpenView}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      <TransactionPagination
        page={page}
        totalPages={1} // cần cập nhật lại nếu API có pagination
        onPageChange={setPage}
      />

      {selectedTransaction && (
        <ViewTransactionModal
          open={openView}
          onClose={() => setOpenView(false)}
          transaction={selectedTransaction}
        />
      )}

      {selectedTransaction && (
        <EditTransactionModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          transaction={selectedTransaction}
          onUpdate={handleUpdateTransaction}
        />
      )}

      <DeleteTransactionModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDeleteConfirm}
        loading={loadingAction}
      />
    </>
  )
}

export default TransactionManagement
