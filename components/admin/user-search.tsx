"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { searchUsers } from "@/lib/actions/admin"
import Link from "next/link"

export function UserSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function handleSearch() {
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)
    const result = await searchUsers(query)
    setResults(result.users || [])
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <Card className="glass-card p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search users by email, name, or ID..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <Button onClick={handleSearch} disabled={loading} className="bg-purple-600 hover:bg-purple-700">
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </Card>

      {searched && (
        <Card className="glass-card p-4">
          {results.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No users found</p>
          ) : (
            <div className="space-y-2">
              {results.map((user) => (
                <Link key={user.id} href={`/admin/users/${user.id}`}>
                  <div className="p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{user.full_name || "No name"}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-purple-400 font-bold">{user.rizz_score} Rizz</p>
                        <p className="text-sm text-gray-400">{user.level}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
