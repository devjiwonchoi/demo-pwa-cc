'use client'

import { useState } from "react";

import { getGoalsByStatus, Goal } from "@/lib/goals-data";

import { hasCheckedInToday, markAttendance } from "@/lib/attendance-data";
import { Button } from "@/components/ui/button";

export function ParticipateButton({ goalId }: { goalId: Goal['id'] }) {

  const inProgressGoals = getGoalsByStatus("in-progress");

  const [attendanceStatus, setAttendanceStatus] = useState<
    Record<number, boolean>
  >(() => {
    const status: Record<number, boolean> = {};
    inProgressGoals.forEach((goal) => {
      status[goal.id] = hasCheckedInToday(goal.id);
    });
    return status;
  });

  const isCheckedIn = attendanceStatus[goalId];

  const handleCheckIn = (goalId: number, e: React.MouseEvent) => {
    e.stopPropagation();

    if (attendanceStatus[goalId]) {
      // Already checked in today
      return;
    }

    const success = markAttendance(goalId);
    if (success) {
      setAttendanceStatus((prev) => ({
        ...prev,
        [goalId]: true,
      }));

      // Show success feedback (you could add a toast notification here)
      console.log(`[v0] Successfully checked in for goal ${goalId}`);
    }
  };

  return (
    <Button
        className={`relative z-10 w-full rounded-xl py-3 font-medium transition-colors ${
          isCheckedIn
            ? "bg-[#22c55e] text-white hover:bg-[#16a34a]"
            : "bg-[#015bfa] text-white hover:bg-[#0146d1]"
        }`}
        onClick={(e) => handleCheckIn(goalId, e)}
        disabled={isCheckedIn}
      >
        {isCheckedIn ? "✓ 출석 완료" : "출석하기"}
      </Button>
  );
}