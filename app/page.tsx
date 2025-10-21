import { GorizzlaCoach } from "@/components/gorizzla-coach"
import { getTodaysCommandment } from "@/lib/data/commandments"
import { getDailyTip } from "@/lib/data/rizz-library"
import { Card } from "@/components/ui/card"

export default function Home() {
  const todaysCommandment = getTodaysCommandment()
  const dailyTip = getDailyTip()

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24 page-enter noise-texture">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="gradient-border card-hover">
          <Card className="gradient-border-content bg-gradient-to-br from-purple-600/20 to-purple-900/20 p-6">
            <div className="flex items-start gap-4">
              <span className="text-4xl">{todaysCommandment.icon}</span>
              <div>
                <h3 className="text-sm text-yellow-400 font-semibold mb-1">Today's Commandment</h3>
                <h2 className="text-xl font-bold mb-2">{todaysCommandment.title}</h2>
                <p className="text-gray-300 text-sm">{todaysCommandment.description}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Gorizzla Coach */}
        <GorizzlaCoach />

        <Card className="glass-card card-hover p-6">
          <h3 className="text-sm text-yellow-400 font-semibold mb-2">Daily Rizz Tip</h3>
          <h4 className="font-bold mb-2">{dailyTip.title}</h4>
          <p className="text-gray-300 text-sm">{dailyTip.content}</p>
        </Card>
      </div>
    </div>
  )
}
