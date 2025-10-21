import { getAnalytics } from "@/lib/actions/admin"
import { Card } from "@/components/ui/card"
import { Activity, Clock, MessageSquare } from "lucide-react"

export default async function AnalyticsPage() {
  const analytics = await getAnalytics()

  if (!analytics.success) {
    return <div className="text-red-400">Failed to load analytics</div>
  }

  const { recentSessions } = analytics

  return (
    <div className="space-y-8 page-enter">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">Detailed insights and user activity</p>
      </div>

      {/* Recent Sessions */}
      <Card className="glass-card p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          Recent Coaching Sessions
        </h2>
        <div className="space-y-3">
          {recentSessions.map((session: any) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{session.full_name || session.email}</p>
                  <p className="text-sm text-gray-400 capitalize">{session.mode} mode</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {session.duration} min
                </p>
                <p className="text-xs text-gray-400">{new Date(session.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
