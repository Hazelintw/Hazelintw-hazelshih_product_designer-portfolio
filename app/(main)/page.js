import { SetPanelLinks } from "@/lib/left-panel-context"
import ProjectCard from "@/components/ProjectCard"
import TimelineList from "@/components/TimelineList"
import ProjectBadge from "@/components/Badge"

const HOME_LINKS = [
  { id: "works",      label: "Works"        },
  { id: "experience", label: "Experience"   },
  { id: "ai",         label: "How I use AI" },
]

/* ── 假資料 ─────────────────────────────────────────── */

const EXPERIENCE = [
  {
    id: "iverson",
    logo: null,
    company: "Iverson",
    role: "Product Designer",
    period: "2025",
    content: (
      <p className="px-1">
        負責 iOS app 的整體 UX 設計與 design system 建立，從 0 到 1 完成產品上線。
      </p>
    ),
  },
  {
    id: "allup",
    logo: null,
    company: "allUP",
    role: "Product Designer",
    period: "2023 ~ 2025",
    content: (
      <p className="px-1">
        主導 B2B SaaS 產品的設計流程，包含使用者研究、wireframe、prototype 到 handoff。
      </p>
    ),
  },
]

/* ── Page ───────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <SetPanelLinks links={HOME_LINKS} showText showButton showFooter />

      {/* ── Section Label ─── */}
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Component Preview
      </p>

      {/* ── 1. Badge ────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">Badge</h2>
        <div className="flex flex-wrap gap-2">
          <ProjectBadge label="App" />
          <ProjectBadge label="Web" />
          <ProjectBadge label="UI" />
          <ProjectBadge label="Workshop" />
          <ProjectBadge label="Fun stuff" variant="outline" />
        </div>
      </section>

      {/* ── 2. ProjectCard ──────────────────────────── */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">ProjectCard</h2>
        <ProjectCard
          slug="test"
          projectName="APP 設計"
          title="測試專案"
          description="這是測試說明文字，展示 ProjectCard 元件的基本排版效果。"
          badges={["App", "UI"]}
        />
      </section>

      {/* ── 3. TimelineList ─────────────────────────── */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">TimelineList</h2>
        <TimelineList items={EXPERIENCE} />
      </section>

    </div>
  )
}
