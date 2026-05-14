import { LeftPanelProvider } from "@/lib/left-panel-context"
import LeftPanel from "@/components/LeftPanel"
import TopNav from "@/components/TopNav"

export default function MainLayout({ children }) {
  return (
    <LeftPanelProvider>
      <LeftPanel />
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="md:hidden">
          <TopNav />
        </div>
        <div className="px-5 md:px-10 pt-8 pb-12">
          {children}
        </div>
      </div>
    </LeftPanelProvider>
  )
}
