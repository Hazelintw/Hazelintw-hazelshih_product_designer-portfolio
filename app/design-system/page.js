/**
 * Design System 總覽頁 — /design-system
 */

import ProjectCard    from "@/components/ProjectCard"
import MiniCard       from "@/components/MiniCard"
import ExperienceItem from "@/components/ExperienceItem"
import ArticleCard    from "@/components/ArticleCard"
import CourseCard     from "@/components/CourseCard"
import SectionCTA     from "@/components/SectionCTA"
import SectionLayout  from "@/components/SectionLayout"
import TimelineList   from "@/components/TimelineList"
import AIUsageItem    from "@/components/AIUsageItem"
import Badge          from "@/components/Badge"
import Footer         from "@/components/Footer"

import {
  Globe, ExternalLink, ChevronDown, Menu, X,
  ArrowRight, ArrowUpRight, Check,
  Mail, Link, GitFork, FileText,
} from "lucide-react"

import { Button }                                from "@/components/ui/button"
import { Input }                                 from "@/components/ui/input"
import { Badge as ShadcnBadge }                  from "@/components/ui/badge"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator }                             from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback }  from "@/components/ui/avatar"

/* ── 假資料 ─────────────────────────────────────────────── */

const PROJECT = {
  slug: "iverson", projectName: "Iverson",
  title: "從 0 到 1 打造健身紀錄 App 的完整設計流程",
  description: "負責 iOS app 的整體 UX 設計與 design system 建立，從使用者研究到 design handoff。",
  badges: ["App", "UI", "Design System"],
  image: "https://picsum.photos/seed/iverson/800/450",
}

const MINI = {
  href: "/playground/demo", category: "Playground",
  title: "個人 Design System：元件庫建立與 Token 定義",
  badges: ["Design System", "Figma"],
  image: "https://picsum.photos/seed/mini1/800/450",
}

const TIMELINE_ITEMS = [
  { id: "t1", logo: null, company: "Iverson",     role: "Product Designer",        period: "2024 – 2025", content: <p className="px-1">負責 iOS app 的整體 UX 設計。</p> },
  { id: "t2", logo: null, company: "NTU",         role: "B.S. Information Mgmt",   period: "2016 – 2020", content: null },
]

const AI_ITEMS = [
  { title: "Research & Synthesis", description: "使用 AI 快速整理使用者訪談逐字稿，找出關鍵痛點與行為模式。" },
  { title: "Copywriting",          description: "協助撰寫 UI 文案、onboarding 流程說明與 error message。" },
]

/* ── 區塊 wrapper ────────────────────────────────────────── */
function DS({ label, children, wide = false }) {
  return (
    <div className="mb-16">
      <p className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest mb-4">
        {label}
      </p>
      <div className={wide ? "w-full" : undefined}>
        {children}
      </div>
      <Separator className="mt-16" />
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────── */
export default function DesignSystemPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-8">

      <h1 className="text-2xl font-bold mb-2">Design System</h1>
      <p className="text-sm text-muted-foreground mb-16">自製元件 + shadcn/ui 元件一覽</p>

      {/* ════════════ A. 自製元件 ════════════ */}
      <h2 className="text-base font-semibold mb-10">A. 自製元件</h2>

      <DS label="ProjectCard" wide>
        <ProjectCard {...PROJECT} />
      </DS>

      <DS label="MiniCard">
        <div className="max-w-sm">
          <MiniCard {...MINI} />
        </div>
      </DS>

      <DS label="ExperienceItem">
        <div className="flex flex-col">
          <ExperienceItem logo="" title="Product Designer" company="英特內"  date="2024 - present" />
          <ExperienceItem logo="" title="UI/UX Designer"   company="Finsync" date="2021 - 2022" />
        </div>
      </DS>

      <DS label="ArticleCard" wide>
        <ArticleCard
          image="" date="Nov 2025" title="Digital Leute, Cologne"
          description="I talked about designing with AI and how to reduce frictions."
          badges={["Growth Design", "UX"]} href="#"
        />
      </DS>

      <DS label="CourseCard">
        <div className="flex flex-col">
          <CourseCard logo="" name="六角學院 Vibe coding"  year="2025" />
          <CourseCard logo="" name="Google UX 讀書會"      year="2025" />
        </div>
      </DS>

      <DS label="SectionCTA" wide>
        <SectionCTA
          title="Learn more" italic="About me."
          subtitle="I'd like to share what I" italicSub="Love."
          href="/about"
        />
      </DS>

      <DS label="SectionLayout — horizontal" wide>
        <SectionLayout id="" title="Section Title" subtitle="副標題說明文字">
          <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">右側內容區塊</div>
        </SectionLayout>
      </DS>

      <DS label="SectionLayout — vertical" wide>
        <SectionLayout id="" title="Section Title" subtitle="副標題說明文字" vertical>
          <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">下方內容區塊</div>
        </SectionLayout>
      </DS>

      <DS label="TimelineList" wide>
        <TimelineList items={TIMELINE_ITEMS} />
      </DS>

      <DS label="AIUsageItem" wide>
        <div className="flex flex-col divide-y">
          {AI_ITEMS.map((item) => (
            <AIUsageItem key={item.title} {...item} />
          ))}
        </div>
      </DS>

      <DS label="Badge">
        <div className="flex flex-wrap gap-2">
          <Badge label="App" />
          <Badge label="UI" />
          <Badge label="Design System" variant="outline" />
          <Badge label="Figma" variant="secondary" />
        </div>
      </DS>

      <DS label="Footer — default" wide>
        <div className="border rounded-xl overflow-hidden">
          <Footer variant="default" />
        </div>
      </DS>

      <DS label="Footer — project" wide>
        <div className="border rounded-xl overflow-hidden">
          <Footer
            variant="project"
            prev={{ href: "/project/allup",   title: "allUP — B2B SaaS Dashboard" }}
            next={{ href: "/project/finsync", title: "Finsync — 個人財務管理 App" }}
          />
        </div>
      </DS>

      {/* ════════════ B. shadcn/ui 元件 ════════════ */}
      <h2 className="text-base font-semibold mb-10">B. shadcn/ui 元件</h2>

      <DS label="Button — variants">
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </DS>

      <DS label="Button — sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </DS>

      <DS label="Input">
        <div className="flex flex-col gap-3 max-w-sm">
          <Input placeholder="輸入文字…" />
          <Input placeholder="Disabled" disabled />
        </div>
      </DS>

      <DS label="Badge (shadcn) — variants">
        <div className="flex flex-wrap gap-2">
          <ShadcnBadge variant="default">Default</ShadcnBadge>
          <ShadcnBadge variant="secondary">Secondary</ShadcnBadge>
          <ShadcnBadge variant="outline">Outline</ShadcnBadge>
          <ShadcnBadge variant="destructive">Destructive</ShadcnBadge>
        </div>
      </DS>

      <DS label="Card">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">這是 Card 的內容區域，可以放任何元素。</p>
          </CardContent>
        </Card>
      </DS>

      <DS label="Separator">
        <div className="flex flex-col gap-4 max-w-sm">
          <p className="text-sm">上方內容</p>
          <Separator />
          <p className="text-sm text-muted-foreground">下方內容</p>
        </div>
      </DS>

      <DS label="Avatar">
        <div className="flex items-center gap-4">
          {/* 有圖 */}
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/avatar/100/100" alt="User" />
            <AvatarFallback>HZ</AvatarFallback>
          </Avatar>
          {/* Fallback */}
          <Avatar>
            <AvatarFallback>HZ</AvatarFallback>
          </Avatar>
        </div>
      </DS>

      {/* ════════════ C. Lucide Icons ════════════ */}
      <h2 className="text-base font-semibold mb-10">C. Lucide Icons</h2>

      <DS label="Icons — 專案使用中" wide>
        <div className="grid grid-cols-8 gap-4">
          {[
            { icon: Globe,        name: "Globe"        },
            { icon: ExternalLink, name: "ExternalLink" },
            { icon: ChevronDown,  name: "ChevronDown"  },
            { icon: Menu,         name: "Menu"         },
            { icon: X,            name: "X"            },
            { icon: ArrowRight,   name: "ArrowRight"   },
            { icon: ArrowUpRight, name: "ArrowUpRight" },
            { icon: Check,        name: "Check"        },
            { icon: Mail,         name: "Mail"         },
            { icon: Link,         name: "Link"         },
            { icon: GitFork,      name: "GitFork"      },
            { icon: FileText,     name: "FileText"     },
          ].map(({ icon: Icon, name }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center size-10 rounded-lg bg-muted">
                <Icon className="size-5" />
              </div>
              <p className="text-[10px] text-muted-foreground text-center leading-tight font-mono">{name}</p>
            </div>
          ))}
        </div>
      </DS>

      {/* ════════════ D. Tailwind 樣式 ════════════ */}
      <h2 className="text-base font-semibold mb-10">D. Tailwind 樣式</h2>

      <DS label="顏色色票 — CSS Variables" wide>
        <div className="grid grid-cols-8 gap-4">
          {[
            { name: "background",         cls: "bg-background border"         },
            { name: "foreground",         cls: "bg-foreground"                },
            { name: "muted",              cls: "bg-muted"                     },
            { name: "muted-foreground",   cls: "bg-muted-foreground"          },
            { name: "border",             cls: "bg-border"                    },
            { name: "primary",            cls: "bg-primary"                   },
            { name: "primary-foreground", cls: "bg-primary-foreground border" },
            { name: "card",               cls: "bg-card border"               },
          ].map(({ name, cls }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className={`w-16 h-16 rounded-xl ${cls}`} />
              <p className="text-[10px] text-muted-foreground text-center leading-tight font-mono">{name}</p>
            </div>
          ))}
        </div>
      </DS>

      <DS label="字體大小" wide>
        <div className="flex flex-col gap-3">
          {[
            "text-xs", "text-sm", "text-base", "text-lg",
            "text-xl", "text-2xl", "text-3xl", "text-4xl",
          ].map((cls) => (
            <p key={cls} className={cls}>
              <span className="font-mono text-muted-foreground mr-3">{cls}</span>
              Aa — 快速的棕色狐狸跳過懶惰的狗
            </p>
          ))}
        </div>
      </DS>

      <DS label="間距 Spacing" wide>
        <div className="flex flex-wrap items-end gap-6">
          {["p-2", "p-4", "p-6", "p-8", "p-10", "p-12"].map((cls) => (
            <div key={cls} className="flex flex-col items-center gap-2">
              <div className={`bg-muted rounded-lg ${cls}`} />
              <p className="text-[10px] font-mono text-muted-foreground">{cls}</p>
            </div>
          ))}
        </div>
      </DS>

    </div>
  )
}
