import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

const SIDEBAR_LINKS = [
  { id: "all",   label: "All"   },
  { id: "app",   label: "App"   },
  { id: "web",   label: "Web"   },
  { id: "other", label: "Other" },
]

export default function WorksLayout({ children }) {
  return (
    <div className="flex min-h-screen">

      {/* ── 左欄：1/3，sticky ───────────────────────── */}
      <aside className="hidden lg:flex lg:flex-col lg:w-1/3 sticky top-0 h-screen overflow-y-auto border-r">
        <Navbar isStatic />
        <div className="flex-1 px-6 py-8">
          <Sidebar title="Work" links={SIDEBAR_LINKS} />
        </div>
      </aside>

      {/* ── 右欄：2/3，主內容 ──────────────────────── */}
      <div className="flex-1 min-w-0 lg:w-2/3 flex flex-col">
        {/* 手機版補回 fixed Navbar */}
        <div className="lg:hidden">
          <Navbar />
        </div>
        <main className="flex-1 pt-14 lg:pt-0">
          {children}
        </main>
      </div>

    </div>
  )
}
