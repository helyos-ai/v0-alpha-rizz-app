import type { ReactNode } from "react"
import Link from "next/link"
import { Home, Users, BarChart3, FileText, Database, Headphones } from "lucide-react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black">
      {/* Admin Header */}
      <header className="border-b border-purple-500/20 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                <span className="text-xl">👑</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Gorizzla Admin</h1>
                <p className="text-xs text-gray-400">Alpha Rizz Coach Dashboard</p>
              </div>
            </div>
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to App
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-purple-500/20 bg-black/30 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-2">
            <NavLink href="/admin" icon={<BarChart3 className="w-5 h-5" />}>
              Dashboard
            </NavLink>
            <NavLink href="/admin/users" icon={<Users className="w-5 h-5" />}>
              User Management
            </NavLink>
            <NavLink href="/admin/analytics" icon={<BarChart3 className="w-5 h-5" />}>
              Analytics
            </NavLink>
            <NavLink href="/admin/content" icon={<FileText className="w-5 h-5" />}>
              Content Management
            </NavLink>
            <NavLink href="/admin/database" icon={<Database className="w-5 h-5" />}>
              Database Tools
            </NavLink>
            <NavLink href="/admin/support" icon={<Headphones className="w-5 h-5" />}>
              Support Tools
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}

function NavLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-purple-500/10 transition-all group"
    >
      <span className="group-hover:text-purple-400 transition-colors">{icon}</span>
      <span className="text-sm font-medium">{children}</span>
    </Link>
  )
}
