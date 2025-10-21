"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Check, Trash2 } from "lucide-react"
import { createGoal, getGoals, toggleGoalComplete, deleteGoal, type Goal } from "@/lib/actions/goals"
import { triggerHaptic, triggerSuccessHaptic } from "@/lib/utils/haptics"

export function GoalsManager({ userId }: { userId: string }) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [targetDate, setTargetDate] = useState("")

  useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = async () => {
    const data = await getGoals(userId)
    setGoals(data)
  }

  const handleCreate = async () => {
    if (!title || !targetDate) return

    triggerHaptic("medium")
    await createGoal(userId, title, description, targetDate)
    setTitle("")
    setDescription("")
    setTargetDate("")
    setShowForm(false)
    loadGoals()
    triggerSuccessHaptic()
  }

  const handleToggle = async (goalId: string) => {
    triggerHaptic("light")
    await toggleGoalComplete(goalId, userId)
    loadGoals()
  }

  const handleDelete = async (goalId: string) => {
    triggerHaptic("heavy")
    await deleteGoal(goalId, userId)
    loadGoals()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Weekly Goals</h3>
        <Button
          onClick={() => {
            triggerHaptic("light")
            setShowForm(!showForm)
          }}
          size="sm"
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Goal
        </Button>
      </div>

      {showForm && (
        <Card className="p-4 bg-purple-900/20 border-purple-500/30 space-y-3">
          <Input
            placeholder="Goal title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-black/50 border-purple-500/30 text-white"
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-black/50 border-purple-500/30 text-white"
          />
          <Input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="bg-black/50 border-purple-500/30 text-white"
          />
          <div className="flex gap-2">
            <Button onClick={handleCreate} className="flex-1 bg-purple-600 hover:bg-purple-700">
              Create Goal
            </Button>
            <Button onClick={() => setShowForm(false)} variant="outline" className="border-purple-500/30">
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-2">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            className={`p-4 border-purple-500/30 ${goal.completed ? "bg-green-900/20" : "bg-purple-900/20"}`}
          >
            <div className="flex items-start gap-3">
              <Button
                onClick={() => handleToggle(goal.id)}
                size="icon"
                variant="ghost"
                className={`mt-1 ${goal.completed ? "text-green-400" : "text-gray-400"}`}
              >
                <Check className="w-5 h-5" />
              </Button>

              <div className="flex-1">
                <h4 className={`font-semibold ${goal.completed ? "line-through text-gray-500" : "text-white"}`}>
                  {goal.title}
                </h4>
                {goal.description && <p className="text-sm text-gray-400 mt-1">{goal.description}</p>}
                <p className="text-xs text-gray-500 mt-2">Target: {new Date(goal.target_date).toLocaleDateString()}</p>
              </div>

              <Button
                onClick={() => handleDelete(goal.id)}
                size="icon"
                variant="ghost"
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
