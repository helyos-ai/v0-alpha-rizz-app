import { commandments } from "@/lib/data/commandments"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function CommandmentsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            The 10 Rizz Commandments
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Master these principles to transform into the ultimate Rizzler Supreme
          </p>
        </div>

        <div className="space-y-6">
          {commandments.map((commandment) => (
            <Card key={commandment.id} className="bg-zinc-900 border-zinc-800 p-6">
              <div className="flex items-start gap-4">
                <div className="text-5xl">{commandment.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-orange-500 font-bold text-sm">COMMANDMENT {commandment.id}</span>
                      <h3 className="text-2xl font-bold text-white mt-1">{commandment.title}</h3>
                    </div>
                  </div>

                  <p className="text-zinc-300 mb-4">{commandment.description}</p>

                  <div className="bg-zinc-800 rounded p-4 mb-4">
                    <h4 className="font-bold text-white mb-2">Today's Challenge:</h4>
                    <p className="text-sm text-zinc-300">{commandment.challenge}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-2">Action Tips:</h4>
                    <ul className="space-y-2">
                      {commandment.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-zinc-300">
                          <span className="text-orange-500 mt-0.5">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-zinc-400">Your Progress</span>
                      <span className="text-orange-500 font-bold">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
