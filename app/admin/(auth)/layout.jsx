import SidebarAdmin from '../../components/admin/SideBarAdmin'
import TopbarAdmin from '../../components/admin/TopBarAdmin'

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex flex-col flex-1 h-full ">
        <TopbarAdmin />
        <main className="p-6 overflow-y-scroll flex-1">{children}</main>
      </div>
    </div>
  )
}