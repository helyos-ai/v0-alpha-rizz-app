"use client"

import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { createCheckoutSession } from "@/app/actions/stripe"
import { useState } from "react"

export function Pricing() {
  const [loading, setLoading] = useState<string | null>(null)

  const handlePurchase = async (priceId: string | undefined, productId: string) => {
    if (!priceId) {
      alert("Stripe price ID not configured. Please add the environment variables.")
      return
    }

    setLoading(productId)
    try {
      const result = await createCheckoutSession(priceId)
      if (result.url) {
        window.location.href = result.url
      } else {
        alert("Failed to create checkout session")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {products.map((product) => (
        <Card
          key={product.id}
          className={`relative p-6 bg-zinc-900 border-2 transition-all hover:scale-105 ${
            product.popular ? "border-orange-500" : "border-zinc-800"
          }`}
        >
          {product.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
          )}

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
            <p className="text-zinc-400 text-sm mb-4">{product.description}</p>
            <div className="text-4xl font-bold text-orange-500 mb-1">${product.price}</div>
            <div className="text-zinc-400 text-sm">{product.minutes} minutes</div>
          </div>

          <ul className="space-y-3 mb-6">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-zinc-300">
                <span className="text-orange-500 mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() => handlePurchase(product.priceId, product.id)}
            disabled={loading === product.id}
            className={`w-full font-bold ${
              product.popular ? "bg-orange-500 hover:bg-orange-600" : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            {loading === product.id ? "Loading..." : "Get Started"}
          </Button>
        </Card>
      ))}
    </div>
  )
}
