import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, BookOpen, Target } from "lucide-react"
import Link from "next/link"

export default function ContentManagementPage() {
  return (
    <div className="space-y-8 page-enter">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Content Management</h1>
        <p className="text-gray-400">Manage commandments, library tips, and scenarios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ContentCard
          icon={<FileText className="w-8 h-8" />}
          title="10 Commandments"
          description="Edit commandments, challenges, and tips"
          count="10 commandments"
          href="/admin/content/commandments"
        />
        <ContentCard
          icon={<BookOpen className="w-8 h-8" />}
          title="Rizz Library"
          description="Manage tips across 5 categories"
          count="25+ tips"
          href="/admin/content/library"
        />
        <ContentCard
          icon={<Target className="w-8 h-8" />}
          title="Practice Scenarios"
          description="Create and edit practice scenarios"
          count="7 scenarios"
          href="/admin/content/scenarios"
        />
      </div>
    </div>
  )
}

function ContentCard({ icon, title, description, count, href }: any) {
  return (
    <Card className="glass-card p-6 card-hover">
      <div className="space-y-4">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-400 mb-2">{description}</p>
          <p className="text-xs text-purple-400">{count}</p>
        </div>
        <Link href={href}>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700">Manage</Button>
        </Link>
      </div>
    </Card>
  )
}
