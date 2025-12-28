import Link from "next/link"
import { Button } from "@/components/ui/button"

export function NotificationsButton() {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="text-black"
    >
      <Link href="/notifications" className="text-lg">🔔</Link>
    </Button>
  );
}