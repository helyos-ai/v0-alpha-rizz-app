"use server"

import { sql } from "@/lib/neon/client"
import { revalidatePath } from "next/cache"

export interface CommandmentProgress {
  id: string
  user_id: string
  commandment_id: number
  completed: boolean
  notes: string | null
  completed_date: string | null
}

export async function getCommandmentProgress(userId: string): Promise<CommandmentProgress[]> {
  try {
    const progress = await sql`
      SELECT * FROM commandments_progress 
      WHERE user_id = ${userId}
      ORDER BY commandment_id ASC
    `

    return progress as CommandmentProgress[]
  } catch (error) {
    console.error("[v0] Error getting commandment progress:", error)
    return []
  }
}

export async function toggleCommandmentComplete(userId: string, commandmentId: number, notes?: string) {
  try {
    // Check if progress exists
    const existing = await sql`
      SELECT * FROM commandments_progress 
      WHERE user_id = ${userId} AND commandment_id = ${commandmentId}
    `

    if (existing.length > 0) {
      // Toggle existing
      await sql`
        UPDATE commandments_progress 
        SET completed = NOT completed,
            completed_date = CASE WHEN completed THEN NULL ELSE NOW() END,
            notes = ${notes || null},
            updated_at = NOW()
        WHERE user_id = ${userId} AND commandment_id = ${commandmentId}
      `
    } else {
      // Create new
      await sql`
        INSERT INTO commandments_progress (user_id, commandment_id, completed, notes, completed_date)
        VALUES (${userId}, ${commandmentId}, true, ${notes || null}, NOW())
      `
    }

    revalidatePath("/commandments")
  } catch (error) {
    console.error("[v0] Error toggling commandment:", error)
    throw error
  }
}
