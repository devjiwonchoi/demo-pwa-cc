"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Dummy attendance data
const attendanceData = [
  {
    day: 15,
    date: "7/2",
    status: "1명 완료",
    profiles: ["/cute-dog-profile.png"],
  },
  {
    day: 15,
    date: "7/2",
    status: "전체 완료",
    profiles: ["/cute-dog-profile.png", "/cat-profile.jpg"],
  },
  {
    day: 15,
    date: "7/3",
    status: "1명 완료",
    profiles: ["/cute-dog-profile.png"],
  },
  {
    day: 15,
    date: "7/4",
    status: "0명 완료",
    profiles: ["/cute-dog-profile.png", "/cat-profile.jpg"],
  },
  {
    day: 15,
    date: "7/5",
    status: "전체 완료",
    profiles: ["/cute-dog-profile.png", "/cat-profile.jpg"],
  },
  {
    day: 15,
    date: "7/6",
    status: "전체 완료",
    profiles: ["/cute-dog-profile.png", "/cat-profile.jpg"],
  },
  {
    day: 15,
    date: "7/7",
    status: "전체 완료",
    profiles: ["/cute-dog-profile.png", "/cat-profile.jpg"],
  },
  {
    day: 15,
    date: "6/31",
    status: "전체 완료",
    profiles: ["/cute-dog-profile.png", "/cat-profile.jpg"],
  },
  {
    day: 15,
    date: "6/31",
    status: "전체 완료",
    profiles: ["/cute-dog-profile.png", "/cat-profile.jpg"],
  },
];

export default function AttendanceRecordPage() {
  const router = useRouter();
  const hasAttendance = attendanceData.length > 0;

  const getStatusColor = (status: string) => {
    if (status === "전체 완료")
      return "text-green-600 bg-green-50 border-green-200";
    if (status === "1명 완료")
      return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#ffffff]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f0f0f0] p-4">
          <h1 className="text-xl font-bold text-[#000000]">출석 기록</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#015bfa] hover:bg-[#015bfa]/10"
            onClick={() => router.back()}
          >
            <span className="text-lg">✕</span>
          </Button>
        </div>

        <div className="flex-1 p-4">
          {hasAttendance ? (
            <div className="space-y-4">
              {attendanceData.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-[#f0f0f0] py-3 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-2">
                      {record.profiles.map((profile, profileIndex) => (
                        <div
                          key={profileIndex}
                          className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-[#e4e4e4]"
                        >
                          <img
                            src={profile || "/placeholder.svg"}
                            alt={`Profile ${profileIndex + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="font-semibold text-[#000000]">
                        {record.day}일차
                      </p>
                      <p className="text-sm text-[#9b9b9b]">{record.date}</p>
                    </div>
                  </div>
                  <div
                    className={`rounded-full border px-3 py-1 text-sm font-medium ${getStatusColor(record.status)}`}
                  >
                    {record.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="mb-8 h-24 w-32">
                <svg viewBox="0 0 120 80" className="h-full w-full">
                  <path
                    d="M20 60 L60 20 L100 60 L85 70 L60 50 L35 70 Z"
                    fill="#d1d5db"
                    opacity="0.6"
                  />
                  <path
                    d="M60 20 L60 50"
                    stroke="#d1d5db"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                  <path
                    d="M20 60 L100 60 L90 75 L30 75 Z"
                    fill="#d1d5db"
                    opacity="0.4"
                  />
                </svg>
              </div>
              <p className="text-center text-[#9b9b9b]">
                아직 출석 기록이 없어요
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
