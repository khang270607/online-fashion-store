import React, { useState, useEffect } from 'react'
import useProfile from '~/hook/useUserProfile'
import EditProfileModal from './modal/EditProfileModal.jsx'

export default function ProfilePage() {
  const { profile, fetchProfile } = useProfile()
  const [openEdit, setOpenEdit] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])
  if (!profile) {
    return <div>Không có dữ liệu </div>
  }
  return (
    <div>
      <h1>Hồ sơ người dùng</h1>
      {profile && (
        <div>
          <img src={profile.avatarUrl} alt='avatar' width={100} />
          <p>Tên: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <button onClick={() => setOpenEdit(true)}>Chỉnh sửa hồ sơ</button>
        </div>
      )}

      <EditProfileModal
        open={openEdit}
        onClose={() => {
          setOpenEdit(false)
          fetchProfile()
        }}
        profile={profile}
      />
    </div>
  )
}
