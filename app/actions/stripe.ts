"use server"

import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"

export async function createCheckoutSession(priceId: string) {
  const headersList = await headers()
  const origin = headersList.get("origin") || "http://localhost:3000"

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/profile?success=true`,
      cancel_url: `${origin}/pricing?canceled=true`,
    })

    return { url: session.url }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw new Error("Failed to create checkout session")
  }
}
