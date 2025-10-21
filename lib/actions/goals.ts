"use server"

import { sql } from "@/lib/neon/client"
import { revalidatePath } from "next/cache"

export interface Goal {
  id: string
  user_id: string
  title: string
  description: string
  target_date: string
  completed: boolean
  created_at: string
}

export async function createGoal(userId: string, title: string, description: string, targetDate: string) {
  try {
    const goals = await sql`
      INSERT INTO goals (user_id, title, description, target_date)
      VALUES (${userId}, ${title}, ${description}, ${targetDate})
      RETURNING *
    `

    revalidatePath("/profile")
    return goals[0] as Goal
  } catch (error) {
    console.error("[v0] Error creating goal:", error)
    throw error
  }
}

export async function getGoals(userId: string): Promise<Goal[]> {
  try {
    const goals = await sql`
      SELECT * FROM goals 
      WHERE user_id = ${userId}
      ORDER BY completed ASC, target_date ASC
    `

    return goals as Goal[]
  } catch (error) {
    console.error("[v0] Error getting goals:", error)
    return []
  }
}

export async function toggleGoalComplete(goalId: string, userId: string) {
  try {
    await sql`
      UPDATE goals 
      SET completed = NOT completed,
          updated_at = NOW()
      WHERE id = ${goalId} AND user_id = ${userId}
    `

    revalidatePath("/profile")
  } catch (error) {
    console.error("[v0] Error toggling goal:", error)
    throw error
  }
}

export async function deleteGoal(goalId: string, userId: string) {
  try {
    await sql`
      DELETE FROM goals 
      WHERE id = ${goalId} AND user_id = ${userId}
    `

    revalidatePath("/profile")
  } catch (error) {
    console.error("[v0] Error deleting goal:", error)
    throw error
  }
}
