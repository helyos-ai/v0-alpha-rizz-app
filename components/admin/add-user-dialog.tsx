"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createUser } from "@/lib/actions/admin"
import { useToast } from "@/hooks/use-toast"
import { UserPlus } from "lucide-react"

export function AddUserDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await createUser({
      email: formData.get("email") as string,
      full_name: formData.get("full_name") as string,
      rizz_score: Number.parseInt(formData.get("rizz_score") as string) || 0,
      level: (formData.get("level") as string) || "Zero Rizz",
    })

    if (result.success) {
      toast({
        title: "User Created",
        description: `Successfully created user ${result.user?.email}`,
      })
      setOpen(false)
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to create user",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black/95 border-purple-500/20">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-purple-400">Add New User</DialogTitle>
            <DialogDescription className="text-gray-400">Create a new user profile manually</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-purple-300">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="user@example.com"
                className="bg-black/50 border-purple-500/30 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="full_name" className="text-purple-300">
                Full Name
              </Label>
              <Input
                id="full_name"
                name="full_name"
                placeholder="John Doe"
                className="bg-black/50 border-purple-500/30 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rizz_score" className="text-purple-300">
                Initial Rizz Score
              </Label>
              <Input
                id="rizz_score"
                name="rizz_score"
                type="number"
                defaultValue="0"
                min="0"
                max="1000"
                className="bg-black/50 border-purple-500/30 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="level" className="text-purple-300">
                Level
              </Label>
              <select
                id="level"
                name="level"
                className="flex h-10 w-full rounded-md border border-purple-500/30 bg-black/50 px-3 py-2 text-sm text-white"
              >
                <option value="Zero Rizz">Zero Rizz</option>
                <option value="Beginner">Beginner</option>
                <option value="Alpha">Alpha</option>
                <option value="Legend">Legend</option>
                <option value="Rizz God">Rizz God</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700">
              {loading ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
