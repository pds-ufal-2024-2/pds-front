import React from 'react'
import SidebarAdmin from '../components/admin/SideBarAdmin'
import TopbarAdmin from '../components/admin/TopBarAdmin'

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex flex-col flex-1">
        <TopbarAdmin />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
