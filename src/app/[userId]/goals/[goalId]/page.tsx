// TODO: interception route

"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit3 } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { use, useState } from "react";
import { ProfileModal } from "./profile-modal";
import { hasCheckedInToday, markAttendance } from "@/lib/attendance-data";
import { getGoalById } from "@/lib/goals-data";
import {
  getCurrentBoatLevel,
  getNextBoatLevel,
  getDaysToNextLevel,
} from "@/lib/boat-levels";

export default function GoalDetailPage() {
  const router = useRouter();
  const params = useParams<{ userId: string, goalId: string }>();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const goalId = Number.parseInt(params.goalId);
  const [isCheckedIn, setIsCheckedIn] = useState(() =>
    hasCheckedInToday(goalId)
  );

  const goal = getGoalById(goalId);

  console.log({goalId, goal});
  if (!goal) {
    notFound();
  }

  const currentLevel = getCurrentBoatLevel(
    goal.currentDay || 0,
    goal.totalDays || 30
  );
  const nextLevel = getNextBoatLevel(
    goal.currentDay || 0,
    goal.totalDays || 30
  );
  const daysToNext = getDaysToNextLevel(
    goal.currentDay || 0,
    goal.totalDays || 30
  );
  const progressPercentage =
    ((goal.currentDay || 0) / (goal.totalDays || 1)) * 100;

  const handleProfileClick = (userType: "dog" | "cat") => {
    setSelectedUser({
      name: "미친 강아지 킹울",
      avatar: "/dog-profile.png",
      description: "나는 미친 강아지 미친 강아지 미친 강아지",
      inProgressGoals: 2,
      completedGoals: 5,
      colleagues: 8,
    });
    setIsProfileModalOpen(true);
  };

  const handleCheckIn = () => {
    if (isCheckedIn) {
      // Already checked in today
      return;
    }

    const success = markAttendance(goalId);
    if (success) {
      setIsCheckedIn(true);

      // Show success feedback
      console.log(`[v0] Successfully checked in for goal ${goalId}`);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#ffffff]">
        <div className="relative bg-gradient-to-b from-[#015bfa] to-[#2d94f8] px-4 py-6">
          <div className="mb-8 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="rounded-full bg-white/20 px-4 py-2">
              <span className="font-medium text-white">
                {currentLevel.koreanName}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Edit3 className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center">
            <div className="relative h-24 w-32">
              <img
                src={currentLevel.svgPath || "/placeholder.svg"}
                alt={currentLevel.koreanName}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 -mt-4 flex-1 rounded-t-3xl bg-white p-4">
          {/* Goal Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="mb-1 text-2xl font-bold text-[#000000]">
                {goal.title}
              </h1>
              <p className="text-[#a8a8a8]">
                <span className="text-lg font-semibold text-[#000000]">
                  {goal.currentDay}일째
                </span>
                /{goal.totalDays}일
              </p>
            </div>
            <div className="flex -space-x-2">
              <div
                className="h-12 w-12 cursor-pointer overflow-hidden rounded-full border-2 border-white bg-[#e4e4e4] transition-transform hover:scale-110"
                onClick={() => handleProfileClick("dog")}
              >
                <img
                  src="/dog-profile.png"
                  alt="Profile 1"
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className="h-12 w-12 cursor-pointer overflow-hidden rounded-full border-2 border-white bg-[#e4e4e4] transition-transform hover:scale-110"
                onClick={() => handleProfileClick("cat")}
              >
                <img
                  src="/cat-profile.jpg"
                  alt="Profile 2"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-6">
            <h2 className="mb-4 text-lg font-semibold text-[#000000]">
              진행도
            </h2>
            <div className="mb-2 text-right">
              <span className="text-sm text-[#a8a8a8]">
                {nextLevel
                  ? `${nextLevel.koreanName}까지 ${daysToNext}일`
                  : "목표 달성!"}
              </span>
            </div>

            <div className="relative mb-2">
              <div className="h-3 overflow-hidden rounded-full bg-[#e4e4e4]">
                <div
                  className="relative h-full rounded-full bg-[#015bfa]"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 transform">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#015bfa]">
                      <img
                        src={currentLevel.svgPath || "/placeholder.svg"}
                        alt={currentLevel.koreanName}
                        className="h-3 w-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {nextLevel && (
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 transform">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#e4e4e4] bg-white">
                    <img
                      src={nextLevel.svgPath || "/placeholder.svg"}
                      alt={nextLevel.koreanName}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between text-sm text-[#a8a8a8]">
              <span>1일차</span>
              <span className="font-medium text-[#015bfa]">
                {Math.round(progressPercentage)}%
              </span>
              <span>{goal.totalDays}일차</span>
            </div>
          </div>

          {/* Detail Information */}
          <div className="mb-6">
            <h2 className="mb-4 text-lg font-semibold text-[#000000]">
              상세 정보
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-[#f9f9f9] p-4">
                <p className="mb-1 text-sm text-[#a8a8a8]">현재 진행도 🏆</p>
                <p className="text-xl font-bold text-[#000000]">
                  {goal.currentDay}{" "}
                  <span className="text-sm font-normal">일차</span>
                </p>
              </div>
              <div className="rounded-lg bg-[#f9f9f9] p-4">
                <p className="mb-1 text-sm text-[#a8a8a8]">목표 날짜 🏁</p>
                <p className="text-lg font-semibold text-[#000000]">
                  {goal.completionDate}
                  <span className="text-sm font-normal">까지</span>
                </p>
              </div>
              <div className="rounded-lg bg-[#f9f9f9] p-4">
                <p className="mb-1 text-sm text-[#a8a8a8]">현재 단계</p>
                <p className="text-lg font-semibold text-[#000000]">
                  {currentLevel.koreanName}
                </p>
              </div>
              <div className="rounded-lg bg-[#f9f9f9] p-4">
                <p className="mb-1 text-sm text-[#a8a8a8]">다음 단계</p>
                <p className="text-lg font-semibold text-[#000000]">
                  {nextLevel ? nextLevel.koreanName : "완료!"}
                </p>
              </div>
            </div>
          </div>

          {/* Check-in History */}
          <div className="mb-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#000000]">
                출석 기록부
              </h2>
              <Button
                variant="ghost"
                className="h-auto p-0 text-sm text-[#015bfa]"
                onClick={() => router.push(`/${params.userId}/goals/${goalId}/participants`)}
              >
                전체보기
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { day: 15, date: "6/28" },
                { day: 16, date: "6/29" },
                { day: 17, date: "6/30" },
              ].map((entry) => (
                <div
                  key={entry.day}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <p className="font-semibold text-[#000000]">
                      {entry.day}일차
                    </p>
                    <p className="text-sm text-[#015bfa]">
                      {entry.date} 모두 출석 완료
                    </p>
                  </div>
                  <div className="flex -space-x-1">
                    <div
                      className="h-8 w-8 cursor-pointer overflow-hidden rounded-full border border-white bg-[#e4e4e4] transition-transform hover:scale-110"
                      onClick={() => handleProfileClick("dog")}
                    >
                      <img
                        src="/dog-profile.png"
                        alt="Profile 1"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div
                      className="h-8 w-8 cursor-pointer overflow-hidden rounded-full border border-white bg-[#e4e4e4] transition-transform hover:scale-110"
                      onClick={() => handleProfileClick("cat")}
                    >
                      <img
                        src="/cat-profile.jpg"
                        alt="Profile 2"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Check In Button */}
          <div className="mb-4 pb-8">
            <button
              className={`w-full rounded-xl py-4 text-lg font-medium transition-colors ${
                isCheckedIn
                  ? "bg-[#22c55e] text-white hover:bg-[#16a34a]"
                  : "bg-[#015bfa] text-white hover:bg-[#0146d1]"
              }`}
              onClick={handleCheckIn}
              disabled={isCheckedIn}
            >
              {isCheckedIn ? "✓ 출석 완료" : "✓ 출석하기"}
            </button>
          </div>
        </div>

        {selectedUser && (
          <ProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            user={selectedUser}
          />
        )}
      </div>
    </>
  );
}
