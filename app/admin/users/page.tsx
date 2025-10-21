import { Button } from "@/components/ui/button"
import { getAllUsers } from "@/lib/actions/admin"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { AddUserDialog } from "@/components/admin/add-user-dialog"

export default async function UsersPage() {
  const { users } = await getAllUsers()

  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">{users.length} total users</p>
        </div>
        <AddUserDialog />
      </div>

      {/* Users Table */}
      <Card className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Rizz Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Streak</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Sessions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.map((user: any) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{user.full_name || "No name"}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-purple-400 font-bold">{user.rizz_score}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{user.level}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-yellow-400">{user.current_streak}🔥</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400">{user.session_count}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400">{new Date(user.created_at).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/users/${user.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-500/20 hover:bg-purple-500/10 bg-transparent"
                      >
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
