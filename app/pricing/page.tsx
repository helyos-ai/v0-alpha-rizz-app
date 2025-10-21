import { Pricing } from "@/components/pricing"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Choose Your Pack
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Invest in yourself. Get unlimited access to Gorizzla and level up your Rizz game.
          </p>
        </div>

        <Pricing />

        <div className="mt-16 text-center">
          <p className="text-zinc-400 mb-4">All packs include:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-300">
            <span className="flex items-center gap-2">
              <span className="text-orange-500">✓</span> Unlimited scenarios
            </span>
            <span className="flex items-center gap-2">
              <span className="text-orange-500">✓</span> 10 Commandments tracker
            </span>
            <span className="flex items-center gap-2">
              <span className="text-orange-500">✓</span> Rizz Library access
            </span>
            <span className="flex items-center gap-2">
              <span className="text-orange-500">✓</span> Progress analytics
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
