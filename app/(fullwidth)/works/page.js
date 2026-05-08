"use client"

import { useState } from "react"
import MasonryGrid from "@/components/MasonryGrid"
import FilterTabs from "@/components/FilterTabs"

const TABS = [
  { id: "all",   label: "All"   },
  { id: "app",   label: "App"   },
  { id: "web",   label: "Web"   },
  { id: "other", label: "Other" },
]

/* ── 假資料（之後換成 Notion API） ──────────────────────
   圖片使用 picsum.photos placeholder，seed 固定讓圖片不每次變動
   width / height 故意不同，展示瀑布流高度差異
──────────────────────────────────────────────────────── */
const ALL_PROJECTS = [
  {
    id: "iverson",
    src: "https://picsum.photos/seed/iverson/800/1067",
    alt: "Iverson App",
    href: "/project/iverson",
    width: 800,
    height: 1067,
    category: "app",
  },
  {
    id: "allup",
    src: "https://picsum.photos/seed/allup/800/600",
    alt: "allUP Dashboard",
    href: "/project/allup",
    width: 800,
    height: 600,
    category: "web",
  },
  {
    id: "finsync",
    src: "https://picsum.photos/seed/finsync/800/900",
    alt: "Finsync Mobile",
    href: "/project/finsync",
    width: 800,
    height: 900,
    category: "app",
  },
  {
    id: "vizio",
    src: "https://picsum.photos/seed/vizio/800/600",
    alt: "Vizio Brand",
    href: "/project/vizio",
    width: 800,
    height: 600,
    category: "other",
  },
]

export default function WorksPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filtered =
    activeTab === "all"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === activeTab)

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Work</h1>

      <FilterTabs tabs={TABS} value={activeTab} onChange={setActiveTab} />

      <div className="mt-8">
        {filtered.length > 0 ? (
          <MasonryGrid
            items={filtered}
            className="columns-1 md:columns-1 lg:columns-2"
          />
        ) : (
          <p className="text-sm text-muted-foreground">此分類目前沒有作品。</p>
        )}
      </div>
    </section>
  )
}
