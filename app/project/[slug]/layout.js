import Sidebar from "@/components/Sidebar"

const SIDEBAR_LINKS = [
  { id: "overview",  label: "Overview"  },
  { id: "situation", label: "Situation" },
  { id: "design",    label: "Design"    },
]

export default function ProjectLayout({ children }) {
  return (
    /*
     * pt-14 → 補 Navbar 固定高度
     * 整體水平置中，最寬 1152px
     */
    <div className="pt-14 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 flex items-start gap-10">

        {/* ── 左側 Sidebar（sticky，只在桌面顯示） ── */}
        <Sidebar
          title="On this page"
          links={SIDEBAR_LINKS}
          className="sticky top-24 self-start py-10"
        />

        {/* ── 右側主內容區 ─────────────────────────── */}
        <div className="flex-1 min-w-0">
          {children}
        </div>

      </div>
    </div>
  )
}
