'use client'

import type { Goal } from "@/lib/goals-data";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { getCurrentBoatLevel } from "@/lib/boat-levels";
import { ParticipateButton } from "./participate-button";

export function GoalCard({ goal }: { goal: Goal }) {
  const params = useParams<{ userId: string }>();
  const router = useRouter();

  const currentLevel = getCurrentBoatLevel(
    goal.currentDay || 0,
    goal.totalDays || 30
  );

  const progressPercentage =
    ((goal.currentDay || 0) / (goal.totalDays || 1)) * 100;

  return (
    <div
      className="block cursor-pointer rounded-xl border border-[#e4e4e4] bg-[#ffffff] p-6 shadow-sm transition-shadow hover:shadow-md"
      onClick={() => router.push(`/${params.userId}/goals/${goal.id}`)}
    >
      <div className="mb-4">
        <p className="text-app-disabled mb-1 text-sm">완료예정일</p>
        <p className="text-lg font-semibold text-black">
          {goal.completionDate}
        </p>
      </div>

      {/* Progress Circle */}
      <div className="mb-6 flex justify-center">
        <div className="relative h-24 w-24">
          <svg className="h-24 w-24 -rotate-90 transform" viewBox="0 0 100 100">
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
              <Image
                src={currentLevel.svgPath || "/placeholder.svg"}
                alt={currentLevel.koreanName}
                className="h-full w-full object-contain"
                width={64}
                height={64}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Goal Title */}
      <h3 className="mb-2 text-center text-xl font-bold text-black">
        {goal.title}
      </h3>

      {/* Progress Text */}
      <p className="text-app-disabled mb-4 text-center">
        <span className="font-semibold text-black">{goal.currentDay}일째</span>/
        {goal.totalDays}일
      </p>

      {/* Profile Images */}
      <div className="mb-6 flex justify-center">
        <div className="flex -space-x-2">
          <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-[#e4e4e4]">
            <Image
              src="/dog-profile.png"
              alt="Profile 1"
              className="h-full w-full object-cover"
              width={32}
              height={32}
            />
          </div>
          <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-[#e4e4e4]">
            <Image
              src="/cat-profile.jpg"
              alt="Profile 2"
              className="h-full w-full object-cover"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>

      <ParticipateButton goalId={goal.id} />
    </div>
  );
}
