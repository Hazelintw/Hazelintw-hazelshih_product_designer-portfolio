# Portfolio — Handoff Document

> 貼到新對話窗開頭，讓 Claude 理解完整前後文，直接接續開發。

---

## 專案概述

**Hazel** 的個人 Portfolio 網站（Product Designer）。  
路徑：`/Users/hazel/Desktop/ESG/portfolio`  
目標：把網站開發完整，之後對接 Notion API 取代假資料。

---

## 技術棧

| 項目 | 版本 / 說明 |
|------|-------------|
| Next.js | 16.2.4，App Router |
| Tailwind CSS | v4，使用 `@import "tailwindcss"`（非 `@tailwind` directive）|
| shadcn/ui | v4，底層為 `@base-ui/react`（非 Radix UI）|
| 字體 | Inter（Google Fonts）|
| 佔位圖 | picsum.photos（已設定 remotePatterns）|

---

## Route Group 架構

```
app/
├── layout.js                    ← Root layout，body: flex min-h-screen
├── globals.css
├── (main)/
│   ├── layout.js                ← LeftPanel sidebar + TopNav(mobile)
│   ├── page.js                  ← Homepage
│   ├── about/page.js
│   └── project/[slug]/page.js
└── (fullwidth)/
    ├── layout.js                ← TopNav only
    ├── works/page.js
    └── playground/page.js
```

### `(main)` layout
- `LeftPanel`（hidden on mobile） + content column
- content: `px-5 md:px-10 pt-12 pb-16`
- mobile：顯示 `TopNav`

### `(fullwidth)` layout
- `TopNav` + `<main>`
- content: `px-5 md:px-10 lg:px-40 pt-12 pb-16`

---

## 關鍵檔案說明

### `app/layout.js`
```js
import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
const inter = Inter({ subsets: ["latin"] })
export const metadata = { title: "Portfolio", description: "My personal portfolio" }
export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className={cn(inter.className, "flex min-h-screen")}>{children}</body>
    </html>
  )
}
```

### `lib/nav-links.js`
```js
export const NAV_LINKS = [
  { href: "/about",      label: "About"      },
  { href: "/works",      label: "Works"      },
  { href: "/playground", label: "Playground" },
]
```

### `lib/left-panel-context.js`
- Context for injecting LeftPanel state from individual pages
- Exports: `LeftPanelProvider`, `useLeftPanelLinks`, `SetPanelLinks`
- State: `links[]`, `title`, `showText`, `showButton`, `showFooter`（皆 default null）
- `SetPanelLinks`：null-rendering client component，mount 時 set，unmount 時 reset

### `components/LeftPanel.jsx`
- 寬度：`md:w-[300px] xl:w-[400px]`，`hidden md:flex`
- Top constants（待填入真實值）：`RESUME_URL`, `LINKEDIN_URL`, `CONTACT_EMAIL`, `HERO_TITLE`, `HERO_TEXT`
- 結構：Navbar → H1 → Body text（showText）→ CTA Button（showButton）→ Anchor 導覽 → Footer（showFooter）
- Anchor 樣式：`divide-y`，active = `text-orange-500` + ArrowRight，非 active = `text-muted-foreground`
- Footer：Globe icon（LinkedIn）+ email
- **⚠️ 重要**：`useLeftPanelLinks()` 必須在所有 `_showText`/`_showButton`/`_showFooter` 計算之前呼叫，否則 Turbopack 會產生 TDZ build error

### `components/TopNav.jsx`
- Floating pill navbar，`inline-flex mx-auto rounded-2xl shadow-md border`，sticky top
- 結構：avatar + slash-separated nav links + LangToggle（`hidden xl:flex`）
- 從 `lib/nav-links.js` 取得連結

### `components/LangToggle.jsx`
- 中/En toggle，`useState` 內部管理
- Props: `className`

### `components/SectionLayout.jsx`
```jsx
// 左右兩欄 section 元件
// Props: id, title, subtitle(ReactNode), children, className
// 左欄固定 180px，右欄 flex-1
// subtitle 用 <div>（非 <p>），支援 ReactNode 如 <Link>
```

### `components/ProjectCard.jsx`
- 左右排版，固定 `h-[320px]`，`bg-muted rounded-xl`
- 左：文字（px-8 py-10, flex-1）
- 右：圖片（w-[45%], fill + object-cover）
- hover：scale-[1.02] on image

### `components/MiniCard.jsx`
- 小卡片：category（uppercase）+ title + badges + 可選圖片
- 圖片 `aspect-[16/9]`
- hover:shadow-md

### `components/AIUsageItem.jsx`
- Icon（size-9 circle）+ title + description
- **無 internal border**，parent 用 `divide-y` 處理分隔線

### `components/TimelineList.jsx`
- shadcn Accordion
- 每列：logo + company + role + period 同一 `flex items-center` 行
- `AccordionTrigger` 有 `items-center`

### `components/FilterTabs.jsx`
- Controlled tabs，Props: `tabs[]`, `value`, `onChange`
- Pill 樣式 + border

---

## Homepage (`app/(main)/page.js`) 架構

```jsx
<div className="flex flex-col gap-16">
  <SetPanelLinks links={HOME_LINKS} showText showButton showFooter />

  {/* Section 1: Works — 無 SectionLayout wrapper */}
  <div id="works" className="flex flex-col gap-5">
    <ProjectCard />  {/* 全寬 */}
    <ProjectCard />  {/* 全寬 */}
    <div className="grid grid-cols-3 gap-5 items-stretch h-[320px]">
      <div className="col-span-2"><ProjectCard className="h-full" /></div>
      <AllWorksCard />  {/* inline component */}
    </div>
  </div>

  {/* Section 2: Experience */}
  <SectionLayout id="experience" title="Experience" subtitle={<Link to="/about">More about me?</Link>}>
    <TimelineList items={EXPERIENCE} />
  </SectionLayout>

  {/* Section 3: How I use AI */}
  <SectionLayout id="ai" title="How I use AI" subtitle="...">
    <div className="flex flex-col divide-y">
      {AI_ITEMS.map(item => <AIUsageItem {...item} />)}
    </div>
  </SectionLayout>
</div>
```

---

## 各頁面 SetPanelLinks 設定

| 頁面 | title | showText | showButton | showFooter | links |
|------|-------|----------|------------|------------|-------|
| `/` (Home) | — | ✓ | ✓ | ✓ | works / experience / ai |
| `/about` | "About" | ✗ | ✗ | ✓ | about anchors |
| `/project/[slug]` | productName | — | — | — | overview / situation / design |
| `/works` | — | — | — | — | （fullwidth，無 LeftPanel）|
| `/playground` | — | — | — | — | （fullwidth，無 LeftPanel）|

---

## 已知 Bug / 注意事項

1. **TDZ Build Error（已修復）**：LeftPanel.jsx 中，`useLeftPanelLinks()` 必須在最前面呼叫，不能在計算 `_show*` 變數之後才呼叫。Turbopack 會重排宣告導致 TDZ。

2. **SectionLayout subtitle**：必須用 `<div>` 而非 `<p>` 包住 subtitle，因為 subtitle 可能是 `<Link>` 等 block element。

3. **shadcn/ui v4**：底層是 `@base-ui/react`，不是 Radix。安裝指令和 API 略有不同，請查官方 v4 文件。

4. **Tailwind v4**：`globals.css` 使用 `@import "tailwindcss"`，不使用舊版 `@tailwind base/components/utilities`。

---

## 待完成項目（優先順序）

### 高優先
- [ ] 填入真實個人資料：`HERO_TITLE`, `HERO_TEXT`, `RESUME_URL`, `LINKEDIN_URL`, `CONTACT_EMAIL`
- [ ] 替換 avatar 佔位圖（LeftPanel + TopNav）
- [ ] 完成 About 頁面內容（skills、intro、education 等 section）
- [ ] 完成 Project detail 頁面（`/project/[slug]`）

### 中優先
- [ ] Works 頁面：FilterTabs 功能 + 真實專案卡片
- [ ] Playground 頁面：FilterTabs + MiniCard 真實內容
- [ ] 手機版 hamburger menu（`(main)` layout）
- [ ] 替換所有假資料（picsum 圖片、假文案）

### 低優先 / 未來
- [ ] Notion API 整合，取代 page.js 中的 hardcode 假資料
- [ ] i18n 中 / 英語言切換（LangToggle 目前只是 UI，尚無實際功能）
- [ ] Dark mode 優化
- [ ] SEO metadata（各頁面 `generateMetadata`）

---

## 確認可用路由（Build passing）

```
/
/about
/works
/playground
/project/[slug]
/_not-found
```

---

## 開發指令

```bash
cd /Users/hazel/Desktop/ESG/portfolio
npm run dev      # 開發模式（Turbopack）
npm run build    # 確認 build 無誤
```
