"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Notification = {
  id: string;
  type: "participate" | "invitation" | "general";
  title: string;
  message: string;
  timestamp: string;
  profileImage?: string;
};

// Load dummy notifications
const dummyNotifications: Notification[] = [
  {
    id: "1",
    type: "participate",
    title: "출석 체크 마감 임박",
    message: "오늘의 출석체크 가능 시간이 1시간밖에 남지 않았어요",
    timestamp: "3분 전",
  },
  {
    id: "2",
    type: "invitation",
    title: "목표 초대",
    message: "Doja님이 고양이 댄스 목표에 초대했습니다.",
    timestamp: "15분 전",
    profileImage: "/cute-dog-profile.png",
  },
  {
    id: "3",
    type: "invitation",
    title: "목표 초대",
    message: "Doja님이 고양이 댄스 목표에 초대했습니다.",
    timestamp: "1시간 전",
    profileImage: "/cute-dog-profile.png",
  },
  {
    id: "4",
    type: "invitation",
    title: "목표 초대",
    message: "Doja님이 고양이 댄스 목표에 초대했습니다.",
    timestamp: "1일 전",
    profileImage: "/cute-dog-profile.png",
  },
  {
    id: "5",
    type: "invitation",
    title: "목표 초대",
    message: "Doja님이 고양이 댄스 목표에 초대했습니다.",
    timestamp: "5일 전",
    profileImage: "/cute-dog-profile.png",
  },
  {
    id: "6",
    type: "invitation",
    title: "목표 초대",
    message: "Doja님이 고양이 댄스 목표에 초대했습니다.",
    timestamp: "10일 전",
    profileImage: "/cute-dog-profile.png",
  },
];

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] =
    useState<Notification[]>(dummyNotifications);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSwipeStart = (e: React.TouchEvent, id: string) => {
    const startX = e.touches[0].clientX;
    const element = e.currentTarget as HTMLElement;

    const handleSwipeMove = (moveEvent: TouchEvent) => {
      const currentX = moveEvent.touches[0].clientX;
      const diffX = startX - currentX;

      if (diffX > 0) {
        element.style.transform = `translateX(-${Math.min(diffX, 100)}px)`;
        element.style.opacity = `${Math.max(1 - diffX / 200, 0.3)}`;
      }
    };

    const handleSwipeEnd = (endEvent: TouchEvent) => {
      const endX = endEvent.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (diffX > 100) {
        removeNotification(id);
      } else {
        element.style.transform = "translateX(0)";
        element.style.opacity = "1";
      }

      document.removeEventListener("touchmove", handleSwipeMove);
      document.removeEventListener("touchend", handleSwipeEnd);
    };

    document.addEventListener("touchmove", handleSwipeMove);
    document.addEventListener("touchend", handleSwipeEnd);
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Header */}
      <header className="flex items-center justify-between bg-[#ffffff] p-4">
        <h1 className="text-2xl font-bold text-[#000000]">알림</h1>
        <Button
          variant="ghost"
          size="icon"
          className="bg-[#f0f8ff] text-[#015bfa] hover:bg-[#e0f0ff]"
          onClick={() => router.back()}
        >
          <span className="text-lg">✕</span>
        </Button>
      </header>

      <div className="px-4 pb-20">
        {notifications.length === 0 ? (
          // Empty State
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f8f8f8]">
              <span className="text-3xl">🔔</span>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-[#000000]">
              새로운 알림이 없어요
            </h2>
            <p className="mb-8 text-[#aeaeae]">
              알림이 생기도록 활발한
              <br />
              활동 부탁 드립니다 🔥💪🔥
            </p>
            <Button
              onClick={() => router.back()}
              className="rounded-full bg-[#015bfa] px-8 py-3 text-white hover:bg-[#0146d1]"
            >
              ← 뒤로가기
            </Button>
          </div>
        ) : (
          // Notifications List
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="rounded-lg border border-[#e4e4e4] bg-[#ffffff] p-4 transition-all duration-200"
                onTouchStart={(e) => handleSwipeStart(e, notification.id)}
              >
                <div className="flex items-start space-x-3">
                  {/* Icon/Profile Image */}
                  <div className="shrink-0">
                    {notification.type === "participate" ? (
                      <div className="flex items-center space-x-1">
                        <span className="text-2xl">⚠️😱</span>
                      </div>
                    ) : notification.profileImage ? (
                      <Image
                        src={notification.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f0f0]">
                        <span className="text-lg">🔔</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <p className="leading-relaxed font-medium text-[#000000]">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-sm text-[#aeaeae]">
                      {notification.timestamp}
                    </p>

                    {/* Action Button */}
                    {notification.type === "participate" && (
                      <ParticipateButton />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ParticipateButton() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  return (
    <Button
      onClick={() => {
        // TODO: add checkin
        console.log("출석 체크");
        setIsCheckedIn(!isCheckedIn);
      }}
      className={cn(
        "mt-3 rounded-full px-6 py-2 text-sm text-white",
        isCheckedIn
          ? "bg-[#22c55e] hover:bg-[#16a34a]"
          : "bg-[#015bfa] hover:bg-[#0146d1]"
      )}
    >
      🏃 {isCheckedIn ? "출석 완료" : "출석 체크하기"}
    </Button>
  );
}
