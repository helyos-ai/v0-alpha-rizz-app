"use server"

import { sql } from "@/lib/neon/client"

export async function runDatabaseSetup() {
  try {
    // Create profiles table
    await sql`
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        full_name TEXT,
        avatar_url TEXT,
        rizz_score INTEGER DEFAULT 0,
        level TEXT DEFAULT 'Zero Rizz',
        current_streak INTEGER DEFAULT 0,
        longest_streak INTEGER DEFAULT 0,
        last_check_in TIMESTAMP WITH TIME ZONE,
        total_sessions INTEGER DEFAULT 0,
        total_minutes INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `

    // Create sessions table
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
        mode TEXT NOT NULL,
        duration INTEGER NOT NULL,
        topics TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `

    // Create achievements table
    await sql`
      CREATE TABLE IF NOT EXISTS achievements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
        badge_id TEXT NOT NULL,
        badge_name TEXT NOT NULL,
        badge_description TEXT,
        earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `

    // Create goals table
    await sql`
      CREATE TABLE IF NOT EXISTS goals (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
        goal_text TEXT NOT NULL,
        target_date DATE,
        completed BOOLEAN DEFAULT FALSE,
        completed_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `

    // Create commandments_progress table
    await sql`
      CREATE TABLE IF NOT EXISTS commandments_progress (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
        commandment_id INTEGER NOT NULL,
        completion_percentage INTEGER DEFAULT 0,
        last_practiced TIMESTAMP WITH TIME ZONE,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id, commandment_id)
      )
    `

    // Create quiz_results table
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_results (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
        personality_type TEXT,
        confidence_level INTEGER,
        main_goals TEXT[],
        experience_level TEXT,
        initial_rizz_score INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at DESC)`
    await sql`CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON achievements(user_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_goals_user_id ON goals(user_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_commandments_progress_user_id ON commandments_progress(user_id)`

    return { success: true, message: "All database tables created successfully!" }
  } catch (error) {
    console.error("[v0] Database setup error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create database tables",
    }
  }
}

export async function checkDatabaseStatus() {
  try {
    // Check if tables exist
    const result = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('profiles', 'sessions', 'achievements', 'goals', 'commandments_progress', 'quiz_results')
    `

    return {
      success: true,
      tables: result.map((r: any) => r.table_name),
      allTablesExist: result.length === 6,
    }
  } catch (error) {
    console.error("[v0] Database check error:", error)
    return { success: false, tables: [], allTablesExist: false }
  }
}

export async function createTestProfile() {
  try {
    const result = await sql`
      INSERT INTO profiles (email, full_name, rizz_score, level)
      VALUES ('test@alpharizz.com', 'Test Alpha', 100, 'Alpha')
      RETURNING *
    `

    return { success: true, profile: result[0] }
  } catch (error) {
    console.error("[v0] Test profile creation error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create test profile",
    }
  }
}
