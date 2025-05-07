// components/CategoryManagement.jsx
import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CategoryTable from './CategoryTable'
import CategoryPagination from './CategoryPagination'
import useCategories from '~/hook/useCategories'
import { updateCategory, deleteCategory } from '~/services/categoryService'
import AddIcon from '@mui/icons-material/Add'
// Lazy load các modal
const AddCategoryModal = React.lazy(
  () => import('./modal/AddCategoryModal.jsx')
)
const ViewCategoryModal = React.lazy(
  () => import('./modal/ViewCategoryModal.jsx')
)
const EditCategoryModal = React.lazy(
  () => import('./modal/EditCategoryModal.jsx')
)
const DeleteCategoryModal = React.lazy(
  () => import('./modal/DeleteCategoryModal.jsx')
)

const CategoryManagement = () => {
  const [page, setPage] = React.useState(1)
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const [modalType, setModalType] = React.useState(null)

  const { categories, totalPages, fetchCategories, Loading } = useCategories()

  React.useEffect(() => {
    const loadData = async () => {
      await fetchCategories(page)
    }
    loadData()
  }, [page])

  const handleOpenModal = (type, category) => {
    if (!category || !category._id) return
    setSelectedCategory(category)
    setModalType(type)
  }

  const handleCloseModal = () => {
    setSelectedCategory(null)
    setModalType(null)
  }

  const handleChangePage = (event, value) => setPage(value)

  const handleSaveCategory = async (categoryId, updatedData) => {
    try {
      const response = await updateCategory(categoryId, updatedData)
      if (response) {
        await fetchCategories(page)
        console.log('Cập nhật thành công')
      } else {
        console.log('Cập nhật không thành công')
      }
    } catch (error) {
      console.error('Lỗi:', error)
      alert('Đã có lỗi xảy ra, vui lòng thử lại')
    }
  }

  const handleDeleteCategory = async (categoryId) => {
    try {
      const result = await deleteCategory(categoryId)
      if (result) {
        await fetchCategories(page)
        console.log('Xoá thành công')
      } else {
        console.log('Xoá không thành công')
      }
    } catch (error) {
      console.error('Lỗi:', error)
      alert('Đã có lỗi xảy ra, vui lòng thử lại')
    }
  }

  return (
    <>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Quản lý danh mục sản phẩm
      </Typography>
      <Button
        variant='contained'
        color='primary'
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
        onClick={() => setModalType('add')}
      >
        Thêm danh mục
      </Button>
      <CategoryTable
        categories={categories}
        loading={Loading}
        handleOpenModal={handleOpenModal}
      />

      <React.Suspense fallback={<></>}>
        {modalType === 'add' && (
          <AddCategoryModal
            open
            onClose={handleCloseModal}
            onAdded={() => fetchCategories(page)}
          />
        )}
        {modalType === 'view' && selectedCategory && (
          <ViewCategoryModal
            open
            onClose={handleCloseModal}
            category={selectedCategory}
          />
        )}

        {modalType === 'edit' && selectedCategory && (
          <EditCategoryModal
            open
            onClose={handleCloseModal}
            category={selectedCategory}
            onSave={handleSaveCategory}
          />
        )}

        {modalType === 'delete' && selectedCategory && (
          <DeleteCategoryModal
            open
            onClose={handleCloseModal}
            category={selectedCategory}
            onDelete={handleDeleteCategory}
          />
        )}
      </React.Suspense>

      <CategoryPagination
        page={page}
        totalPages={totalPages}
        onPageChange={handleChangePage}
      />
    </>
  )
}

export default CategoryManagement
