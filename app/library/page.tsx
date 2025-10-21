"use client"

import { useState } from "react"
import { getRizzTipsByCategory, categories, searchTips } from "@/lib/data/rizz-library"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const tips = searchQuery
    ? searchTips(searchQuery)
    : selectedCategory === "all"
      ? getRizzTipsByCategory()
      : getRizzTipsByCategory(selectedCategory)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "intermediate":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Rizz <span className="text-[#FF6B35]">Library</span>
          </h1>
          <p className="text-gray-400 text-lg">Master the art of attraction with proven tips and techniques</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 h-12"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id)
                setSearchQuery("")
              }}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat.id ? "bg-[#FF6B35] text-white" : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {tips.map((tip) => (
            <Card
              key={tip.id}
              className="bg-zinc-900 border-zinc-800 p-6 hover:border-[#FF6B35]/50 transition-all hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white">{tip.title}</h3>
                <Badge className={getDifficultyColor(tip.difficulty)}>{tip.difficulty}</Badge>
              </div>
              <p className="text-gray-400 leading-relaxed">{tip.content}</p>
            </Card>
          ))}
        </div>

        {tips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tips found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
