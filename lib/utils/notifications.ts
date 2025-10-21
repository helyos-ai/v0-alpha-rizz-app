export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false
  }

  if (Notification.permission === "granted") {
    return true
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission()
    return permission === "granted"
  }

  return false
}

export function sendNotification(title: string, body: string, icon?: string) {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return
  }

  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: icon || "/images/gorizzla-avatar.webp",
      badge: "/images/gorizzla-avatar.webp",
    })
  }
}

export function scheduleStreakReminder(lastSessionDate: Date) {
  const now = new Date()
  const hoursSinceLastSession = (now.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60)

  if (hoursSinceLastSession >= 20 && hoursSinceLastSession < 24) {
    sendNotification(
      "Don't Break Your Streak! 🔥",
      "Your streak is about to end. Get a quick session in with Gorizzla!",
    )
  }
}
