"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Suspense } from "react";

import { cn } from "@/lib/utils";
import { HomeIcon } from "./home-icon";
import { GoalsIcon } from "./goals-icon";
import { ProfileIcon } from "./profile-icon";

const navItems = [
  {
    name: "Home",
    href: "/home",
    icon: (isActive: boolean) => HomeIcon({ isActive }),
  },
  {
    name: "Goals",
    href: "/goals",
    icon: (isActive: boolean) => GoalsIcon({ isActive }),
  },
  {
    name: "Profile",
    href: "/profile",
    icon: (isActive: boolean) => ProfileIcon({ isActive }),
  },
];

export function BottomNavigation() {
  return (
    <nav className="pb-safe fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-around px-4">
        <NavItems />
      </div>
    </nav>
  );
}

function NavItems() {
  return navItems.map((item) => {
    return (
      <Suspense fallback={<NavItemFallback item={item} />} key={item.name}>
        <NavItemImpl item={item} />
      </Suspense>
    );
  });
}

function NavItemFallback({ item }: { item: (typeof navItems)[number] }) {
  return <NavItemContent item={item} pathname={""} params={{ userId: "#" }} />;
}

function NavItemImpl({ item }: { item: (typeof navItems)[number] }) {
  const params = useParams<{ userId: string }>();
  const pathname = usePathname();

  return <NavItemContent item={item} pathname={pathname} params={params} />;
}

function NavItemContent({
  item,
  pathname,
  params,
}: {
  item: (typeof navItems)[number];
  pathname: string;
  params: { userId: string };
}) {
  const href = `/${params.userId}${item.href}`;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 transition-colors",
        "min-w-0 flex-1 text-center no-underline"
      )}
    >
      <span
        className={cn(
          "text-xl",
          isActive ? "text-app-primary" : "text-gray-700"
        )}
      >
        {item.icon(isActive)}
      </span>
      <span
        className={cn(
          "text-xs font-medium",
          isActive ? "text-app-primary" : "text-gray-700"
        )}
      >
        {item.name}
      </span>
    </Link>
  );
}
