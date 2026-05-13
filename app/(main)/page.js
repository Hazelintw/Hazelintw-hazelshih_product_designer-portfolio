import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SetPanelLinks } from "@/lib/left-panel-context"
import SectionLayout from "@/components/SectionLayout"
import ProjectCard from "@/components/ProjectCard"
import MiniCard from "@/components/MiniCard"
import TimelineList from "@/components/TimelineList"
import AIUsageItem from "@/components/AIUsageItem"

const HOME_LINKS = [
  { id: "works",      label: "Works"        },
  { id: "experience", label: "Experience"   },
  { id: "ai",         label: "How I use AI" },
]

/* ── Works 假資料 ─────────────────────────────────────── */

const PROJECTS = [
  {
    slug: "iverson",
    projectName: "Iverson",
    title: "從 0 到 1 打造健身紀錄 App 的完整設計流程",
    description: "負責 iOS app 的整體 UX 設計與 design system 建立，從使用者研究到 design handoff。",
    badges: ["App", "UI", "Design System"],
    image: "https://picsum.photos/seed/iverson/800/450",
  },
  {
    slug: "allup",
    projectName: "allUP",
    title: "B2B SaaS Dashboard 的資訊架構重設計",
    description: "主導 B2B SaaS 產品的設計流程，包含使用者研究、wireframe、prototype 到 handoff。",
    badges: ["Web", "B2B", "SaaS"],
    image: "https://picsum.photos/seed/allup/800/450",
  },
  {
    slug: "finsync",
    projectName: "Finsync",
    title: "個人財務管理 App 的互動設計與視覺語言",
    description: "定義品牌視覺語言，設計完整的 onboarding 流程與核心功能頁面。",
    badges: ["App", "Fintech"],
    image: "https://picsum.photos/seed/finsync/800/450",
  },
]

/* ── Experience 假資料 ────────────────────────────────── */

const EXPERIENCE = [
  {
    id: "exp-1",
    logo: null,
    company: "Iverson",
    role: "Product Designer",
    period: "2024 – 2025",
    content: <p className="px-1">負責 iOS app 的整體 UX 設計與 design system 建立，從 0 到 1 完成產品上線。</p>,
  },
  {
    id: "exp-2",
    logo: null,
    company: "allUP",
    role: "Product Designer",
    period: "2022 – 2024",
    content: <p className="px-1">主導 B2B SaaS 產品的設計流程，包含使用者研究、wireframe、prototype 到 handoff。</p>,
  },
  {
    id: "exp-3",
    logo: null,
    company: "Finsync",
    role: "UI/UX Designer",
    period: "2021 – 2022",
    content: <p className="px-1">定義品牌視覺語言，設計完整的 onboarding 流程與核心功能頁面。</p>,
  },
  {
    id: "exp-4",
    logo: null,
    company: "Freelance",
    role: "Visual Designer",
    period: "2020 – 2021",
    content: <p className="px-1">為多個新創品牌提供品牌識別設計與行銷視覺製作。</p>,
  },
  {
    id: "exp-5",
    logo: null,
    company: "National Taiwan University",
    role: "B.S. Information Management",
    period: "2016 – 2020",
    content: null,
  },
]

/* ── AI Usage 假資料 ──────────────────────────────────── */

const AI_ITEMS = [
  {
    icon: null,
    title: "Research & Synthesis",
    description: "使用 AI 快速整理使用者訪談逐字稿，找出關鍵痛點與行為模式，大幅縮短 affinity mapping 的時間。",
  },
  {
    icon: null,
    title: "Copywriting",
    description: "協助撰寫 UI 文案、onboarding 流程說明與 error message，讓文字更清晰、更具一致性。",
  },
  {
    icon: null,
    title: "Code Prototyping",
    description: "透過 AI 生成互動原型與動態效果，快速驗證設計想法，加速與工程師的溝通效率。",
  },
  {
    icon: null,
    title: "Design Critique",
    description: "將設計稿描述給 AI，獲得不同角度的反饋，作為自我審查與優化的輔助工具。",
  },
]

/* ── MiniCard 假資料 ──────────────────────────────────── */

const MINI_ITEMS = [
  {
    href: "/playground/brand-identity",
    category: "Playground",
    title: "品牌識別系統探索：從 Moodboard 到 Logo",
    badges: ["Branding", "Visual"],
    image: "https://picsum.photos/seed/mini1/800/450",
  },
  {
    href: "/playground/design-system",
    category: "Playground",
    title: "個人 Design System：元件庫建立與 Token 定義",
    badges: ["Design System", "Figma"],
    image: "https://picsum.photos/seed/mini2/800/450",
  },
]

/* ── Page ───────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <SetPanelLinks links={HOME_LINKS} showText showButton showFooter />

      {/* ══ Section 1：Works ═════════════════════════ */}
      <div id="works" className="rounded-2xl bg-muted p-5 flex flex-col gap-5">

        {/* 全寬 ProjectCard × 3 */}
        <ProjectCard {...PROJECTS[0]} />
        <ProjectCard {...PROJECTS[1]} />
        <ProjectCard {...PROJECTS[2]} />

        {/* MiniCard × 2，各佔 1/2 */}
        <div className="grid grid-cols-2 gap-5">
          {MINI_ITEMS.map((item) => (
            <MiniCard key={item.href} {...item} />
          ))}
        </div>

      </div>

      {/* ══ Section 2：Experience ═════════════════════ */}
      <SectionLayout
        id="experience"
        title="Experience"
        subtitle={
          <Link
            href="/about"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            More about me? <ArrowRight className="size-3" />
          </Link>
        }
      >
        <TimelineList items={EXPERIENCE} />
      </SectionLayout>

      {/* ══ Section 3：How I use AI ═══════════════════ */}
      <SectionLayout
        id="ai"
        title="How I use AI"
        subtitle="AI seems inevitable, here's how I'm attempting to use it ethically and proactively."
      >
        {/* divide-y 自動在子元素之間加分隔線，首尾不加 */}
        <div className="flex flex-col divide-y">
          {AI_ITEMS.map((item) => (
            <AIUsageItem key={item.title} {...item} />
          ))}
        </div>
      </SectionLayout>

    </div>
  )
}
