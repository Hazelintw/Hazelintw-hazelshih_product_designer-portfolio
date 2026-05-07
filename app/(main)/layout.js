import { LeftPanelProvider } from "@/lib/left-panel-context"
import LeftPanel from "@/components/LeftPanel"
import TopNav from "@/components/TopNav"

export default function MainLayout({ children }) {
  return (
    <LeftPanelProvider>
      {/* 桌機版左側 LeftPanel（手機隱藏，由 LeftPanel 自身 hidden md:flex 控制） */}
      <LeftPanel />

      {/* 右側欄：手機版頂部 TopNav + 主內容 */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* 手機版 TopNav（md 以上隱藏） */}
        <div className="md:hidden">
          <TopNav />
        </div>

        {/* 主內容區 */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </LeftPanelProvider>
  )
}
