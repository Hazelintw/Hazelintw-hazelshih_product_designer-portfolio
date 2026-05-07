import "./globals.css"
import { Inter } from "next/font/google"
import LeftPanel from "@/components/LeftPanel"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Portfolio",
  description: "My personal portfolio",
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className={cn(inter.className, "flex min-h-screen")}>
        {/* ── 左側：LeftPanel 固定 280px ── */}
        <LeftPanel />

        {/* ── 右側：主內容區 ── */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </body>
    </html>
  )
}
