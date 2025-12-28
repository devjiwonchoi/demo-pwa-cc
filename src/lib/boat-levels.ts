export interface BoatLevel {
  id: number
  name: string
  koreanName: string
  duration: string
  durationDays: number
  svgPath: string
}

export const boatLevels: BoatLevel[] = [
  {
    id: 1,
    name: "paper-boat",
    koreanName: "종이배",
    duration: "start",
    durationDays: 0,
    svgPath: "/boats/paper-boat.svg",
  },
  {
    id: 2,
    name: "makeshift-boat",
    koreanName: "급조배",
    duration: "1week",
    durationDays: 7,
    svgPath: "/boats/makeshift-boat.svg",
  },
  {
    id: 3,
    name: "kayak",
    koreanName: "카약",
    duration: "1month",
    durationDays: 30,
    svgPath: "/boats/kayak.svg",
  },
  {
    id: 4,
    name: "sailboat",
    koreanName: "돛단배",
    duration: "3months",
    durationDays: 90,
    svgPath: "/boats/sailboat.svg",
  },
  {
    id: 5,
    name: "multi-sail-boat",
    koreanName: "여러돛단배",
    duration: "6months",
    durationDays: 180,
    svgPath: "/boats/multi-sail-boat.svg",
  },
  {
    id: 6,
    name: "pirate-ship",
    koreanName: "해적선",
    duration: "12months",
    durationDays: 365,
    svgPath: "/boats/pirate-ship.svg",
  },
]

export const getBoatLevelByDuration = (totalDays: number): BoatLevel => {
  // Find the appropriate boat level based on total days
  for (let i = boatLevels.length - 1; i >= 0; i--) {
    if (totalDays >= boatLevels[i].durationDays) {
      return boatLevels[i]
    }
  }
  return boatLevels[0] // Default to paper boat
}

export const getCurrentBoatLevel = (currentDay: number, totalDays: number): BoatLevel => {
  // Calculate progress percentage
  const progressPercentage = (currentDay / totalDays) * 100

  // Get the target boat level for this goal
  const targetLevel = getBoatLevelByDuration(totalDays)

  // Calculate which boat level the user has currently achieved based on progress
  const achievedDays = Math.floor((progressPercentage / 100) * totalDays)

  // Find current level based on achieved progress
  for (let i = boatLevels.length - 1; i >= 0; i--) {
    if (achievedDays >= boatLevels[i].durationDays) {
      return boatLevels[i]
    }
  }
  return boatLevels[0]
}

export const getNextBoatLevel = (currentDay: number, totalDays: number): BoatLevel | null => {
  const currentLevel = getCurrentBoatLevel(currentDay, totalDays)
  const targetLevel = getBoatLevelByDuration(totalDays)

  // If already at target level, return null
  if (currentLevel.id >= targetLevel.id) {
    return null
  }

  // Find next achievable level within the goal's duration
  for (let i = currentLevel.id; i < boatLevels.length; i++) {
    if (boatLevels[i].durationDays <= totalDays && boatLevels[i].id > currentLevel.id) {
      return boatLevels[i]
    }
  }

  return targetLevel
}

export const getDaysToNextLevel = (currentDay: number, totalDays: number): number => {
  const nextLevel = getNextBoatLevel(currentDay, totalDays)
  if (!nextLevel) return 0

  return Math.max(0, nextLevel.durationDays - currentDay)
}
