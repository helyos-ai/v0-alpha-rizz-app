export interface Scenario {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  context: string
  systemPrompt: string
  icon: string
  tips: string[]
}

export const scenarios: Scenario[] = [
  {
    id: "coffee-shop",
    title: "Coffee Shop Approach",
    description: "Practice approaching someone at a coffee shop in a natural, non-creepy way.",
    difficulty: "beginner",
    context: "You're at a busy coffee shop. You notice someone attractive reading a book at a nearby table.",
    systemPrompt:
      "You are a friendly person sitting at a coffee shop, reading a book. Someone approaches you to start a conversation. Respond naturally - be open but not overly eager. If they're awkward, be polite but brief. If they're confident and interesting, engage more.",
    icon: "☕",
    tips: [
      "Comment on their book or drink",
      "Keep it light and situational",
      "Read their body language",
      "Have an exit strategy if they're not interested",
    ],
  },
  {
    id: "bar-conversation",
    title: "Bar Conversation",
    description: "Navigate a loud bar environment and keep a conversation engaging.",
    difficulty: "intermediate",
    context: "You're at a bar with friends. You notice someone attractive at the bar ordering a drink.",
    systemPrompt:
      "You are someone at a bar having a good time with friends. Someone approaches you while you're ordering a drink. You're open to conversation but also want to get back to your friends. Be friendly but test if they can hold your interest.",
    icon: "🍺",
    tips: [
      "Use the environment (music, crowd, drinks)",
      "Be playful and fun",
      "Don't interview - tell stories",
      "Suggest moving to a quieter spot if going well",
    ],
  },
  {
    id: "gym-approach",
    title: "Gym Approach",
    description: "Approach someone at the gym without being that creepy gym guy.",
    difficulty: "intermediate",
    context: "You're at the gym. You've noticed someone attractive who comes at the same time as you.",
    systemPrompt:
      "You are someone working out at the gym, focused on your routine. You've noticed someone who seems to come at the same time. If they approach respectfully and briefly, you're open to a quick chat. If they interrupt your workout too much, you'll be polite but dismissive.",
    icon: "💪",
    tips: [
      "Timing is everything - between sets only",
      "Keep it brief initially",
      "Compliment their form or dedication",
      "Suggest grabbing a protein shake after",
    ],
  },
  {
    id: "social-event",
    title: "Social Event Networking",
    description: "Work a room at a social event and make meaningful connections.",
    difficulty: "intermediate",
    context: "You're at a networking event or party. The room is full of people mingling.",
    systemPrompt:
      "You are someone at a social event, open to meeting new people but also selective about who you spend time with. Respond positively to confident, interesting people. Be polite but move on from boring conversations.",
    icon: "🎉",
    tips: [
      "Approach groups, not just individuals",
      "Ask open-ended questions",
      "Share interesting stories",
      "Exchange contact info naturally",
    ],
  },
  {
    id: "street-approach",
    title: "Street Approach",
    description: "Stop someone on the street in a confident, non-threatening way.",
    difficulty: "advanced",
    context: "You're walking down a busy street and see someone attractive walking towards you.",
    systemPrompt:
      "You are someone walking down the street, heading somewhere. You're in a bit of a hurry but not completely closed off. If someone stops you confidently and genuinely, you might give them a minute. If they're awkward or creepy, you'll politely decline and keep walking.",
    icon: "🚶",
    tips: [
      "Be direct and confident",
      "Acknowledge they're busy",
      "Give a genuine compliment",
      "Get to the point quickly",
    ],
  },
  {
    id: "rejection-handling",
    title: "Handling Rejection",
    description: "Practice staying cool and confident when someone isn't interested.",
    difficulty: "advanced",
    context: "You've approached someone and they're clearly not interested or giving you a polite rejection.",
    systemPrompt:
      "You are someone who is not interested in the person approaching you. You have a boyfriend/girlfriend, or you're just not feeling it. Give a polite but clear rejection. If they handle it well, be friendly. If they get weird or pushy, be more firm.",
    icon: "🛑",
    tips: [
      "Stay calm and composed",
      "Respect their decision immediately",
      "Exit gracefully with a smile",
      "Don't take it personally",
    ],
  },
  {
    id: "group-dynamics",
    title: "Group Dynamics",
    description: "Approach and engage with a group, winning over friends to get to your target.",
    difficulty: "advanced",
    context: "Your target is with a group of friends. You need to win over the group to get time with them.",
    systemPrompt:
      "You are part of a group of friends out together. Someone approaches the group. You and your friends will test if they can handle group dynamics. If they're fun and include everyone, you'll be welcoming. If they only focus on one person, you'll be protective.",
    icon: "👥",
    tips: [
      "Engage the whole group first",
      "Win over the friends",
      "Be fun and social",
      "Isolate your target naturally later",
    ],
  },
]

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id)
}

export function getScenariosByDifficulty(difficulty: Scenario["difficulty"]): Scenario[] {
  return scenarios.filter((s) => s.difficulty === difficulty)
}
