export interface Product {
  id: string
  name: string
  description: string
  minutes: number
  price: number
  priceId?: string
  popular?: boolean
  features: string[]
}

export const products: Product[] = [
  {
    id: "starter",
    name: "Starter Pack",
    description: "Perfect for trying out Gorizzla",
    minutes: 30,
    price: 9.99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID,
    features: ["30 minutes of coaching", "Access to all scenarios", "Rizz Library access", "Basic analytics"],
  },
  {
    id: "alpha",
    name: "Alpha Pack",
    description: "Most popular choice",
    minutes: 100,
    price: 29.99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_ALPHA_PRICE_ID,
    popular: true,
    features: [
      "100 minutes of coaching",
      "All scenarios unlocked",
      "Full Rizz Library",
      "Advanced analytics",
      "Priority support",
      "10% discount on supplements",
    ],
  },
  {
    id: "legend",
    name: "Legend Pack",
    description: "For serious Rizz development",
    minutes: 300,
    price: 79.99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_LEGEND_PRICE_ID,
    features: [
      "300 minutes of coaching",
      "Unlimited scenario practice",
      "Premium Rizz content",
      "Detailed analytics & insights",
      "Priority support",
      "20% discount on supplements",
      "Exclusive community access",
    ],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
