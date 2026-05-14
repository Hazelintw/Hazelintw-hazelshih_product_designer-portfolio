import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { SetPanelLinks } from "@/lib/left-panel-context"
import SectionLayout from "@/components/SectionLayout"
import SectionCTA from "@/components/SectionCTA"
import ExperienceItem from "@/components/ExperienceItem"
import ArticleCard from "@/components/ArticleCard"
import CourseCard from "@/components/CourseCard"

const ABOUT_LINKS = [
  { id: "work-experience",  label: "Work Experience"  },
  { id: "article",          label: "Article"          },
  { id: "learning-process", label: "Learning Process" },
  { id: "community",        label: "Community"        },
]

const ABOUT_TEXT =
  "對我來說，問對問題比給出答案更重要——它能幫助團隊更精準地理解需求背後真正的目標。\n\n我習慣在設計過程中持續反思：這個方案解決的是真實問題嗎？能被團隊清楚理解嗎？能順利被實現嗎？設計對我來說是共創的過程，清晰的溝通與協作，是讓設計真正落地的關鍵。"

const WORK_EXPERIENCE = [
  { logo: "", title: "Product Designer", company: "英特內",  date: "2024 - present" },
  { logo: "", title: "Product Designer", company: "allUP",   date: "2022 - 2024"    },
  { logo: "", title: "UI/UX Designer",   company: "Finsync", date: "2021 - 2022"    },
]

const ARTICLES = [
  {
    image: "",
    date: "Nov 2025",
    title: "Digital Leute, Cologne",
    description: "I talked about designing with AI and how to reduce frictions.",
    badges: ["Growth Design", "UX"],
    href: "#",
  },
]

const COURSES = [
  { logo: "", name: "六角學院 Vibe coding",          year: "2025" },
  { logo: "", name: "多媒體網頁設計班",               year: "2025" },
  { logo: "", name: "曼陀號計畫 UX 組",              year: "2025" },
  { logo: "", name: "Soaking 資訊架構易用性工作坊",   year: "2025" },
  { logo: "", name: "Google UX 讀書會",              year: "2025" },
]

const SIDE_PROJECTS = [
  { title: "Project A", slug: "project-a" },
  { title: "Project B", slug: "project-b" },
]

const COMMUNITIES = [
  { name: "Growth Group" },
  { name: "Design Community" },
]

/* ── LeftPanel CTA 按鈕樣式（對齊 LeftPanel.jsx 的 btnClass，size sm）── */
const CTA_BTN =
  "inline-flex items-center gap-1.5 rounded-md bg-foreground px-2.5 py-1 text-xs font-medium text-background transition-opacity hover:opacity-80"

/* ── 底色容器（各 section 共用）────────────────────────── */
const CARD_WRAP = "rounded-2xl bg-muted p-5 flex flex-col gap-5"

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8">
      <SetPanelLinks
        title="Hazel's Design Values"
        text={ABOUT_TEXT}
        buttonLabel="查看履歷"
        buttonHref="（請先填入雲端連結）"
        showText={true}
        showButton={true}
        showFooter={true}
        links={ABOUT_LINKS}
      />

      {/* ══ Work Experience ══════════════════════════ */}
      <div className={CARD_WRAP}>
        <SectionLayout
          id="work-experience"
          title="Work Experience"
          vertical
          style={{ scrollMarginTop: "80px" }}
        >
          <div className="flex flex-col">
            {WORK_EXPERIENCE.map((item) => (
              <ExperienceItem key={item.company} {...item} />
            ))}
          </div>
          <div className="mt-5">
            <a href="#" className={CTA_BTN}>
              查看履歷
              <ExternalLink className="size-3" />
            </a>
          </div>
        </SectionLayout>
      </div>

      {/* ══ Article ══════════════════════════════════ */}
      <div className={CARD_WRAP}>
        <SectionLayout
          id="article"
          title="Article"
          vertical
          style={{ scrollMarginTop: "80px" }}
        >
          <div className="flex flex-col gap-4">
            {ARTICLES.map((article) => (
              <ArticleCard key={article.title} {...article} />
            ))}
          </div>
        </SectionLayout>
      </div>

      {/* ══ Learning Process + Side Project ══════════ */}
      <div className={CARD_WRAP}>
        <SectionLayout
          id="learning-process"
          title="Learning Process & Side Project"
          vertical
          style={{ scrollMarginTop: "80px" }}
        >
          {/* 持續保持學習心態 */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              持續保持學習心態
            </p>
            <div className="flex flex-col">
              {COURSES.map((course) => (
                <CourseCard key={course.name} {...course} />
              ))}
            </div>
          </div>

          {/* Side Project — ArticleCard 樣式，開新分頁 */}
          <div className="flex flex-col gap-4 mt-8">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Side Project
            </p>
            {SIDE_PROJECTS.map(({ title, slug }) => (
              <ArticleCard
                key={slug}
                image=""
                date=""
                title={title}
                description=""
                badges={[]}
                href={`/project/${slug}`}
              />
            ))}
          </div>
        </SectionLayout>
      </div>

      {/* ══ Community ════════════════════════════════ */}
      <div className={CARD_WRAP}>
        <SectionLayout
          id="community"
          title="Community"
          subtitle="我喜歡參與活動與人交流，和志同道合且擁有成長性思維的人聊天，擴充自己的眼界，除了參與設計社群，我也自己主辦了 Growth Group，團員們定期分想新見聞、互相成長"
          vertical
          style={{ scrollMarginTop: "80px" }}
        >
          <div className="grid grid-cols-2 gap-4">
            {COMMUNITIES.map(({ name }) => (
              <div
                key={name}
                className="rounded-xl bg-muted border flex items-center justify-center p-8 text-sm font-medium text-muted-foreground"
              >
                {name}
              </div>
            ))}
          </div>
        </SectionLayout>
      </div>

      {/* ══ CTA ══════════════════════════════════════ */}
      <SectionCTA
        title="Learn more"
        italic="About me,"
        subtitle="and pls don't miss my"
        italicSub="Works."
        href="/#works"
      />

    </div>
  )
}
