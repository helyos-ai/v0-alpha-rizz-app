import { neon } from "@neondatabase/serverless"

const connectionString = process.env.NEON_POSTGRES_URL || process.env.NEON_DATABASE_URL

if (!connectionString) {
  throw new Error("NEON_POSTGRES_URL or DATABASE_URL environment variable is not set")
}

export const sql = neon(connectionString)
