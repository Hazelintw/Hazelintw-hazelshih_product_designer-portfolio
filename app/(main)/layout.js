import { LeftPanelProvider } from "@/lib/left-panel-context"
import LeftPanel from "@/components/LeftPanel"

export default function MainLayout({ children }) {
  return (
    <LeftPanelProvider>
      {/* 左側：LeftPanel 固定 280px，從 Context 讀取 links */}
      <LeftPanel />

      {/* 右側：主內容區 */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </LeftPanelProvider>
  )
}
