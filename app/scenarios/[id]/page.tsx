import { getScenarioById } from "@/lib/data/scenarios"
import { GorizzlaCoach } from "@/components/gorizzla-coach"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function ScenarioDetailPage({ params }: { params: { id: string } }) {
  const scenario = getScenarioById(params.id)

  if (!scenario) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/scenarios">
          <Button variant="ghost" className="mb-6 text-zinc-400 hover:text-white">
            ← Back to Scenarios
          </Button>
        </Link>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{scenario.icon}</div>
          <h1 className="text-4xl font-bold mb-2 text-white">{scenario.title}</h1>
          <p className="text-zinc-400 mb-4">{scenario.description}</p>
          <span
            className={`inline-block text-xs px-3 py-1 rounded ${
              scenario.difficulty === "beginner"
                ? "bg-green-500/20 text-green-500"
                : scenario.difficulty === "intermediate"
                  ? "bg-yellow-500/20 text-yellow-500"
                  : "bg-red-500/20 text-red-500"
            }`}
          >
            {scenario.difficulty.toUpperCase()}
          </span>
        </div>

        <Card className="bg-zinc-900 border-zinc-800 p-6 mb-8">
          <h3 className="font-bold text-white mb-3">Scenario Context:</h3>
          <p className="text-zinc-300">{scenario.context}</p>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <GorizzlaCoach mode="scenario" scenarioPrompt={scenario.systemPrompt} />
        </Card>
      </div>
    </div>
  )
}
