"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle, Loader2, Database, TestTube } from "lucide-react"
import { runDatabaseSetup, checkDatabaseStatus, createTestProfile } from "@/lib/actions/setup"

export default function DatabaseToolsPage() {
  const [setupStatus, setSetupStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [setupMessage, setSetupMessage] = useState("")
  const [checkStatus, setCheckStatus] = useState<any>(null)
  const [testStatus, setTestStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [testMessage, setTestMessage] = useState("")

  const handleRunSetup = async () => {
    setSetupStatus("loading")
    setSetupMessage("")

    const result = await runDatabaseSetup()

    if (result.success) {
      setSetupStatus("success")
      setSetupMessage(result.message)
    } else {
      setSetupStatus("error")
      setSetupMessage(result.message)
    }
  }

  const handleCheckStatus = async () => {
    const result = await checkDatabaseStatus()
    setCheckStatus(result)
  }

  const handleCreateTestProfile = async () => {
    setTestStatus("loading")
    setTestMessage("")

    const result = await createTestProfile()

    if (result.success) {
      setTestStatus("success")
      setTestMessage("Test profile created successfully!")
    } else {
      setTestStatus("error")
      setTestMessage(result.message || "Failed to create test profile")
    }
  }

  return (
    <div className="space-y-8 page-enter">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Database Tools</h1>
        <p className="text-gray-400">Manage database setup, migrations, and health checks</p>
      </div>

      {/* Setup Script */}
      <Card className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-purple-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Create Database Tables</h2>
            <p className="text-sm text-gray-400">
              Creates all required tables: profiles, sessions, achievements, goals, commandments_progress, quiz_results
            </p>
          </div>
        </div>

        <Button
          onClick={handleRunSetup}
          disabled={setupStatus === "loading"}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
        >
          {setupStatus === "loading" && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {setupStatus === "success" && <CheckCircle2 className="w-4 h-4 mr-2" />}
          {setupStatus === "error" && <XCircle className="w-4 h-4 mr-2" />}
          {setupStatus === "loading" ? "Running Setup..." : "Run Database Setup"}
        </Button>

        {setupMessage && (
          <div
            className={`p-4 rounded-lg ${
              setupStatus === "success"
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            {setupMessage}
          </div>
        )}
      </Card>

      {/* Check Status */}
      <Card className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-yellow-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Check Database Status</h2>
            <p className="text-sm text-gray-400">Verify which tables have been created</p>
          </div>
        </div>

        <Button
          onClick={handleCheckStatus}
          variant="outline"
          className="w-full border-yellow-500/20 hover:bg-yellow-500/10 bg-transparent"
        >
          Check Status
        </Button>

        {checkStatus && (
          <div className="space-y-2">
            <div
              className={`p-4 rounded-lg ${
                checkStatus.allTablesExist
                  ? "bg-green-500/10 border border-green-500/20"
                  : "bg-yellow-500/10 border border-yellow-500/20"
              }`}
            >
              <p className="text-white font-semibold mb-2">
                {checkStatus.allTablesExist ? "All tables exist!" : "Some tables are missing"}
              </p>
              <div className="space-y-1">
                {["profiles", "sessions", "achievements", "goals", "commandments_progress", "quiz_results"].map(
                  (table) => (
                    <div key={table} className="flex items-center gap-2 text-sm">
                      {checkStatus.tables.includes(table) ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                      <span className={checkStatus.tables.includes(table) ? "text-green-400" : "text-red-400"}>
                        {table}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Test Profile */}
      <Card className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <TestTube className="w-6 h-6 text-blue-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Create Test Profile</h2>
            <p className="text-sm text-gray-400">Create a test profile to verify database is working</p>
          </div>
        </div>

        <Button
          onClick={handleCreateTestProfile}
          disabled={testStatus === "loading"}
          variant="outline"
          className="w-full border-blue-500/20 hover:bg-blue-500/10 bg-transparent"
        >
          {testStatus === "loading" && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {testStatus === "success" && <CheckCircle2 className="w-4 h-4 mr-2" />}
          {testStatus === "error" && <XCircle className="w-4 h-4 mr-2" />}
          {testStatus === "loading" ? "Creating..." : "Create Test Profile"}
        </Button>

        {testMessage && (
          <div
            className={`p-4 rounded-lg ${
              testStatus === "success"
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            {testMessage}
          </div>
        )}
      </Card>
    </div>
  )
}
