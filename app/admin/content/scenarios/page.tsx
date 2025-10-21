import { scenarios } from "@/lib/data/scenarios"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Plus } from "lucide-react"
import Link from "next/link"

export default function ScenariosManagementPage() {
  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/content">
            <Button variant="outline" size="sm" className="border-purple-500/20 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Practice Scenarios</h1>
            <p className="text-gray-400">{scenarios.length} scenarios available</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Scenario
        </Button>
      </div>

      <div className="space-y-4">
        {scenarios.map((scenario) => (
          <Card key={scenario.id} className="glass-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-4xl">{scenario.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{scenario.title}</h3>
                    <p className="text-sm text-gray-400">{scenario.description}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      scenario.difficulty === "beginner"
                        ? "border-green-500/20 text-green-400"
                        : scenario.difficulty === "intermediate"
                          ? "border-yellow-500/20 text-yellow-400"
                          : "border-red-500/20 text-red-400"
                    }
                  >
                    {scenario.difficulty}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-purple-400 mb-1">Context:</p>
                    <p className="text-sm text-gray-300">{scenario.context}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-purple-400 mb-1">System Prompt:</p>
                    <p className="text-sm text-gray-300 font-mono bg-white/5 p-2 rounded">{scenario.systemPrompt}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-purple-400 mb-1">Tips:</p>
                    <ul className="space-y-1">
                      {scenario.tips.map((tip, idx) => (
                        <li key={idx} className="text-sm text-gray-400">
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="border-purple-500/20 bg-transparent">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="glass-card p-6 bg-yellow-500/10 border-yellow-500/20">
        <p className="text-sm text-yellow-400">
          <strong>Note:</strong> Scenarios are currently stored as static data. To enable full CRUD operations, they
          would need to be moved to the database.
        </p>
      </Card>
    </div>
  )
}
