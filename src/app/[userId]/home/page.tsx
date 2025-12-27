"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Quote } from "./quote";

export default function Home() {
  const router = useRouter();

  // Mock data - replace with actual data fetching
  const [inProgressGoals] = useState([]);
  const [attendanceStatus] = useState({});

  const handleCheckIn = (goalId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement check-in functionality
  };

  const getCurrentBoatLevel = (currentDay: number, totalDays: number) => {
    // TODO: Implement boat level logic
    return {
      svgPath: "/placeholder.svg",
      koreanName: "기본 보트"
    };
  };
  return (
    <main>
      <div className="flex min-h-screen flex-col bg-[#ffffff]">
        {/* Header */}
        <header className="flex items-center justify-between bg-[#ffffff] p-4">
          <h1 className="text-2xl font-bold text-[#000000]">홈</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#000000]"
            onClick={() => router.push("/notifications")}
          >
            <span className="text-lg">🔔</span>
          </Button>
        </header>

        <div className="flex-1 p-4">
          <Quote />

          <div className="mb-6">
            <h2 className="mb-4 text-lg font-semibold text-[#000000]">
              진행중인 목표
            </h2>

            <div className="space-y-4">
              {inProgressGoals.map((goal) => {
                const isCheckedIn = attendanceStatus[goal.id];
                const currentDay = goal.current_day || 0;
                const totalDays = goal.total_days || 30;
                const currentLevel = getCurrentBoatLevel(currentDay, totalDays);
                const progressPercentage = (currentDay / totalDays) * 100;

                return (
                  <div
                    key={goal.id}
                    className="cursor-pointer rounded-xl border border-[#e4e4e4] bg-[#ffffff] p-6 shadow-sm transition-shadow hover:shadow-md"
                    onClick={() => router.push(`/goal/${goal.id}`)}
                  >
                    <div className="mb-4">
                      <p className="mb-1 text-sm text-[#a8a8a8]">완료예정일</p>
                      <p className="text-lg font-semibold text-[#000000]">
                        {goal.start_date
                          ? new Date(goal.start_date).toLocaleDateString(
                              "ko-KR"
                            )
                          : "미정"}
                      </p>
                    </div>

                    {/* Progress Circle */}
                    <div className="mb-6 flex justify-center">
                      <div className="relative h-24 w-24">
                        <svg
                          className="h-24 w-24 -rotate-90 transform"
                          viewBox="0 0 100 100"
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#e4e4e4"
                            strokeWidth="8"
                            fill="none"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#015bfa"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${(progressPercentage / 100) * 251.2} 251.2`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#015bfa] p-2">
                            <img
                              src={currentLevel.svgPath || "/placeholder.svg"}
                              alt={currentLevel.koreanName}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Goal Title */}
                    <h3 className="mb-2 text-center text-xl font-bold text-[#000000]">
                      {goal.title}
                    </h3>

                    {/* Progress Text */}
                    <p className="mb-4 text-center text-[#a8a8a8]">
                      <span className="font-semibold text-[#000000]">
                        {currentDay}일째
                      </span>
                      /{totalDays}일
                    </p>

                    {/* Profile Images */}
                    <div className="mb-6 flex justify-center">
                      <div className="flex -space-x-2">
                        {goal.goal_participants
                          ?.slice(0, 2)
                          .map((participant: any, index: number) => (
                            <div
                              key={index}
                              className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-[#e4e4e4]"
                            >
                              <img
                                src={
                                  participant.users?.profile_pic_url ||
                                  "/placeholder.svg?height=32&width=32&query=user avatar" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg"
                                }
                                alt="Profile"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                      </div>
                    </div>

                    <Button
                      className={`relative z-10 w-full rounded-xl py-3 font-medium transition-colors ${
                        isCheckedIn
                          ? "bg-[#22c55e] text-white hover:bg-[#16a34a]"
                          : "bg-[#015bfa] text-white hover:bg-[#0146d1]"
                      }`}
                      onClick={(e) => handleCheckIn(goal.id, e)}
                      disabled={isCheckedIn}
                    >
                      {isCheckedIn ? "✓ 출석 완료" : "출석하기"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="px-4 text-sm text-[#a8a8a8]">완료예정일</p>
          </div>
        </div>
      </div>
    </main>
  );
}
