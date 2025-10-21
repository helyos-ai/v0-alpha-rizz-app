import { getAnalytics } from "@/lib/actions/admin"
import { Card } from "@/components/ui/card"
import { Users, Activity, Trophy, TrendingUp } from "lucide-react"

export default async function AdminDashboard() {
  const analytics = await getAnalytics()

  if (!analytics.success) {
    return <div className="text-red-400">Failed to load analytics</div>
  }

  const { stats, topUsers, sessionsByMode } = analytics

  return (
    <div className="space-y-8 page-enter">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Overview of Gorizzla Rizz Coach performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users />} label="Total Users" value={stats.totalUsers} color="purple" />
        <StatCard icon={<Activity />} label="Active Users (7d)" value={stats.activeUsers} color="green" />
        <StatCard icon={<Trophy />} label="Avg Rizz Score" value={stats.avgRizzScore} color="yellow" />
        <StatCard icon={<TrendingUp />} label="Avg Streak" value={stats.avgStreak} color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Users */}
        <Card className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-4">Top 10 Users by Rizz Score</h2>
          <div className="space-y-3">
            {topUsers.map((user: any, index: number) => (
              <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "👤"}
                  </span>
                  <div>
                    <p className="text-white font-medium">{user.full_name || user.email}</p>
                    <p className="text-xs text-gray-400">Level: {user.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-purple-400 font-bold">{user.rizz_score}</p>
                  <p className="text-xs text-gray-400">{user.current_streak}🔥</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Sessions by Mode */}
        <Card className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-4">Popular Coaching Modes</h2>
          <div className="space-y-3">
            {sessionsByMode.map((mode: any) => (
              <div key={mode.mode} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white capitalize">{mode.mode}</span>
                  <span className="text-gray-400">{mode.count} sessions</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                    style={{ width: `${(mode.count / sessionsByMode[0].count) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }: any) {
  const colorClasses = {
    purple: "from-purple-600 to-purple-800",
    green: "from-green-600 to-green-800",
    yellow: "from-yellow-600 to-yellow-800",
    blue: "from-blue-600 to-blue-800",
  }

  return (
    <Card className="glass-card p-6 card-hover">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </Card>
  )
}
