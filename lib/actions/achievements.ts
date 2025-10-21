"use server"

import { sql } from "@/lib/neon/client"
import { getOrCreateProfile } from "./profile"
import { revalidatePath } from "next/cache"

export interface Achievement {
  id: string
  user_id: string
  achievement_id: string
  earned_date: string
}

export const ACHIEVEMENTS = [
  { id: "first_session", name: "First Steps", description: "Complete your first coaching session", icon: "🎯" },
  { id: "week_streak", name: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥" },
  { id: "month_streak", name: "Month Master", description: "Maintain a 30-day streak", icon: "💪" },
  { id: "alpha_level", name: "Alpha Status", description: "Reach Alpha level (Level 4)", icon: "👑" },
  { id: "legend_level", name: "Legend Status", description: "Reach Legend level (Level 5)", icon: "⭐" },
  { id: "rizz_god", name: "Rizz God", description: "Reach Rizz God level (Level 6)", icon: "🦍" },
  { id: "commandments_master", name: "Commandments Master", description: "Complete all 10 commandments", icon: "📜" },
  { id: "scenario_pro", name: "Scenario Pro", description: "Complete all 7 practice scenarios", icon: "🎭" },
  { id: "goal_crusher", name: "Goal Crusher", description: "Complete 10 weekly goals", icon: "🎖️" },
  { id: "library_scholar", name: "Library Scholar", description: "Read all tips in the Rizz Library", icon: "📚" },
]

export async function checkAndAwardAchievements(userId: string) {
  try {
    const profile = await getOrCreateProfile(userId)
    const earnedAchievements = await getEarnedAchievements(userId)
    const earnedIds = earnedAchievements.map((a) => a.achievement_id)

    // Check for new achievements
    const newAchievements: string[] = []

    // First session
    if (!earnedIds.includes("first_session") && profile.total_sessions >= 1) {
      newAchievements.push("first_session")
    }

    // Streaks
    if (!earnedIds.includes("week_streak") && profile.current_streak >= 7) {
      newAchievements.push("week_streak")
    }
    if (!earnedIds.includes("month_streak") && profile.current_streak >= 30) {
      newAchievements.push("month_streak")
    }

    // Levels
    if (!earnedIds.includes("alpha_level") && profile.level >= 4) {
      newAchievements.push("alpha_level")
    }
    if (!earnedIds.includes("legend_level") && profile.level >= 5) {
      newAchievements.push("legend_level")
    }
    if (!earnedIds.includes("rizz_god") && profile.level >= 6) {
      newAchievements.push("rizz_god")
    }

    // Award new achievements
    for (const achievementId of newAchievements) {
      await sql`
        INSERT INTO achievements (user_id, achievement_id)
        VALUES (${userId}, ${achievementId})
      `
    }

    if (newAchievements.length > 0) {
      revalidatePath("/profile")
    }

    return newAchievements
  } catch (error) {
    console.error("[v0] Error checking achievements:", error)
    return []
  }
}

export async function getEarnedAchievements(userId: string): Promise<Achievement[]> {
  try {
    const achievements = await sql`
      SELECT * FROM achievements 
      WHERE user_id = ${userId}
      ORDER BY earned_date DESC
    `

    return achievements as Achievement[]
  } catch (error) {
    console.error("[v0] Error getting achievements:", error)
    return []
  }
}
