"use server"

import { sql } from "@/lib/neon/client"
import { updateRizzScore, updateStreak } from "./profile"
import { revalidatePath } from "next/cache"

export interface Session {
  id: string
  user_id: string
  duration_minutes: number
  coaching_mode: string
  topics_discussed: string[]
  confidence_rating: number
  created_at: string
}

export async function createSession(
  userId: string,
  durationMinutes: number,
  coachingMode: string,
  topicsDiscussed: string[] = [],
  confidenceRating = 5,
) {
  try {
    const sessions = await sql`
      INSERT INTO sessions (user_id, duration_minutes, coaching_mode, topics_discussed, confidence_rating)
      VALUES (${userId}, ${durationMinutes}, ${coachingMode}, ${JSON.stringify(topicsDiscussed)}, ${confidenceRating})
      RETURNING *
    `

    // Update profile stats
    await sql`
      UPDATE profiles 
      SET total_sessions = total_sessions + 1,
          total_minutes = total_minutes + ${durationMinutes},
          updated_at = NOW()
      WHERE user_id = ${userId}
    `

    // Update streak
    await updateStreak(userId)

    // Award XP based on duration
    const xpEarned = Math.floor(durationMinutes * 10)
    await updateRizzScore(userId, xpEarned)

    revalidatePath("/profile")

    return sessions[0] as Session
  } catch (error) {
    console.error("[v0] Error creating session:", error)
    throw error
  }
}

export async function getRecentSessions(userId: string, limit = 10): Promise<Session[]> {
  try {
    const sessions = await sql`
      SELECT * FROM sessions 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `

    return sessions as Session[]
  } catch (error) {
    console.error("[v0] Error getting sessions:", error)
    return []
  }
}
