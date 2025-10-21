"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { triggerHaptic, triggerSuccessHaptic } from "@/lib/utils/haptics"
import Image from "next/image"

const QUIZ_QUESTIONS = [
  {
    question: "How would you rate your current confidence with women?",
    options: [
      { text: "I struggle to even start conversations", points: 0 },
      { text: "I can talk but often run out of things to say", points: 25 },
      { text: "I'm decent but want to improve", points: 50 },
      { text: "I'm confident but want to level up", points: 75 },
    ],
  },
  {
    question: "What's your biggest challenge?",
    options: [
      { text: "Approaching and starting conversations", points: 0 },
      { text: "Keeping conversations interesting", points: 25 },
      { text: "Reading signals and escalating", points: 50 },
      { text: "Closing and getting dates", points: 75 },
    ],
  },
  {
    question: "How often do you practice social skills?",
    options: [
      { text: "Rarely, I avoid social situations", points: 0 },
      { text: "Sometimes, when I have to", points: 25 },
      { text: "Regularly, a few times a week", points: 50 },
      { text: "Daily, I'm always working on it", points: 75 },
    ],
  },
  {
    question: "What's your goal with Gorizzla?",
    options: [
      { text: "Build basic confidence and social skills", points: 0 },
      { text: "Get better at conversations and dating", points: 25 },
      { text: "Master the art of attraction", points: 50 },
      { text: "Become a true Rizz God", points: 75 },
    ],
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100

  const handleAnswer = (points: number) => {
    triggerHaptic("light")
    const newAnswers = [...answers, points]
    setAnswers(newAnswers)

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      triggerSuccessHaptic()
    }
  }

  const calculateRizzScore = () => {
    const total = answers.reduce((sum, points) => sum + points, 0)
    return Math.round((total / (QUIZ_QUESTIONS.length * 75)) * 100)
  }

  const getRizzLevel = (score: number) => {
    if (score < 20) return { level: "Beginner", message: "Every legend starts somewhere. Let's build your foundation." }
    if (score < 40) return { level: "Intermediate", message: "You've got potential. Time to unlock it." }
    if (score < 60) return { level: "Advanced", message: "You're on your way. Let's take you to the next level." }
    if (score < 80) return { level: "Alpha", message: "You've got game. Now let's make you unstoppable." }
    return { level: "Legend", message: "You're already elite. Let's make you a Rizz God." }
  }

  if (showResults) {
    const rizzScore = calculateRizzScore()
    const { level, message } = getRizzLevel(rizzScore)

    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30 text-center space-y-6">
          <div className="relative w-32 h-32 mx-auto">
            <Image src="/images/gorizzla-avatar.webp" alt="Gorizzla" fill className="object-cover rounded-full" />
          </div>

          <h1 className="text-4xl font-bold text-white">Your Rizz Score</h1>

          <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-400">
            {rizzScore}
          </div>

          <div className="space-y-2">
            <p className="text-2xl font-bold text-purple-400">{level}</p>
            <p className="text-lg text-gray-300">{message}</p>
          </div>

          <Button
            onClick={() => {
              triggerSuccessHaptic()
              router.push("/")
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-6 text-lg"
          >
            Start Your Journey with Gorizzla
          </Button>
        </Card>
      </div>
    )
  }

  const question = QUIZ_QUESTIONS[currentQuestion]

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>
              Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <h2 className="text-2xl font-bold text-white">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(option.points)}
              variant="outline"
              className="w-full justify-start text-left h-auto py-4 px-6 border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 text-white"
            >
              {option.text}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}
