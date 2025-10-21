import { scenarios } from "@/lib/data/scenarios"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ScenariosPage() {
  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Practice Scenarios
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Build confidence through realistic practice. Master different social situations with Gorizzla.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="bg-zinc-900 border-zinc-800 p-6 flex flex-col">
              <div className="text-5xl mb-4">{scenario.icon}</div>

              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-white flex-1">{scenario.title}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    scenario.difficulty === "beginner"
                      ? "bg-green-500/20 text-green-500"
                      : scenario.difficulty === "intermediate"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {scenario.difficulty}
                </span>
              </div>

              <p className="text-sm text-zinc-400 mb-4 flex-1">{scenario.description}</p>

              <div className="bg-zinc-800 rounded p-3 mb-4">
                <p className="text-xs text-zinc-300">{scenario.context}</p>
              </div>

              <Link href={`/scenarios/${scenario.id}`}>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 font-bold">Start Practice</Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
