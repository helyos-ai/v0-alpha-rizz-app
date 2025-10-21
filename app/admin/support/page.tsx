"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserSearch, Mail, FileText } from "lucide-react"
import { UserSearch as UserSearchComponent } from "@/components/admin/user-search"
import { useState } from "react"
import { generateReport } from "@/lib/actions/admin"
import { useToast } from "@/hooks/use-toast"

export default function SupportToolsPage() {
  const [generatingReport, setGeneratingReport] = useState(false)
  const { toast } = useToast()

  async function handleGenerateReport(reportType: string) {
    setGeneratingReport(true)
    const result = await generateReport(reportType)

    if (result.success) {
      toast({
        title: "Report Generated",
        description: `${result.report.type} has been generated successfully`,
      })
      // In a real app, this would download or display the report
      console.log("[v0] Report data:", result.report)
    } else {
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      })
    }

    setGeneratingReport(false)
  }

  return (
    <div className="space-y-8 page-enter">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Support Tools</h1>
        <p className="text-gray-400">Quick user lookup and support utilities</p>
      </div>

      <Card className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <UserSearch className="w-6 h-6 text-purple-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Quick User Lookup</h2>
            <p className="text-sm text-gray-400">Search for users by email, name, or ID for support tickets</p>
          </div>
        </div>

        <UserSearchComponent />
      </Card>

      {/* Common Support Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg font-bold text-white">Email Support</h3>
          </div>
          <p className="text-sm text-gray-400">Send support emails to users</p>
          <Button
            variant="outline"
            className="w-full border-yellow-500/20 hover:bg-yellow-500/10 bg-transparent"
            disabled
          >
            Compose Email
          </Button>
          <p className="text-xs text-yellow-400/60">⚠️ Requires email service integration (Resend, SendGrid, etc.)</p>
        </Card>

        <Card className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Generate Reports</h3>
          </div>
          <p className="text-sm text-gray-400">Generate analytics and engagement reports</p>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full border-purple-500/20 hover:bg-purple-500/10 bg-transparent"
              onClick={() => handleGenerateReport("user-growth")}
              disabled={generatingReport}
            >
              User Growth Report
            </Button>
            <Button
              variant="outline"
              className="w-full border-purple-500/20 hover:bg-purple-500/10 bg-transparent"
              onClick={() => handleGenerateReport("engagement")}
              disabled={generatingReport}
            >
              Engagement Report
            </Button>
            <Button
              variant="outline"
              className="w-full border-purple-500/20 hover:bg-purple-500/10 bg-transparent"
              onClick={() => handleGenerateReport("rizz-distribution")}
              disabled={generatingReport}
            >
              Rizz Distribution Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
