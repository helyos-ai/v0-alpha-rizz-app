"use server"

import { sql } from "@/lib/neon/client"
import { revalidatePath } from "next/cache"

export interface UserProfile {
  id: string
  user_id: string
  rizz_score: number
  level: number
  current_streak: number
  longest_streak: number
  total_sessions: number
  total_minutes: number
  last_session_date: string | null
  created_at: string
  updated_at: string
}

export async function getOrCreateProfile(userId: string): Promise<UserProfile> {
  try {
    // Try to get existing profile
    const profiles = await sql`
      SELECT * FROM profiles WHERE user_id = ${userId}
    `

    if (profiles.length > 0) {
      return profiles[0] as UserProfile
    }

    // Create new profile
    const newProfiles = await sql`
      INSERT INTO profiles (user_id, rizz_score, level, current_streak, longest_streak, total_sessions, total_minutes)
      VALUES (${userId}, 0, 1, 0, 0, 0, 0)
      RETURNING *
    `

    return newProfiles[0] as UserProfile
  } catch (error) {
    console.error("[v0] Error getting/creating profile:", error)
    throw error
  }
}

export async function updateRizzScore(userId: string, scoreChange: number) {
  try {
    await sql`
      UPDATE profiles 
      SET rizz_score = rizz_score + ${scoreChange},
          updated_at = NOW()
      WHERE user_id = ${userId}
    `

    // Check for level up
    const profile = await getOrCreateProfile(userId)
    const newLevel = await calculateLevel(profile.rizz_score)

    if (newLevel > profile.level) {
      await sql`
        UPDATE profiles 
        SET level = ${newLevel}
        WHERE user_id = ${userId}
      `
    }

    revalidatePath("/profile")
  } catch (error) {
    console.error("[v0] Error updating rizz score:", error)
    throw error
  }
}

export async function updateStreak(userId: string) {
  try {
    const profile = await getOrCreateProfile(userId)
    const lastSession = profile.last_session_date ? new Date(profile.last_session_date) : null
    const now = new Date()

    let newStreak = profile.current_streak

    if (!lastSession) {
      newStreak = 1
    } else {
      const daysSinceLastSession = Math.floor((now.getTime() - lastSession.getTime()) / (1000 * 60 * 60 * 24))

      if (daysSinceLastSession === 1) {
        newStreak = profile.current_streak + 1
      } else if (daysSinceLastSession > 1) {
        newStreak = 1
      }
    }

    const longestStreak = Math.max(newStreak, profile.longest_streak)

    await sql`
      UPDATE profiles 
      SET current_streak = ${newStreak},
          longest_streak = ${longestStreak},
          last_session_date = NOW(),
          updated_at = NOW()
      WHERE user_id = ${userId}
    `

    revalidatePath("/profile")
  } catch (error) {
    console.error("[v0] Error updating streak:", error)
    throw error
  }
}

async function calculateLevel(rizzScore: number): Promise<number> {
  if (rizzScore < 100) return 1 // Beginner
  if (rizzScore < 500) return 2 // Intermediate
  if (rizzScore < 1000) return 3 // Advanced
  if (rizzScore < 2500) return 4 // Alpha
  if (rizzScore < 5000) return 5 // Legend
  return 6 // Rizz God
}

export async function getLevelName(level: number): Promise<string> {
  const levels = ["Beginner", "Intermediate", "Advanced", "Alpha", "Legend", "Rizz God"]
  return levels[level - 1] || "Beginner"
}
