export type Goal = {
  id: number
  title: string
  completionDate: string
  status: "in-progress" | "scheduled" | "completed"
  icon: "boat" | "ship"
  currentDay?: number
  totalDays?: number
  description?: string
}

export const goalsData: Goal[] = [
  // In Progress Goals (2)
  {
    id: 1,
    title: "트윌킹 연습",
    completionDate: "2024.05.18",
    status: "in-progress",
    icon: "boat",
    currentDay: 17,
    totalDays: 60,
    description: "매일 30분씩 트윌킹 연습하기",
  },
  {
    id: 2,
    title: "하루 유산소 20분 + 웃몸일으키기",
    completionDate: "2024.06.15",
    status: "in-progress",
    icon: "ship",
    currentDay: 8,
    totalDays: 30,
    description: "건강한 몸만들기 프로젝트",
  },
  // Scheduled Goals (3)
  {
    id: 3,
    title: "영어 회화 연습",
    completionDate: "2024.07.01",
    status: "scheduled",
    icon: "boat",
    totalDays: 45,
    description: "매일 30분 영어 스피킹 연습",
  },
  {
    id: 4,
    title: "기타 연주 마스터하기",
    completionDate: "2024.08.20",
    status: "scheduled",
    icon: "ship",
    totalDays: 90,
    description: "좋아하는 곡 10곡 연주하기",
  },
  {
    id: 5,
    title: "독서 습관 만들기",
    completionDate: "2024.06.30",
    status: "scheduled",
    icon: "boat",
    totalDays: 21,
    description: "매일 30페이지씩 책 읽기",
  },
  // Completed Goals (1)
  {
    id: 6,
    title: "물 하루 2L 마시기",
    completionDate: "2024.04.30",
    status: "completed",
    icon: "boat",
    currentDay: 30,
    totalDays: 30,
    description: "건강한 수분 섭취 습관 만들기",
  },
]

export const getGoalsByStatus = (status: Goal["status"]) => {
  return goalsData.filter((goal) => goal.status === status)
}

export const getGoalById = (id: number) => {
  return goalsData.find((goal) => goal.id === id)
}

export const getGoals = () => {
  return goalsData
}

export interface NewGoalData {
  title: string
  description: string
  startDate: string
  duration: string
  pledge: string
}

export const addGoal = (newGoalData: NewGoalData): Goal => {
  const newId = Math.max(...goalsData.map((g) => g.id)) + 1

  const getDaysFromDuration = (duration: string): number => {
    switch (duration) {
      case "1week":
        return 7
      case "1month":
        return 30
      case "3months":
        return 90
      case "6months":
        return 180
      case "12months":
        return 365
      case "none":
        return 999
      default:
        return 30
    }
  }

  // Calculate completion date
  const startDate = new Date(newGoalData.startDate)
  const totalDays = getDaysFromDuration(newGoalData.duration)
  const completionDate = new Date(startDate)
  completionDate.setDate(completionDate.getDate() + totalDays)

  const newGoal: Goal = {
    id: newId,
    title: newGoalData.title,
    completionDate: completionDate.toLocaleDateString("ko-KR").replace(/\./g, ".").slice(0, -1),
    status: "scheduled",
    icon: "boat",
    totalDays,
    description: newGoalData.description,
  }

  goalsData.push(newGoal)
  return newGoal
}
