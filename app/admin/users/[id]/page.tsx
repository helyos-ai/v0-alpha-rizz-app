import { getUserDetails } from "@/lib/actions/admin"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Target, Flame, TrendingUp } from "lucide-react"
import Link from "next/link"

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const { profile, sessions, achievements, goals, commandments } = await getUserDetails(params.id)

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">User not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center gap-4">
        <Link href="/admin/users">
          <Button variant="outline" size="sm" className="border-purple-500/20 bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">{profile.full_name || "No Name"}</h1>
          <p className="text-gray-400">{profile.email}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={<TrendingUp />} label="Rizz Score" value={profile.rizz_score} color="purple" />
        <StatCard icon={<Trophy />} label="Level" value={profile.level} color="yellow" />
        <StatCard icon={<Flame />} label="Current Streak" value={`${profile.current_streak} days`} color="orange" />
        <StatCard icon={<Target />} label="Total XP" value={profile.total_xp} color="blue" />
      </div>

      {/* Recent Sessions */}
      <Card className="glass-card p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Sessions</h2>
        <div className="space-y-3">
          {sessions?.length > 0 ? (
            sessions.map((session: any) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">{session.mode}</p>
                  <p className="text-sm text-gray-400">{session.duration_minutes} minutes</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-400">+{session.xp_earned} XP</p>
                  <p className="text-xs text-gray-400">{new Date(session.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-4">No sessions yet</p>
          )}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="glass-card p-6">
        <h2 className="text-xl font-bold text-white mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {achievements?.length > 0 ? (
            achievements.map((achievement: any) => (
              <div key={achievement.id} className="p-3 bg-white/5 rounded-lg text-center">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="text-sm text-white font-medium">{achievement.title}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-4 text-center py-4">No achievements yet</p>
          )}
        </div>
      </Card>

      {/* Goals */}
      <Card className="glass-card p-6">
        <h2 className="text-xl font-bold text-white mb-4">Active Goals</h2>
        <div className="space-y-3">
          {goals?.length > 0 ? (
            goals.map((goal: any) => (
              <div key={goal.id} className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-medium">{goal.title}</p>
                  <Badge variant={goal.completed ? "default" : "outline"}>
                    {goal.completed ? "Completed" : "In Progress"}
                  </Badge>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full"
                    style={{ width: `${(goal.current_value / goal.target_value) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {goal.current_value} / {goal.target_value}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-4">No goals set</p>
          )}
        </div>
      </Card>
    </div>
  )
}

function StatCard({ icon, label, value, color }: any) {
  const colorClasses = {
    purple: "from-purple-600 to-purple-800",
    yellow: "from-yellow-600 to-yellow-800",
    orange: "from-orange-600 to-orange-800",
    blue: "from-blue-600 to-blue-800",
  }

  return (
    <Card className="glass-card p-4">
      <div
        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-3`}
      >
        {icon}
      </div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </Card>
  )
}
