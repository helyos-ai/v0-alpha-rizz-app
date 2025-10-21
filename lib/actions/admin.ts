"use server"

import { sql } from "@/lib/neon/client"
import { revalidatePath } from "next/cache"

// Admin authentication
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "alpharizz2025"

export async function verifyAdminAccess(password: string) {
  return password === ADMIN_PASSWORD
}

// User Management
export async function getAllUsers() {
  try {
    const users = await sql`
      SELECT 
        p.*,
        COUNT(DISTINCT s.id) as session_count,
        COUNT(DISTINCT a.id) as achievement_count,
        COUNT(DISTINCT g.id) as goal_count
      FROM profiles p
      LEFT JOIN sessions s ON p.id = s.user_id
      LEFT JOIN achievements a ON p.id = a.user_id
      LEFT JOIN goals g ON p.id = g.user_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `
    return { success: true, users }
  } catch (error) {
    console.error("[v0] Error fetching users:", error)
    return { success: false, users: [] }
  }
}

export async function getUserDetails(userId: string) {
  try {
    const profile = await sql`SELECT * FROM profiles WHERE id = ${userId}`
    const sessions = await sql`SELECT * FROM sessions WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 10`
    const achievements = await sql`SELECT * FROM achievements WHERE user_id = ${userId} ORDER BY earned_at DESC`
    const goals = await sql`SELECT * FROM goals WHERE user_id = ${userId} ORDER BY created_at DESC`
    const commandments = await sql`SELECT * FROM commandments_progress WHERE user_id = ${userId}`

    return {
      success: true,
      profile: profile[0],
      sessions,
      achievements,
      goals,
      commandments,
    }
  } catch (error) {
    console.error("[v0] Error fetching user details:", error)
    return { success: false }
  }
}

export async function updateUserRizzScore(userId: string, newScore: number) {
  try {
    await sql`UPDATE profiles SET rizz_score = ${newScore}, updated_at = NOW() WHERE id = ${userId}`
    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error updating rizz score:", error)
    return { success: false }
  }
}

export async function resetUserStreak(userId: string) {
  try {
    await sql`UPDATE profiles SET current_streak = 0, updated_at = NOW() WHERE id = ${userId}`
    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error resetting streak:", error)
    return { success: false }
  }
}

export async function createUser(data: {
  email: string
  full_name?: string
  rizz_score?: number
  level?: string
}) {
  try {
    const result = await sql`
      INSERT INTO profiles (email, full_name, rizz_score, level)
      VALUES (
        ${data.email}, 
        ${data.full_name || null}, 
        ${data.rizz_score || 0}, 
        ${data.level || "Zero Rizz"}
      )
      RETURNING *
    `
    revalidatePath("/admin/users")
    return { success: true, user: result[0] }
  } catch (error) {
    console.error("[v0] Error creating user:", error)
    return { success: false, error: "Failed to create user" }
  }
}

export async function searchUsers(query: string) {
  try {
    const users = await sql`
      SELECT 
        p.*,
        COUNT(DISTINCT s.id) as session_count,
        COUNT(DISTINCT a.id) as achievement_count
      FROM profiles p
      LEFT JOIN sessions s ON p.id = s.user_id
      LEFT JOIN achievements a ON p.id = a.user_id
      WHERE 
        p.email ILIKE ${`%${query}%`} OR
        p.full_name ILIKE ${`%${query}%`} OR
        p.id::text ILIKE ${`%${query}%`}
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT 20
    `
    return { success: true, users }
  } catch (error) {
    console.error("[v0] Error searching users:", error)
    return { success: false, users: [] }
  }
}

// Analytics
export async function getAnalytics() {
  try {
    const totalUsers = await sql`SELECT COUNT(*) as count FROM profiles`
    const activeUsers = await sql`
      SELECT COUNT(*) as count FROM profiles 
      WHERE last_check_in > NOW() - INTERVAL '7 days'
    `
    const totalSessions = await sql`SELECT COUNT(*) as count FROM sessions`
    const avgRizzScore = await sql`SELECT AVG(rizz_score) as avg FROM profiles`
    const avgStreak = await sql`SELECT AVG(current_streak) as avg FROM profiles`

    const topUsers = await sql`
      SELECT id, email, full_name, rizz_score, level, current_streak 
      FROM profiles 
      ORDER BY rizz_score DESC 
      LIMIT 10
    `

    const sessionsByMode = await sql`
      SELECT mode, COUNT(*) as count 
      FROM sessions 
      GROUP BY mode 
      ORDER BY count DESC
    `

    const recentSessions = await sql`
      SELECT s.*, p.email, p.full_name
      FROM sessions s
      JOIN profiles p ON s.user_id = p.id
      ORDER BY s.created_at DESC
      LIMIT 20
    `

    return {
      success: true,
      stats: {
        totalUsers: totalUsers[0].count,
        activeUsers: activeUsers[0].count,
        totalSessions: totalSessions[0].count,
        avgRizzScore: Math.round(avgRizzScore[0].avg || 0),
        avgStreak: Math.round(avgStreak[0].avg || 0),
      },
      topUsers,
      sessionsByMode,
      recentSessions,
    }
  } catch (error) {
    console.error("[v0] Error fetching analytics:", error)
    return { success: false }
  }
}

// Content Management
export async function updateCommandment(id: number, updates: any) {
  // This would update a commandments table if we had one
  // For now, commandments are in static data
  return { success: true, message: "Commandments are currently static data" }
}

export async function deleteUser(userId: string) {
  try {
    await sql`DELETE FROM profiles WHERE id = ${userId}`
    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting user:", error)
    return { success: false }
  }
}

export async function generateReport(reportType: string) {
  try {
    let reportData: any = {}

    if (reportType === "user-growth") {
      const growth = await sql`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as new_users
        FROM profiles
        WHERE created_at > NOW() - INTERVAL '30 days'
        GROUP BY DATE(created_at)
        ORDER BY date DESC
      `
      reportData = { type: "User Growth (Last 30 Days)", data: growth }
    } else if (reportType === "engagement") {
      const engagement = await sql`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as sessions,
          AVG(duration) as avg_duration
        FROM sessions
        WHERE created_at > NOW() - INTERVAL '30 days'
        GROUP BY DATE(created_at)
        ORDER BY date DESC
      `
      reportData = { type: "Engagement Report (Last 30 Days)", data: engagement }
    } else if (reportType === "rizz-distribution") {
      const distribution = await sql`
        SELECT 
          level,
          COUNT(*) as user_count,
          AVG(rizz_score) as avg_score
        FROM profiles
        GROUP BY level
        ORDER BY avg_score DESC
      `
      reportData = { type: "Rizz Score Distribution", data: distribution }
    }

    return { success: true, report: reportData }
  } catch (error) {
    console.error("[v0] Error generating report:", error)
    return { success: false, error: "Failed to generate report" }
  }
}

// NOTE: Email functionality ("Compose Email" button) requires email service integration
// TODO: Add email service (Resend, SendGrid, etc.) to enable sending emails to users
// This would require:
// 1. Email service API key in environment variables
// 2. Email templates for different notification types
// 3. Server action to send emails via the service
