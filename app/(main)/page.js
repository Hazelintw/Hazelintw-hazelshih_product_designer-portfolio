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

/* ── AllWorksCard（inline 元件）──────────────────────── */

function AllWorksCard() {
  return (
    <Link href="/works" className="block h-full group">
      <div className="h-full rounded-xl border bg-card flex flex-col justify-between px-8 py-10 transition-shadow duration-200 hover:shadow-md">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold leading-snug">View all works</h3>
          <p className="text-sm text-muted-foreground">Web / App / Workshop / Fun stuff</p>
        </div>
        <div className="flex justify-end">
          <ArrowRight className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </div>
    </Link>
  )
}

/* ── Page ───────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="flex flex-col divide-y">
      <SetPanelLinks links={HOME_LINKS} showText showButton showFooter />

      {/* ══ Section 1：Works（無 SectionLayout 標題）══ */}
      <div id="works" className="flex flex-col gap-5 py-10">

        {/* 前兩張：全寬 */}
        <ProjectCard {...PROJECTS[0]} />
        <ProjectCard {...PROJECTS[1]} />

        {/* 第三排：左 2/3 ProjectCard + 右 1/3 AllWorksCard */}
        <div className="grid grid-cols-3 gap-5 items-stretch h-[320px]">
          <div className="col-span-2">
            <ProjectCard {...PROJECTS[2]} className="h-full" />
          </div>
          <AllWorksCard />
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
