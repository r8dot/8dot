export const PLAYER = {
  spawn: [0, 8, 0] as const,
  eyeHeight: 1.7,
  moveSpeed: 8,
  capsuleRadius: 0.35,
  capsuleHalfHeight: 0.45,
  minPolarAngle: Math.PI * 0.1,
  maxPolarAngle: Math.PI * 0.9,
}

export const ZONES = {
  SAINIK: { position: [0, 0, -18] as const },
  KOCHI_UG: { position: [16, 0, -30] as const },
  PUNE: { position: [34, 0, -42] as const },
  KOCHI_NOW: { position: [54, 0, -34] as const },
  MUNNAR: { position: [72, 0, -20] as const },
  BEACH: { position: [88, 0, -6] as const },
}

