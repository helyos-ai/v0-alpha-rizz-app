import { commandments } from "@/lib/data/commandments"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { EditCommandmentDialog } from "@/components/admin/edit-commandment-dialog"

export default function CommandmentsManagementPage() {
  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center gap-4">
        <Link href="/admin/content">
          <Button variant="outline" size="sm" className="border-purple-500/20 bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">10 Commandments</h1>
          <p className="text-gray-400">Manage the 10 Commandments of Rizz</p>
        </div>
      </div>

      <div className="space-y-4">
        {commandments.map((commandment) => (
          <Card key={commandment.id} className="glass-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-xl font-bold">
                    {commandment.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{commandment.title}</h3>
                    <p className="text-sm text-gray-400">{commandment.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{commandment.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-purple-400">Challenge:</p>
                  <p className="text-sm text-gray-400">{commandment.challenge}</p>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm font-medium text-purple-400">Tips:</p>
                  {commandment.tips.map((tip, idx) => (
                    <p key={idx} className="text-sm text-gray-400">
                      • {tip}
                    </p>
                  ))}
                </div>
              </div>
              <EditCommandmentDialog commandment={commandment} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="glass-card p-6 bg-purple-500/10 border-purple-500/20">
        <p className="text-sm text-purple-300">
          <strong>Database Migration Available:</strong> Run the content tables SQL script in the Database Tools section
          to enable full editing capabilities. Once migrated, all commandments can be edited through this interface.
        </p>
      </Card>
    </div>
  )
}
