import { Quote } from "./quote";
import { GoalCard } from "./goal-card";
import { getGoalsByStatus } from "@/lib/goals-data";
import { NotificationsButton } from "./notifications-button";

export default function HomePage() {
  const inProgressGoals = getGoalsByStatus("in-progress");

  return (
    <div className="flex min-h-screen flex-col bg-[#ffffff]">
      {/* Header */}
      <header className="flex items-center justify-between bg-[#ffffff] p-4">
        <h1 className="text-2xl font-bold text-[#000000]">홈</h1>
        <NotificationsButton />
      </header>

      <div className="flex-1 p-4">
        <Quote />

        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-[#000000]">
            진행중인 목표
          </h2>

          <div className="space-y-4">
            {inProgressGoals.map((goal) => {
              return <GoalCard key={goal.id} goal={goal} />;
            })}
          </div>
        </div>

        <div>
          <p className="text-app-disabled px-4 text-sm">완료예정일</p>
        </div>
      </div>
    </div>
  );
}
