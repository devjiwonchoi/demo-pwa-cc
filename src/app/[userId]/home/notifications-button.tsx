"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BellIcon } from "./bell-icon";

export function NotificationsButton() {
  const params = useParams<{ userId: string }>();
  return (
    <Button asChild variant="ghost" size="icon" className="text-black">
      <Link href={`/${params.userId}/notifications`} className="text-lg">
        <BellIcon />
      </Link>
    </Button>
  );
}
