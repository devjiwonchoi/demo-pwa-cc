"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "./toast";

export default function EditProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("요정라쿤 🧚");
  const [bio, setBio] = useState("세상의 주인공처럼 살아봐~");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("/cute-dog-profile.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = Math.random() > 0.3; // 70% success rate

    setToastType(success ? "success" : "error");
    setShowToast(true);
    setIsLoading(false);
  };

  const handleToastHide = () => {
    setShowToast(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col bg-white">
        {showToast && (
          <Toast
            message={
              toastType === "success"
                ? "프로필 수정이 완료됐어요."
                : "프로필 수정에 실패했어요."
            }
            type={toastType}
            show={showToast}
            onHide={handleToastHide}
            duration={3000}
          />
        )}

        <header className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-black">정보 수정</h1>
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
          >
            <span className="text-gray-600">✕</span>
          </button>
        </header>

        <div className="flex-1 px-6 py-4">
          {/* Profile Photo */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-full">
              <img
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                className="h-full w-full cursor-pointer object-cover"
                onClick={handleAvatarClick}
              />
              <div
                className="absolute right-2 bottom-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#015bfa]"
                onClick={handleAvatarClick}
              >
                <span className="text-sm text-white">✏️</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                닉네임
              </label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 p-4 text-base"
                placeholder="닉네임을 입력하세요"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                자기소개
              </label>
              <div className="relative">
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="h-32 w-full resize-none rounded-2xl border border-gray-200 p-4 text-base"
                  placeholder="자기소개를 입력하세요"
                  maxLength={100}
                />
                <div className="absolute right-3 bottom-3 text-sm text-gray-400">
                  {bio.length}/100
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="p-6">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full rounded-2xl bg-[#015bfa] py-4 text-lg font-medium text-white hover:bg-[#0146d1]"
          >
            {isLoading ? "저장 중..." : "⬇ 저장하기"}
          </Button>
        </div>
      </div>
    </>
  );
}
