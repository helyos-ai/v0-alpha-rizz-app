"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, X } from "lucide-react"
import { triggerHaptic } from "@/lib/utils/haptics"

interface VoiceOnlyModeProps {
  isActive: boolean
  onClose: () => void
}

export function VoiceOnlyMode({ isActive, onClose }: VoiceOnlyModeProps) {
  const [isMuted, setIsMuted] = useState(false)

  if (!isActive) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-8">
      <Button
        onClick={() => {
          triggerHaptic("light")
          onClose()
        }}
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/10"
      >
        <X className="w-6 h-6" />
      </Button>

      <div className="text-center space-y-8">
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
            {isMuted ? <MicOff className="w-24 h-24 text-gray-500" /> : <Mic className="w-24 h-24 text-purple-400" />}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">Voice-Only Mode</h2>
          <p className="text-gray-400">Focus on the conversation</p>
        </div>

        <Button
          onClick={() => {
            triggerHaptic("medium")
            setIsMuted(!isMuted)
          }}
          size="lg"
          className={`px-8 py-6 text-lg ${
            isMuted
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
          }`}
        >
          {isMuted ? "Unmute" : "Mute"}
        </Button>
      </div>
    </div>
  )
}
