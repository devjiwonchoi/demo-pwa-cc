"use client";

import { Button } from "@/components/ui/button";
import { getGoals } from "@/lib/goals-data";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams<{ userId: string }>();
  const goals = getGoals();
  const inProgressCount = goals.filter(
    (goal) => goal.status === "in-progress"
  ).length;
  const completedCount = goals.filter(
    (goal) => goal.status === "completed"
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/auth");
  };

  const handleDeleteAccount = () => {
    if (confirm("정말로 회원 탈퇴하시겠습니까?")) {
      localStorage.removeItem("isLoggedIn");
      router.push("/auth");
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col bg-white">
        <header className="p-4">
          <h1 className="text-2xl font-bold text-black">프로필</h1>
        </header>

        <div className="px-6 py-4">
          {/* Profile Info */}
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
              <img
                src="/cute-dog-profile.png"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="mb-1 text-xl font-semibold text-black">
              김선과 요정라쿤 🧚
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              세상의 주인공처럼 살아봐~
            </p>

            <Link href={`/${params.userId}/profile/edit`}>
              <Button className="rounded-full bg-[#015bfa] px-8 py-2 text-white hover:bg-[#0146d1]">
                🏃 정보 수정
              </Button>
            </Link>
          </div>

          <div className="mb-8">
            <h3 className="mb-4 text-lg font-medium text-black">내 목표</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-3">
                <span className="text-black">진행중</span>
                <div className="flex items-center">
                  <span className="mr-2 text-black">{inProgressCount}</span>
                  <span className="text-gray-400">›</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-black">완료됨</span>
                <div className="flex items-center">
                  <span className="mr-2 text-black">{completedCount}</span>
                  <span className="text-gray-400">›</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-400">계정</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-black">아이디</span>
                <span className="text-gray-500">Kim0000@gmail.com</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-black">앱 관리</span>
                <span className="text-gray-500">10.7.2</span>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleLogout}
                  className="w-full rounded-lg bg-gray-100 py-3 text-black hover:bg-gray-200"
                >
                  로그아웃
                </Button>

                <Button
                  onClick={handleDeleteAccount}
                  className="w-full rounded-lg bg-red-50 py-3 text-red-600 hover:bg-red-100"
                >
                  회원 탈퇴하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
