import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { LeftPanelProvider } from "@/lib/left-panel-context"
import LeftPanel from "@/components/LeftPanel"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Portfolio",
  description: "My personal portfolio",
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className={cn(inter.className, "flex min-h-screen")}>
        <LeftPanelProvider>
          {/* 左側：LeftPanel 固定 280px，從 Context 讀取 links */}
          <LeftPanel />

          {/* 右側：主內容區 */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </LeftPanelProvider>
      </body>
    </html>
  )
}
