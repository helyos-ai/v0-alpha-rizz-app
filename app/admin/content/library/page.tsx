import { rizzLibrary, categories } from "@/lib/data/rizz-library"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Plus } from "lucide-react"
import Link from "next/link"

export default function LibraryManagementPage() {
  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/content">
            <Button variant="outline" size="sm" className="border-purple-500/20 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Rizz Library</h1>
            <p className="text-gray-400">
              {rizzLibrary.length} tips across {categories.length - 1} categories
            </p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Tip
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant="outline"
            size="sm"
            className="border-purple-500/20 whitespace-nowrap bg-transparent"
          >
            {cat.icon} {cat.label}
          </Button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rizzLibrary.map((tip) => (
          <Card key={tip.id} className="glass-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-purple-500/20">
                    {tip.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      tip.difficulty === "beginner"
                        ? "border-green-500/20 text-green-400"
                        : tip.difficulty === "intermediate"
                          ? "border-yellow-500/20 text-yellow-400"
                          : "border-red-500/20 text-red-400"
                    }
                  >
                    {tip.difficulty}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-400">{tip.content}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="glass-card p-6 bg-yellow-500/10 border-yellow-500/20">
        <p className="text-sm text-yellow-400">
          <strong>Note:</strong> Library tips are currently stored as static data. To enable full CRUD operations, they
          would need to be moved to the database.
        </p>
      </Card>
    </div>
  )
}
