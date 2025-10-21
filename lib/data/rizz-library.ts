export interface RizzTip {
  id: string
  title: string
  content: string
  category: "conversation" | "body-language" | "confidence" | "dating" | "style"
  difficulty: "beginner" | "intermediate" | "advanced"
}

export const rizzLibrary: RizzTip[] = [
  // Conversation Tips
  {
    id: "conv-1",
    title: "The Power of Active Listening",
    content:
      "Don't just wait for your turn to speak. Actually listen to what she's saying. Ask follow-up questions that show you're engaged. \"Tell me more about that\" is your secret weapon.",
    category: "conversation",
    difficulty: "beginner",
  },
  {
    id: "conv-2",
    title: "Use Open-Ended Questions",
    content:
      'Instead of "Do you like music?" ask "What kind of music gets you hyped?" Open questions create deeper conversations and show genuine interest.',
    category: "conversation",
    difficulty: "beginner",
  },
  {
    id: "conv-3",
    title: "The Callback Technique",
    content:
      'Reference something she mentioned earlier in the conversation. It shows you were paying attention and creates connection. "Like you said about your dog earlier..."',
    category: "conversation",
    difficulty: "intermediate",
  },
  {
    id: "conv-4",
    title: "Playful Teasing",
    content:
      'Light, playful teasing creates attraction. Keep it fun, never mean. "Oh, you\'re one of THOSE people who puts pineapple on pizza?" with a smile.',
    category: "conversation",
    difficulty: "intermediate",
  },
  {
    id: "conv-5",
    title: "Share Vulnerability",
    content:
      "Don't be afraid to share something real about yourself. Vulnerability creates deeper connection. Balance confidence with authenticity.",
    category: "conversation",
    difficulty: "advanced",
  },

  // Body Language Tips
  {
    id: "body-1",
    title: "Stand Tall, Own Your Space",
    content:
      "Shoulders back, chest out, chin up. Your posture communicates confidence before you even speak. Take up space unapologetically.",
    category: "body-language",
    difficulty: "beginner",
  },
  {
    id: "body-2",
    title: "Eye Contact Mastery",
    content:
      "Hold eye contact for 3-5 seconds, then look away naturally. Too little = nervous, too much = creepy. Find the sweet spot.",
    category: "body-language",
    difficulty: "beginner",
  },
  {
    id: "body-3",
    title: "The Triangle Gaze",
    content:
      "Look at her eyes, then briefly at her lips, then back to eyes. This subtle technique creates romantic tension.",
    category: "body-language",
    difficulty: "intermediate",
  },
  {
    id: "body-4",
    title: "Mirror Her Energy",
    content:
      "Subtly match her body language and energy level. If she leans in, you lean in. This creates subconscious rapport.",
    category: "body-language",
    difficulty: "intermediate",
  },
  {
    id: "body-5",
    title: "Slow, Deliberate Movements",
    content: "Rushed movements signal nervousness. Move with purpose and control. Every gesture should be intentional.",
    category: "body-language",
    difficulty: "advanced",
  },

  // Confidence Tips
  {
    id: "conf-1",
    title: "Rejection is Redirection",
    content:
      'Every "no" gets you closer to a "yes". Rejection isn\'t personal - it\'s just not the right match. Keep moving forward.',
    category: "confidence",
    difficulty: "beginner",
  },
  {
    id: "conf-2",
    title: "Celebrate Small Wins",
    content: "Made eye contact with someone? Win. Started a conversation? Win. Track your progress, not just outcomes.",
    category: "confidence",
    difficulty: "beginner",
  },
  {
    id: "conf-3",
    title: "The 3-Second Rule",
    content:
      "When you see someone you want to approach, you have 3 seconds to move. Overthinking kills action. Trust your instinct.",
    category: "confidence",
    difficulty: "intermediate",
  },
  {
    id: "conf-4",
    title: "Outcome Independence",
    content:
      "Don't attach your self-worth to results. You're the prize regardless of her response. This mindset is magnetic.",
    category: "confidence",
    difficulty: "advanced",
  },
  {
    id: "conf-5",
    title: "Daily Affirmations",
    content:
      'Start each day reminding yourself: "I am confident. I am valuable. I bring positive energy." Your mind believes what you tell it.',
    category: "confidence",
    difficulty: "beginner",
  },

  // Dating Tips
  {
    id: "date-1",
    title: "Choose Active Dates",
    content:
      "Skip the boring dinner. Do something active - mini golf, arcade, hiking. Shared experiences create stronger bonds.",
    category: "dating",
    difficulty: "beginner",
  },
  {
    id: "date-2",
    title: "Lead with Decisiveness",
    content:
      'Don\'t ask "What do you want to do?" Say "I\'m thinking we check out this new spot. You down?" Leadership is attractive.',
    category: "dating",
    difficulty: "intermediate",
  },
  {
    id: "date-3",
    title: "Create Inside Jokes",
    content:
      'Find something funny that happens on your date and reference it later. Inside jokes create a sense of "us vs the world".',
    category: "dating",
    difficulty: "intermediate",
  },
  {
    id: "date-4",
    title: "The Power of Touch",
    content:
      "Start with casual, non-threatening touch - high five, playful arm touch. Escalate naturally based on her response.",
    category: "dating",
    difficulty: "advanced",
  },
  {
    id: "date-5",
    title: "End on a High Note",
    content: "Leave when things are going great, not when they're dying down. Always leave her wanting more.",
    category: "dating",
    difficulty: "advanced",
  },

  // Style Tips
  {
    id: "style-1",
    title: "Fit is Everything",
    content: "A $20 shirt that fits perfectly beats a $200 shirt that doesn't. Get your clothes tailored if needed.",
    category: "style",
    difficulty: "beginner",
  },
  {
    id: "style-2",
    title: "Signature Scent",
    content: "Find one cologne that becomes YOUR scent. Apply to pulse points - wrists, neck. Less is more.",
    category: "style",
    difficulty: "beginner",
  },
  {
    id: "style-3",
    title: "Grooming Basics",
    content: "Clean nails, trimmed facial hair, fresh haircut. These basics show you respect yourself and others.",
    category: "style",
    difficulty: "beginner",
  },
  {
    id: "style-4",
    title: "One Statement Piece",
    content: "A nice watch, chain, or jacket. One quality piece elevates your entire look. Don't overdo it.",
    category: "style",
    difficulty: "intermediate",
  },
  {
    id: "style-5",
    title: "Dress for the Occasion",
    content: "Read the room. Overdressed is better than underdressed, but know your environment. Adapt your style.",
    category: "style",
    difficulty: "intermediate",
  },
]

export function getRizzTipsByCategory(category?: string): RizzTip[] {
  if (!category) return rizzLibrary
  return rizzLibrary.filter((tip) => tip.category === category)
}

export function getDailyTip(): RizzTip {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  return rizzLibrary[dayOfYear % rizzLibrary.length]
}

export function searchTips(query: string): RizzTip[] {
  const lowerQuery = query.toLowerCase()
  return rizzLibrary.filter(
    (tip) => tip.title.toLowerCase().includes(lowerQuery) || tip.content.toLowerCase().includes(lowerQuery),
  )
}

export const categories = [
  { id: "all", label: "All Tips", icon: "🎯" },
  { id: "conversation", label: "Conversation", icon: "💬" },
  { id: "body-language", label: "Body Language", icon: "🕺" },
  { id: "confidence", label: "Confidence", icon: "💪" },
  { id: "dating", label: "Dating", icon: "❤️" },
  { id: "style", label: "Style", icon: "👔" },
]
