export function triggerHaptic(intensity: "light" | "medium" | "heavy" = "medium") {
  if (typeof window === "undefined" || !("vibrate" in navigator)) {
    return
  }

  const patterns = {
    light: 10,
    medium: 20,
    heavy: 50,
  }

  navigator.vibrate(patterns[intensity])
}

export function triggerSuccessHaptic() {
  if (typeof window === "undefined" || !("vibrate" in navigator)) {
    return
  }

  // Double tap pattern
  navigator.vibrate([50, 100, 50])
}

export function triggerErrorHaptic() {
  if (typeof window === "undefined" || !("vibrate" in navigator)) {
    return
  }

  // Triple tap pattern
  navigator.vibrate([30, 50, 30, 50, 30])
}
