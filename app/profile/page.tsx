import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProfilePage() {
  // Mock data - will be replaced with real Supabase data
  const profile = {
    rizzScore: 0,
    level: "Beginner",
    currentStreak: 0,
    longestStreak: 0,
    totalMinutesUsed: 0,
    minutesRemaining: 0,
  }

  const recentSessions = []
  const achievements = []

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          Your Profile
        </h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <div className="text-4xl font-bold text-orange-500 mb-2">{profile.rizzScore}</div>
            <div className="text-sm text-zinc-400">Rizz Score</div>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <div className="text-4xl font-bold text-white mb-2">{profile.level}</div>
            <div className="text-sm text-zinc-400">Current Level</div>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <div className="text-4xl font-bold text-orange-500 mb-2">{profile.currentStreak}</div>
            <div className="text-sm text-zinc-400">Day Streak 🔥</div>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <div className="text-4xl font-bold text-white mb-2">{profile.minutesRemaining}</div>
            <div className="text-sm text-zinc-400">Minutes Left</div>
          </Card>
        </div>

        {/* Minutes & Purchase */}
        <Card className="bg-zinc-900 border-zinc-800 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Coaching Minutes</h3>
              <p className="text-zinc-400 mb-4">You have {profile.minutesRemaining} minutes remaining</p>
              <Progress value={(profile.minutesRemaining / 100) * 100} className="h-2 w-64" />
            </div>
            <Link href="/pricing">
              <Button className="bg-orange-500 hover:bg-orange-600 font-bold">Buy More Minutes</Button>
            </Link>
          </div>
        </Card>

        {/* Recent Sessions */}
        <Card className="bg-zinc-900 border-zinc-800 p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Recent Sessions</h3>
          {recentSessions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-zinc-400 mb-4">No sessions yet. Start your first coaching session!</p>
              <Link href="/">
                <Button className="bg-orange-500 hover:bg-orange-600">Start Session</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">{/* Sessions will be mapped here */}</div>
          )}
        </Card>

        {/* Achievements */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
          {achievements.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-zinc-400">Complete sessions to unlock achievements!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">{/* Achievements will be mapped here */}</div>
          )}
        </Card>
      </div>
    </div>
  )
}
