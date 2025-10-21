"use client"

import { useConversation } from "@elevenlabs/react"
import { useCallback, useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CoachingMode {
  id: string
  label: string
  systemPrompt: string
  icon: string
}

const coachingModes: CoachingMode[] = [
  {
    id: "pre-date",
    label: "Pre-Date Prep",
    systemPrompt:
      "You are Gorizzla, helping prepare for an upcoming date. Give confidence-building advice, conversation tips, and help them feel ready.",
    icon: "💝",
  },
  {
    id: "approach",
    label: "Approach Coach",
    systemPrompt:
      "You are Gorizzla, giving real-time guidance on approaching someone. Be direct, confident, and help them take action.",
    icon: "🎯",
  },
  {
    id: "debrief",
    label: "Debrief",
    systemPrompt:
      "You are Gorizzla, analyzing what went well and what could improve after a social interaction. Be honest but supportive.",
    icon: "📊",
  },
  {
    id: "confidence",
    label: "Confidence Boost",
    systemPrompt:
      "You are Gorizzla, pumping them up and building their confidence. Be motivational, energetic, and remind them of their worth.",
    icon: "⚡",
  },
]

export function GorizzlaCoach() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const [audioIntensity, setAudioIntensity] = useState(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  const conversation = useConversation({
    onConnect: () => console.log("[v0] Connected to Gorizzla"),
    onDisconnect: () => console.log("[v0] Disconnected from Gorizzla"),
    onMessage: (message) => console.log("[v0] Message:", message),
    onError: (error) => console.error("[v0] Error:", error),
  })

  useEffect(() => {
    if (conversation.status === "speaking") {
      const interval = setInterval(() => {
        setAudioIntensity(Math.random() * 100)
      }, 100)
      return () => clearInterval(interval)
    } else {
      setAudioIntensity(0)
    }
  }, [conversation.status])

  const startConversation = useCallback(
    async (mode: CoachingMode) => {
      try {
        setSelectedMode(mode.id)
        console.log("[v0] Starting conversation with mode:", mode.label)

        const agentId = process.env.NEXT_PUBLIC_AGENT_ID
        if (!agentId) {
          throw new Error("NEXT_PUBLIC_AGENT_ID is not set")
        }

        await conversation.startSession({
          agentId,
        })
      } catch (error) {
        console.error("[v0] Error starting conversation:", error)
        setSelectedMode(null)
      }
    },
    [conversation],
  )

  const stopConversation = useCallback(async () => {
    await conversation.endSession()
    setSelectedMode(null)
  }, [conversation])

  const status = conversation.status
  const isSpeaking = status === "speaking"
  const ringScale = 1 + (audioIntensity / 100) * 0.3

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto p-6">
      <div className="relative">
        {isSpeaking && (
          <>
            <div
              className="absolute inset-0 rounded-full border-4 border-purple-500/50 audio-ring"
              style={{
                transform: `scale(${ringScale})`,
                transition: "transform 0.1s ease-out",
              }}
            />
            <div
              className="absolute inset-0 rounded-full border-4 border-purple-400/70 audio-ring"
              style={{
                animationDelay: "0.3s",
                transform: `scale(${ringScale * 0.9})`,
                transition: "transform 0.1s ease-out",
              }}
            />
            <div
              className="absolute inset-0 rounded-full border-4 border-purple-300/90 audio-ring-intense"
              style={{
                animationDelay: "0.6s",
                transform: `scale(${ringScale * 0.8})`,
                transition: "transform 0.1s ease-out",
              }}
            />
          </>
        )}

        <div
          className={`relative w-48 h-48 rounded-full overflow-hidden transition-all duration-300 ${
            isSpeaking ? "glow-pulse" : ""
          }`}
          style={{
            transform: isSpeaking ? `scale(${1 + audioIntensity / 1000})` : "scale(1)",
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src="/images/gorizzla-avatar.webp"
            alt="Gorizzla - Your Rizz Coach"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Gorizzla</h2>
        <p className="text-gray-400">
          {status === "connected" && "Ready to coach"}
          {status === "connecting" && "Connecting..."}
          {status === "speaking" && "Speaking..."}
          {status === "listening" && "Listening..."}
          {!status && "Your Rizz Coach"}
        </p>
      </div>

      {!selectedMode ? (
        <div className="grid grid-cols-2 gap-4 w-full">
          {coachingModes.map((mode) => (
            <Button
              key={mode.id}
              onClick={() => startConversation(mode)}
              className="h-24 flex flex-col gap-2 glass-card card-hover magnetic-btn btn-glow bg-zinc-900/50 hover:bg-purple-600/30 border border-zinc-800 hover:border-purple-500 transition-all relative overflow-hidden"
              disabled={status === "connecting"}
            >
              <span className="text-3xl">{mode.icon}</span>
              <span className="text-sm font-semibold">{mode.label}</span>
              <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity" />
            </Button>
          ))}
        </div>
      ) : (
        <Button
          onClick={stopConversation}
          className="w-full bg-red-600 hover:bg-red-700 magnetic-btn btn-glow"
          size="lg"
        >
          End Session
        </Button>
      )}
    </div>
  )
}
