/**
 * 暫時元件預覽頁 — /components-preview
 * 確認樣式後請刪除此檔案與資料夾
 */

import ProjectCard from "@/components/ProjectCard"
import MiniCard from "@/components/MiniCard"
import TimelineList from "@/components/TimelineList"
import AIUsageItem from "@/components/AIUsageItem"
import SectionLayout from "@/components/SectionLayout"
import Badge from "@/components/Badge"
import Footer from "@/components/Footer"
import ExperienceItem from "@/components/ExperienceItem"
import ArticleCard from "@/components/ArticleCard"
import CourseCard from "@/components/CourseCard"
import SectionCTA from "@/components/SectionCTA"

/* ── 假資料 ─────────────────────────────────────────────── */

const PROJECT = {
  slug: "iverson",
  projectName: "Iverson",
  title: "從 0 到 1 打造健身紀錄 App 的完整設計流程",
  description: "負責 iOS app 的整體 UX 設計與 design system 建立，從使用者研究到 design handoff。",
  badges: ["App", "UI", "Design System"],
  image: "https://picsum.photos/seed/iverson/800/450",
}

const MINI = {
  href: "/playground/demo",
  category: "Playground",
  title: "個人 Design System：元件庫建立與 Token 定義",
  badges: ["Design System", "Figma"],
  image: "https://picsum.photos/seed/mini1/800/450",
}

const TIMELINE_ITEMS = [
  {
    id: "t1",
    logo: null,
    company: "Iverson",
    role: "Product Designer",
    period: "2024 – 2025",
    content: <p className="px-1">負責 iOS app 的整體 UX 設計與 design system 建立。</p>,
  },
  {
    id: "t2",
    logo: null,
    company: "National Taiwan University",
    role: "B.S. Information Management",
    period: "2016 – 2020",
    content: null,
  },
]

const AI_ITEMS = [
  { title: "Research & Synthesis", description: "使用 AI 快速整理使用者訪談逐字稿，找出關鍵痛點與行為模式。" },
  { title: "Copywriting",          description: "協助撰寫 UI 文案、onboarding 流程說明與 error message。" },
]

const EXPERIENCE = {
  logo: "", title: "Product Designer", company: "英特內", date: "2024 - present",
}

const ARTICLE = {
  image: "",
  date: "Nov 2025",
  title: "Digital Leute, Cologne",
  description: "I talked about designing with AI and how to reduce frictions.",
  badges: ["Growth Design", "UX"],
  href: "#",
}

const COURSE = { logo: "", name: "六角學院 Vibe coding", year: "2025" }

/* ── 區塊 wrapper ────────────────────────────────────────── */
function Section({ name, children }) {
  return (
    <div>
      <div className="px-10 py-3 bg-muted/60 border-y">
        <p className="text-xs font-mono font-semibold text-muted-foreground tracking-widest uppercase">
          {name}
        </p>
      </div>
      <div className="px-10 py-8">
        {children}
      </div>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────── */
export default function ComponentsPreviewPage() {
  return (
    <div className="w-full flex flex-col divide-y border-b">

      {/* Header */}
      <div className="px-10 py-6 bg-background border-b">
        <p className="text-lg font-bold">Components Preview</p>
        <p className="text-xs text-muted-foreground mt-0.5">暫時頁面，確認樣式後請刪除 app/components-preview/</p>
      </div>

      {/* ProjectCard */}
      <Section name="ProjectCard">
        <ProjectCard {...PROJECT} />
      </Section>

      {/* MiniCard */}
      <Section name="MiniCard">
        <div className="max-w-sm">
          <MiniCard {...MINI} />
        </div>
      </Section>

      {/* Badge */}
      <Section name="Badge">
        <div className="flex flex-wrap gap-2">
          <Badge label="App" />
          <Badge label="UI" variant="outline" />
          <Badge label="Design System" />
          <Badge label="Figma" variant="secondary" />
        </div>
      </Section>

      {/* ExperienceItem */}
      <Section name="ExperienceItem">
        <div className="max-w-lg flex flex-col divide-y">
          <ExperienceItem {...EXPERIENCE} />
          <ExperienceItem logo="" title="UI/UX Designer" company="Finsync" date="2021 - 2022" />
        </div>
      </Section>

      {/* TimelineList */}
      <Section name="TimelineList">
        <div className="max-w-lg">
          <TimelineList items={TIMELINE_ITEMS} />
        </div>
      </Section>

      {/* AIUsageItem */}
      <Section name="AIUsageItem">
        <div className="max-w-lg flex flex-col divide-y">
          {AI_ITEMS.map((item) => (
            <AIUsageItem key={item.title} {...item} />
          ))}
        </div>
      </Section>

      {/* ArticleCard */}
      <Section name="ArticleCard">
        <div className="max-w-2xl">
          <ArticleCard {...ARTICLE} />
        </div>
      </Section>

      {/* CourseCard */}
      <Section name="CourseCard">
        <div className="max-w-lg flex flex-col divide-y">
          <CourseCard {...COURSE} />
          <CourseCard logo="" name="Google UX 讀書會" year="2025" />
        </div>
      </Section>

      {/* SectionLayout — horizontal */}
      <Section name="SectionLayout (horizontal, default)">
        <SectionLayout id="" title="Section Title" subtitle="副標題說明文字">
          <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">右側內容區塊</div>
        </SectionLayout>
      </Section>

      {/* SectionLayout — vertical */}
      <Section name="SectionLayout (vertical)">
        <SectionLayout id="" title="Section Title" subtitle="副標題說明文字" vertical>
          <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">下方內容區塊</div>
        </SectionLayout>
      </Section>

      {/* SectionCTA */}
      <Section name="SectionCTA">
        <SectionCTA
          title="Learn more"
          italic="About me."
          subtitle="I'd like to share what I"
          italicSub="Love."
          href="/about"
        />
      </Section>

      {/* Footer — default */}
      <Section name="Footer (default)">
        <div className="border rounded-xl overflow-hidden">
          <Footer variant="default" />
        </div>
      </Section>

      {/* Footer — project */}
      <Section name="Footer (project)">
        <div className="border rounded-xl overflow-hidden">
          <Footer
            variant="project"
            prev={{ href: "/project/allup", title: "allUP — B2B SaaS Dashboard" }}
            next={{ href: "/project/finsync", title: "Finsync — 個人財務管理 App" }}
          />
        </div>
      </Section>

    </div>
  )
}
