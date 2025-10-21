"use server"

import { sql } from "@/lib/neon/client"
import { revalidatePath } from "next/cache"

// ============================================================================
// COMMANDMENTS CRUD
// ============================================================================

export async function getAllCommandments() {
  try {
    const result = await sql`
      SELECT * FROM commandments ORDER BY id ASC
    `
    return { success: true, data: result }
  } catch (error) {
    console.error("Error fetching commandments:", error)
    return { success: false, error: "Failed to fetch commandments" }
  }
}

export async function updateCommandment(
  id: number,
  data: {
    title?: string
    description?: string
    challenge?: string
    tips?: string[]
    icon?: string
  },
) {
  try {
    const updates: string[] = []
    const values: any[] = []
    let paramCount = 1

    if (data.title !== undefined) {
      updates.push(`title = $${paramCount++}`)
      values.push(data.title)
    }
    if (data.description !== undefined) {
      updates.push(`description = $${paramCount++}`)
      values.push(data.description)
    }
    if (data.challenge !== undefined) {
      updates.push(`challenge = $${paramCount++}`)
      values.push(data.challenge)
    }
    if (data.tips !== undefined) {
      updates.push(`tips = $${paramCount++}`)
      values.push(data.tips)
    }
    if (data.icon !== undefined) {
      updates.push(`icon = $${paramCount++}`)
      values.push(data.icon)
    }

    updates.push(`updated_at = NOW()`)
    values.push(id)

    await sql.query(`UPDATE commandments SET ${updates.join(", ")} WHERE id = $${paramCount}`, values)

    revalidatePath("/admin/content/commandments")
    revalidatePath("/commandments")
    return { success: true }
  } catch (error) {
    console.error("Error updating commandment:", error)
    return { success: false, error: "Failed to update commandment" }
  }
}

// ============================================================================
// LIBRARY TIPS CRUD
// ============================================================================

export async function getAllLibraryTips() {
  try {
    const result = await sql`
      SELECT * FROM library_tips ORDER BY category, difficulty
    `
    return { success: true, data: result }
  } catch (error) {
    console.error("Error fetching library tips:", error)
    return { success: false, error: "Failed to fetch library tips" }
  }
}

export async function createLibraryTip(data: {
  id: string
  title: string
  content: string
  category: string
  difficulty: string
}) {
  try {
    await sql`
      INSERT INTO library_tips (id, title, content, category, difficulty)
      VALUES (${data.id}, ${data.title}, ${data.content}, ${data.category}, ${data.difficulty})
    `
    revalidatePath("/admin/content/library")
    revalidatePath("/library")
    return { success: true }
  } catch (error) {
    console.error("Error creating library tip:", error)
    return { success: false, error: "Failed to create library tip" }
  }
}

export async function updateLibraryTip(
  id: string,
  data: {
    title?: string
    content?: string
    category?: string
    difficulty?: string
  },
) {
  try {
    const updates: string[] = []
    const values: any[] = []
    let paramCount = 1

    if (data.title !== undefined) {
      updates.push(`title = $${paramCount++}`)
      values.push(data.title)
    }
    if (data.content !== undefined) {
      updates.push(`content = $${paramCount++}`)
      values.push(data.content)
    }
    if (data.category !== undefined) {
      updates.push(`category = $${paramCount++}`)
      values.push(data.category)
    }
    if (data.difficulty !== undefined) {
      updates.push(`difficulty = $${paramCount++}`)
      values.push(data.difficulty)
    }

    updates.push(`updated_at = NOW()`)
    values.push(id)

    await sql.query(`UPDATE library_tips SET ${updates.join(", ")} WHERE id = $${paramCount}`, values)

    revalidatePath("/admin/content/library")
    revalidatePath("/library")
    return { success: true }
  } catch (error) {
    console.error("Error updating library tip:", error)
    return { success: false, error: "Failed to update library tip" }
  }
}

export async function deleteLibraryTip(id: string) {
  try {
    await sql`DELETE FROM library_tips WHERE id = ${id}`
    revalidatePath("/admin/content/library")
    revalidatePath("/library")
    return { success: true }
  } catch (error) {
    console.error("Error deleting library tip:", error)
    return { success: false, error: "Failed to delete library tip" }
  }
}

// ============================================================================
// SCENARIOS CRUD
// ============================================================================

export async function getAllScenarios() {
  try {
    const result = await sql`
      SELECT * FROM practice_scenarios ORDER BY difficulty, title
    `
    return { success: true, data: result }
  } catch (error) {
    console.error("Error fetching scenarios:", error)
    return { success: false, error: "Failed to fetch scenarios" }
  }
}

export async function createScenario(data: {
  id: string
  title: string
  description: string
  difficulty: string
  context: string
  system_prompt: string
  icon: string
  tips: string[]
}) {
  try {
    await sql`
      INSERT INTO practice_scenarios (id, title, description, difficulty, context, system_prompt, icon, tips)
      VALUES (${data.id}, ${data.title}, ${data.description}, ${data.difficulty}, ${data.context}, ${data.system_prompt}, ${data.icon}, ${data.tips})
    `
    revalidatePath("/admin/content/scenarios")
    revalidatePath("/scenarios")
    return { success: true }
  } catch (error) {
    console.error("Error creating scenario:", error)
    return { success: false, error: "Failed to create scenario" }
  }
}

export async function updateScenario(
  id: string,
  data: {
    title?: string
    description?: string
    difficulty?: string
    context?: string
    system_prompt?: string
    icon?: string
    tips?: string[]
  },
) {
  try {
    const updates: string[] = []
    const values: any[] = []
    let paramCount = 1

    if (data.title !== undefined) {
      updates.push(`title = $${paramCount++}`)
      values.push(data.title)
    }
    if (data.description !== undefined) {
      updates.push(`description = $${paramCount++}`)
      values.push(data.description)
    }
    if (data.difficulty !== undefined) {
      updates.push(`difficulty = $${paramCount++}`)
      values.push(data.difficulty)
    }
    if (data.context !== undefined) {
      updates.push(`context = $${paramCount++}`)
      values.push(data.context)
    }
    if (data.system_prompt !== undefined) {
      updates.push(`system_prompt = $${paramCount++}`)
      values.push(data.system_prompt)
    }
    if (data.icon !== undefined) {
      updates.push(`icon = $${paramCount++}`)
      values.push(data.icon)
    }
    if (data.tips !== undefined) {
      updates.push(`tips = $${paramCount++}`)
      values.push(data.tips)
    }

    updates.push(`updated_at = NOW()`)
    values.push(id)

    await sql.query(`UPDATE practice_scenarios SET ${updates.join(", ")} WHERE id = $${paramCount}`, values)

    revalidatePath("/admin/content/scenarios")
    revalidatePath("/scenarios")
    return { success: true }
  } catch (error) {
    console.error("Error updating scenario:", error)
    return { success: false, error: "Failed to update scenario" }
  }
}

export async function deleteScenario(id: string) {
  try {
    await sql`DELETE FROM practice_scenarios WHERE id = ${id}`
    revalidatePath("/admin/content/scenarios")
    revalidatePath("/scenarios")
    return { success: true }
  } catch (error) {
    console.error("Error deleting scenario:", error)
    return { success: false, error: "Failed to delete scenario" }
  }
}
