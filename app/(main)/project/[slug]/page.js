import Image from "next/image"
import ProjectBadge from "@/components/Badge"
import Footer from "@/components/Footer"
import { cn } from "@/lib/utils"
import { SetPanelLinks } from "@/lib/left-panel-context"

const PROJECT_LINKS = [
  { id: "overview",  label: "Overview"  },
  { id: "situation", label: "Situation" },
  { id: "design",    label: "Design"    },
]

/* ── 假資料（之後換成 Notion API） ─────────────────────── */
const PROJECT = {
  productName: "產品名",
  title: "設計帶來的預期效益",
  body: "我的角色貢獻：負責從 0 到 1 的產品設計，包含使用者研究、wireframe、prototype 到 design handoff，協助團隊在短時間內完成 MVP 上線。",
  badges: ["App", "UI", "B2B"],
  heroImage: null,           // TODO: 換成真實圖片路徑
  meta: {
    date: "2022",
    team: "5+",
    role: "UI/UX",
  },
  prev: null,
  next: { href: "/project/allup", title: "allUP" },
}

/* ── Page ───────────────────────────────────────────── */
export default async function ProjectPage({ params }) {
  const { slug } = await params   // eslint-disable-line no-unused-vars
  const p = PROJECT               // TODO: 換成 getProject(slug)

  return (
    <>
      <SetPanelLinks links={PROJECT_LINKS} />

      {/* ════════════════════════════════════════════
          1. HeroSection
          左：產品名 + H1 + body + badges
          右：大圖
      ════════════════════════════════════════════ */}
      <section
        id="overview"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-10 border-b"
      >
        {/* 左欄：min-w-0 防止 grid item 溢出 */}
        <div className="min-w-0 flex flex-col justify-center gap-4">
          {/* 產品名（小字） */}
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            {p.productName}
          </p>

          {/* H1 標題 */}
          <h1 className="text-2xl font-bold leading-snug">{p.title}</h1>

          {/* Body 文字 */}
          <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>

          {/* Badge 標籤 */}
          {p.badges.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {p.badges.map((b) => (
                <ProjectBadge key={b} label={b} />
              ))}
            </div>
          )}
        </div>

        {/* 右欄：Hero 圖
            - aspect-[4/3] 在所有斷點統一比例，配合 fill 正確撐開高度
            - overflow-hidden 確保圖片不超出圓角邊界
        */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-muted">
          {p.heroImage ? (
            <Image
              src={p.heroImage}
              alt={p.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
              Hero Image
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. MetaInfoBar
          Date / Team / Role 三欄
      ════════════════════════════════════════════ */}
      <section className="border-b">
        <div className="grid grid-cols-3 divide-x text-sm">
          <MetaCell label="Date"  value={p.meta.date} />
          <MetaCell label="Team"  value={p.meta.team} />
          <MetaCell label="Role"  value={p.meta.role} />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. Content — anchor 區塊
      ════════════════════════════════════════════ */}
      <div className="py-10 flex flex-col gap-12">

        {/* Situation */}
        <section id="situation" className="flex flex-col gap-3">
          <h2 className="text-base font-semibold">Situation</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </section>

        {/* Design */}
        <section id="design" className="flex flex-col gap-3">
          <h2 className="text-base font-semibold">Design</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>

          {/* 內文圖片 placeholder */}
          <div className="w-full aspect-video rounded-xl bg-muted flex items-center justify-center text-sm text-muted-foreground my-2">
            Content Image
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
            aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>
        </section>

      </div>

      {/* ════════════════════════════════════════════
          4. Footer（project variant）
      ════════════════════════════════════════════ */}
      <Footer
        variant="project"
        prev={p.prev}
        next={p.next}
      />
    </>
  )
}

/* ── MetaInfoBar cell ────────────────────────────────── */
function MetaCell({ label, value }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-4">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
