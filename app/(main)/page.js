import { SetPanelLinks } from "@/lib/left-panel-context"
import ProjectCard from "@/components/ProjectCard"
import TimelineList from "@/components/TimelineList"
import ProjectBadge from "@/components/Badge"
import MiniCard from "@/components/MiniCard"
import AIUsageItem from "@/components/AIUsageItem"
import SectionLayout from "@/components/SectionLayout"

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

const MINI_CARDS = [
  {
    href: "/project/iverson",
    category: "App",
    title: "Iverson — 健身紀錄 App",
    badges: ["App", "UI"],
    image: "https://picsum.photos/seed/iverson/800/450",
  },
  {
    href: "/project/allup",
    category: "Web",
    title: "allUP — B2B SaaS Dashboard",
    badges: ["Web", "B2B"],
    image: "https://picsum.photos/seed/allup/800/450",
  },
  {
    href: "/project/finsync",
    category: "App",
    title: "Finsync — 個人財務管理",
    badges: ["App", "UI"],
    image: null,
  },
]

const AI_ITEMS = [
  {
    icon: null,
    title: "Research & Synthesis",
    description: "使用 AI 快速整理使用者訪談逐字稿，找出關鍵痛點與行為模式。",
  },
  {
    icon: null,
    title: "Copywriting",
    description: "協助撰寫 UI 文案、onboarding 流程說明，讓文字更清晰易懂。",
  },
  {
    icon: null,
    title: "Code Prototyping",
    description: "透過 AI 生成互動原型，快速驗證設計想法，加速與工程師的溝通。",
  },
]

/* ── Page ───────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <SetPanelLinks links={HOME_LINKS} showText showButton showFooter />

      {/* ── Section Label ─── */}
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-10">
        Component Preview
      </p>

      {/* ── 1. Badge ────────────────────────────────── */}
      <section className="flex flex-col gap-3 mb-16">
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
      <section className="flex flex-col gap-3 mb-16">
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
      <section className="flex flex-col gap-3 mb-16">
        <h2 className="text-sm font-medium text-muted-foreground">TimelineList</h2>
        <TimelineList items={EXPERIENCE} />
      </section>

      {/* ── 4. MiniCard ─────────────────────────────── */}
      <section className="flex flex-col gap-3 mb-16">
        <h2 className="text-sm font-medium text-muted-foreground">MiniCard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MINI_CARDS.map((card) => (
            <MiniCard key={card.href} {...card} />
          ))}
        </div>
      </section>

      {/* ── 5. AIUsageItem ──────────────────────────── */}
      <section className="flex flex-col gap-3 mb-16">
        <h2 className="text-sm font-medium text-muted-foreground">AIUsageItem</h2>
        <div className="flex flex-col">
          {AI_ITEMS.map((item) => (
            <AIUsageItem key={item.title} {...item} />
          ))}
          {/* 最後一筆的下分隔線 */}
          <div className="border-t" />
        </div>
      </section>

      {/* ── 6. SectionLayout ────────────────────────── */}
      <section className="flex flex-col gap-3 mb-16">
        <h2 className="text-sm font-medium text-muted-foreground">SectionLayout</h2>
        <SectionLayout id="section-demo" title="Selected Works" subtitle="2023 – 2025">
          <p className="text-sm text-muted-foreground">
            右側放入任意內容，左側顯示標題與副標題。
            適合用於 Works、Experience、How I use AI 等區塊。
          </p>
        </SectionLayout>
        <SectionLayout id="section-demo-2" title="Experience">
          <p className="text-sm text-muted-foreground">
            subtitle 選填，不傳時只顯示 title。
          </p>
        </SectionLayout>
      </section>

    </div>
  )
}
