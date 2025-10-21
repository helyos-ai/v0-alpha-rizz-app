import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Gorizzla - Your Rizz Coach",
  description: "Build confidence and master social skills with your AI Rizz coach",
    generator: 'v0.app'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full w-full dark">
      <body className="antialiased w-full h-full bg-black text-white">
        {/* Desktop Navigation */}
        <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🦍</span>
              <span className="text-xl font-bold text-white">Gorizzla</span>
            </Link>

            <div className="flex items-center gap-6">
              <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
                Coach
              </Link>
              <Link href="/library" className="text-zinc-400 hover:text-white transition-colors">
                Library
              </Link>
              <Link href="/scenarios" className="text-zinc-400 hover:text-white transition-colors">
                Scenarios
              </Link>
              <Link href="/commandments" className="text-zinc-400 hover:text-white transition-colors">
                Commandments
              </Link>
              <Link href="/pricing">
                <Button className="bg-purple-600 hover:bg-purple-700 font-bold">Get Minutes</Button>
              </Link>
              <Link href="/profile" className="text-zinc-400 hover:text-white transition-colors">
                Profile
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="md:pt-20">{children}</main>

        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-zinc-800">
          <div className="grid grid-cols-5 gap-1 px-2 py-3">
            <Link
              href="/"
              className="flex flex-col items-center gap-1 text-zinc-400 hover:text-purple-500 transition-colors"
            >
              <span className="text-xl">🦍</span>
              <span className="text-xs">Coach</span>
            </Link>
            <Link
              href="/library"
              className="flex flex-col items-center gap-1 text-zinc-400 hover:text-purple-500 transition-colors"
            >
              <span className="text-xl">📚</span>
              <span className="text-xs">Library</span>
            </Link>
            <Link
              href="/scenarios"
              className="flex flex-col items-center gap-1 text-zinc-400 hover:text-purple-500 transition-colors"
            >
              <span className="text-xl">🎭</span>
              <span className="text-xs">Practice</span>
            </Link>
            <Link
              href="/commandments"
              className="flex flex-col items-center gap-1 text-zinc-400 hover:text-purple-500 transition-colors"
            >
              <span className="text-xl">⚡</span>
              <span className="text-xs">Rules</span>
            </Link>
            <Link
              href="/profile"
              className="flex flex-col items-center gap-1 text-zinc-400 hover:text-purple-500 transition-colors"
            >
              <span className="text-xl">👤</span>
              <span className="text-xs">Profile</span>
            </Link>
          </div>
        </nav>

        {/* Mobile padding for bottom nav */}
        <div className="md:hidden h-20" />
      </body>
    </html>
  )
}
