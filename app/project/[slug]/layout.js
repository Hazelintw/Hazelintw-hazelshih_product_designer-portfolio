import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

const SIDEBAR_LINKS = [
  { id: "overview",  label: "Overview"  },
  { id: "situation", label: "Situation" },
  { id: "design",    label: "Design"    },
]

export default function ProjectLayout({ children }) {
  return (
    /*
     * 兩欄從頁面最頂部（y:0）開始切割，不留 pt-14。
     * 左欄 sticky + h-screen：Navbar 置頂，Sidebar 跟隨，頁面捲動時左欄固定。
     * 右欄 flex-1：自然流，隨頁面捲動。
     *
     * RWD：
     *   < lg  → 左欄隱藏，右欄全寬（手機 / 平板）
     *   ≥ lg  → 左欄 1/3，右欄 2/3
     */
    <div className="flex min-h-screen">

      {/* ── 左欄：1/3 寬，sticky ─────────────────────── */}
      <aside
        className={[
          // 桌面才顯示
          "hidden lg:flex lg:flex-col",
          // 寬度：1/3 螢幕
          "lg:w-1/3",
          // 頂部固定，不隨頁面捲動
          "sticky top-0 h-screen",
          // 超出高度時可內部捲動（sidebar 內容很長時）
          "overflow-y-auto",
          // 分隔線
          "border-r",
        ].join(" ")}
      >
        {/* Navbar（isStatic：一般 in-flow，不 fixed）*/}
        <Navbar isStatic />

        {/* Sidebar anchor 導覽 */}
        <div className="flex-1 px-6 py-8">
          <Sidebar title="On this page" links={SIDEBAR_LINKS} />
        </div>
      </aside>

      {/* ── 右欄：2/3 寬，主內容 ────────────────────── */}
      <div className="flex-1 min-w-0 lg:w-2/3 flex flex-col">
        {/*
         * 手機版：左欄隱藏，這裡補回 Navbar（全域 fixed 版）
         * 桌面版：左欄已有 Navbar，這裡隱藏避免重複
         */}
        <div className="lg:hidden">
          <Navbar />
        </div>

        {/* 手機版補 pt-14 讓 fixed Navbar 不遮內容 */}
        <main className="flex-1 pt-14 lg:pt-0">
          {children}
        </main>
      </div>

    </div>
  )
}
