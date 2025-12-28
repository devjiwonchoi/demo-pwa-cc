export interface AttendanceRecord {
  goalId: number
  userId: string
  date: string // YYYY-MM-DD format
  participated: boolean
  timestamp: Date
}

// Mock user ID - in a real app this would come from authentication
const CURRENT_USER_ID = "current-user"

// In-memory storage for demo - in a real app this would be a database
const attendanceRecords: AttendanceRecord[] = [
  // Sample existing records
  {
    goalId: 1,
    userId: CURRENT_USER_ID,
    date: "2024-01-13",
    participated: true,
    timestamp: new Date("2024-01-13T09:30:00"),
  },
  {
    goalId: 1,
    userId: CURRENT_USER_ID,
    date: "2024-01-14",
    participated: true,
    timestamp: new Date("2024-01-14T10:15:00"),
  },
  {
    goalId: 1,
    userId: CURRENT_USER_ID,
    date: "2024-01-15",
    participated: true,
    timestamp: new Date("2024-01-15T08:45:00"),
  },
  {
    goalId: 2,
    userId: CURRENT_USER_ID,
    date: "2024-01-13",
    participated: true,
    timestamp: new Date("2024-01-13T07:20:00"),
  },
  { goalId: 2, userId: CURRENT_USER_ID, date: "2024-01-14", participated: false, timestamp: new Date() },
]

// Get today's date in user's timezone as YYYY-MM-DD
export const getTodayDateString = (): string => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

// Check if user has already checked in today for a specific goal
export const hasCheckedInToday = (goalId: number, userId: string = CURRENT_USER_ID): boolean => {
  const todayDate = getTodayDateString()
  const record = attendanceRecords.find(
    (record) => record.goalId === goalId && record.userId === userId && record.date === todayDate,
  )
  return record?.participated || false
}

// Mark attendance for today
export const markAttendance = (goalId: number, userId: string = CURRENT_USER_ID): boolean => {
  const todayDate = getTodayDateString()

  // Check if already checked in today
  const existingRecord = attendanceRecords.find(
    (record) => record.goalId === goalId && record.userId === userId && record.date === todayDate,
  )

  if (existingRecord) {
    // Update existing record
    existingRecord.participated = true
    existingRecord.timestamp = new Date()
  } else {
    // Create new record
    const newRecord: AttendanceRecord = {
      goalId,
      userId,
      date: todayDate,
      participated: true,
      timestamp: new Date(),
    }
    attendanceRecords.push(newRecord)
  }

  return true
}

// Get attendance records for a specific goal
export const getAttendanceRecords = (goalId: number, userId: string = CURRENT_USER_ID): AttendanceRecord[] => {
  return attendanceRecords
    .filter((record) => record.goalId === goalId && record.userId === userId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get attendance streak for a goal
export const getAttendanceStreak = (goalId: number, userId: string = CURRENT_USER_ID): number => {
  const records = getAttendanceRecords(goalId, userId)
  let streak = 0
  const today = new Date()

  for (let i = 0; i < 365; i++) {
    // Check up to a year back
    const checkDate = new Date(today)
    checkDate.setDate(today.getDate() - i)
    const dateString = checkDate.toISOString().split("T")[0]

    const record = records.find((r) => r.date === dateString)
    if (record?.participated) {
      streak++
    } else if (i === 0) {
      // If today is not checked in, streak is 0
      break
    } else {
      // If any day in the past is missed, break the streak
      break
    }
  }

  return streak
}
