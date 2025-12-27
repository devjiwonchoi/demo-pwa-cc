import { BottomNavigation } from './bottom-navigation'

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      <main className="flex-1 pb-20">{children}</main>
      <BottomNavigation />
    </div>
  )
}
