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
import { Textarea } from "@/components/ui/textarea"
import { updateCommandment } from "@/lib/actions/content"
import { useToast } from "@/hooks/use-toast"
import { Pencil } from "lucide-react"

interface EditCommandmentDialogProps {
  commandment: {
    id: number
    title: string
    description: string
    challenge: string
    tips: string[]
    icon: string
  }
}

export function EditCommandmentDialog({ commandment }: EditCommandmentDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const tips = (formData.get("tips") as string).split("\n").filter((t) => t.trim())

    const result = await updateCommandment(commandment.id, {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      challenge: formData.get("challenge") as string,
      tips,
      icon: formData.get("icon") as string,
    })

    if (result.success) {
      toast({
        title: "Commandment Updated",
        description: "Successfully updated commandment",
      })
      setOpen(false)
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update commandment",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-purple-500/30 hover:bg-purple-500/10 bg-transparent">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-black/95 border-purple-500/20 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-purple-400">Edit Commandment</DialogTitle>
            <DialogDescription className="text-gray-400">Update commandment details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-purple-300">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                defaultValue={commandment.title}
                required
                className="bg-black/50 border-purple-500/30 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon" className="text-purple-300">
                Icon (Emoji)
              </Label>
              <Input
                id="icon"
                name="icon"
                defaultValue={commandment.icon}
                required
                className="bg-black/50 border-purple-500/30 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-purple-300">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={commandment.description}
                required
                rows={3}
                className="bg-black/50 border-purple-500/30 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="challenge" className="text-purple-300">
                Challenge
              </Label>
              <Textarea
                id="challenge"
                name="challenge"
                defaultValue={commandment.challenge}
                required
                rows={3}
                className="bg-black/50 border-purple-500/30 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tips" className="text-purple-300">
                Tips (one per line)
              </Label>
              <Textarea
                id="tips"
                name="tips"
                defaultValue={commandment.tips.join("\n")}
                required
                rows={5}
                className="bg-black/50 border-purple-500/30 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
