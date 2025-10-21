export interface Commandment {
  id: number
  title: string
  description: string
  challenge: string
  tips: string[]
  icon: string
}

export const commandments: Commandment[] = [
  {
    id: 1,
    title: "Optimize Your Biological Foundation",
    description:
      "Your body is your Rizz engine. Without testosterone fueling your tank, you're idling while the world's best Rizzlers zoom past.",
    challenge:
      "Take Alpha Rizz daily, hit the gym 3x this week with heavy lifts, eat clean proteins and greens, and get 7-8 hours of sleep.",
    tips: [
      "Take Alpha Rizz with water every morning",
      "Focus on compound lifts: squats, deadlifts, bench press",
      "Eat lean proteins, greens, and healthy fats",
      "Prioritize 7-8 hours of quality sleep",
    ],
    icon: "💪",
  },
  {
    id: 2,
    title: "Master Your Frame",
    description:
      "Your frame is the fortress of your reality. When your frame is strong, you exude unshakable confidence.",
    challenge:
      "Visualize yourself as calm and composed for 5 minutes each morning. Check yourself throughout the day: are you reacting or standing firm?",
    tips: [
      "Morning visualization: imagine yourself as an unmovable rock",
      "Practice staying calm in stressful situations",
      "Don't let others dictate your emotional state",
      "Voice your opinions confidently, even on small things",
    ],
    icon: "🗿",
  },
  {
    id: 3,
    title: "Confidence Over Compromise",
    description:
      "Every unnecessary compromise chips away at your Rizz. True confidence means knowing your worth and refusing to dim your shine.",
    challenge:
      "Say 'no' to one thing today that doesn't serve you. Reflect on a situation where you felt pressured to fold.",
    tips: [
      "Journal situations where you compromised your values",
      "Practice saying 'no' to small requests",
      "Stand your ground on things that matter to you",
      "Celebrate moments when you stay true to yourself",
    ],
    icon: "🛡️",
  },
  {
    id: 4,
    title: "Have Fun Independent of Outcome",
    description:
      "True charisma isn't about trying to impress. When you show that your good time doesn't depend on anyone else, people naturally want in.",
    challenge:
      "Add a playful twist to your interactions today. Tease lightly, crack jokes, share something funny you noticed.",
    tips: [
      "Focus on enjoying yourself first",
      "Make plans exciting: 'I'm hitting this cool spot - tag along if you're down'",
      "Keep your tone light and playful",
      "Don't take rejection personally",
    ],
    icon: "🎭",
  },
  {
    id: 5,
    title: "Be The Prize",
    description: "You are the prize. When you internalize this mindset, instead of chasing, you attract.",
    challenge:
      "Write down three qualities that make you valuable. Set a boundary today and walk away from something that disrespects your time.",
    tips: [
      "List your valuable qualities daily",
      "Set clear boundaries in interactions",
      "Respond on your terms, not instantly",
      "Walk away from disrespect",
    ],
    icon: "👑",
  },
  {
    id: 6,
    title: "Eye Contact Is Connection",
    description:
      "Strong eye contact signals confidence, focus, and emotional presence. It's one of the most powerful tools to create trust.",
    challenge: "Practice holding eye contact 2-3 seconds longer than usual in every conversation today.",
    tips: [
      "Start with low-stakes situations (barista, coworker)",
      "Maintain steady eye contact while listening",
      "Use natural breaks to avoid intensity",
      "Pair your gaze with a slight smile",
    ],
    icon: "👁️",
  },
  {
    id: 7,
    title: "Speak With Intent",
    description:
      "Words are your most versatile weapon. Speaking with intent means delivering your message with confidence, clarity, and purpose.",
    challenge:
      "Record yourself speaking for one minute. Listen back and eliminate filler words. Practice deliberate pauses for emphasis.",
    tips: [
      "Slow down your speech - rushing shows nervousness",
      "Use intentional pauses for emphasis",
      "Eliminate 'um' and 'uh' from your vocabulary",
      "Speak with conviction, not arrogance",
    ],
    icon: "🗣️",
  },
  {
    id: 8,
    title: "Manage Energy, Not Attention",
    description:
      "The secret to becoming magnetic isn't chasing attention - it's managing your energy and knowing where to invest your time.",
    challenge:
      "Journal where your energy goes today. Identify one habit that drains you and cut it out. Set aside 15 minutes to recharge.",
    tips: [
      "Track your energy throughout the day",
      "Cut out energy-draining activities",
      "Prioritize self-improvement over validation",
      "Be fully present in conversations",
    ],
    icon: "⚡",
  },
  {
    id: 9,
    title: "Learn To Lead",
    description:
      "Leadership is magnetic. Taking charge shows confidence, decisiveness, and the ability to create memorable experiences.",
    challenge: "Take charge of one decision today - pick a restaurant, suggest an activity, or guide a conversation.",
    tips: [
      "Start with small decisions",
      "Be decisive even when unsure",
      "Guide conversations with engaging questions",
      "Create experiences, don't just follow",
    ],
    icon: "🧭",
  },
  {
    id: 10,
    title: "Be Comfortable With The Uncomfortable",
    description: "Social discomfort is where growth happens. Mastering these moments gives you a superpower.",
    challenge:
      "Put yourself in one mildly uncomfortable social situation today. Focus on your breathing and body language.",
    tips: [
      "Start conversations with strangers",
      "Speak up in group settings",
      "Level up gradually: coworkers → strangers",
      "Stay calm under pressure",
    ],
    icon: "🔥",
  },
]

export function getTodaysCommandment(): Commandment {
  const dayOfMonth = new Date().getDate()
  const index = (dayOfMonth - 1) % commandments.length
  return commandments[index]
}

export function getCommandmentById(id: number): Commandment | undefined {
  return commandments.find((c) => c.id === id)
}
