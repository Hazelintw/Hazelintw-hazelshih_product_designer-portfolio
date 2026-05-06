import Image from "next/image"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

/**
 * TimelineList — 工作 / 教育經歷列表（accordion 展開）
 *
 * Props:
 *  - items     {TimelineItem[]}  經歷資料陣列（見下方型別）
 *  - className                   額外 className
 *
 * TimelineItem:
 *  - id        {string}          唯一 key（用於 accordion value）
 *  - logo      {string}          logo 圖片路徑（public/ 下），無則顯示文字 fallback
 *  - logoAlt   {string}          logo alt 文字
 *  - company   {string}          公司 / 學校名稱
 *  - role      {string}          職稱 / 科系
 *  - period    {string}          年份區間，e.g. "2023 ~ 2025"
 *  - content   {React.ReactNode} 展開後的詳細內容（選填）
 */
export default function TimelineList({ items = [], className }) {
  return (
    <Accordion
      className={cn("w-full flex flex-col gap-2", className)}
    >
      {items.map((item) => (
        <TimelineItem key={item.id} item={item} />
      ))}
    </Accordion>
  )
}

/* ── 單一列 ───────────────────────────────────────────── */
function TimelineItem({ item }) {
  const { id, logo, logoAlt, company, role, period, content } = item
  const hasContent = !!content

  return (
    <AccordionItem
      value={id}
      className={cn(
        "rounded-xl border bg-card px-4 py-0",
        // 沒有展開內容時禁用 accordion 互動
        !hasContent && "pointer-events-none"
      )}
    >
      <AccordionTrigger
        className={cn(
          "py-3 hover:no-underline",
          !hasContent && "cursor-default [&>svg]:hidden"
        )}
      >
        <div className="flex flex-1 items-center gap-3 mr-4">

          {/* ── Logo ──────────────────────────────────── */}
          <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border">
            {logo ? (
              <Image
                src={logo}
                alt={logoAlt || company}
                fill
                className="object-cover"
                sizes="36px"
              />
            ) : (
              /* 文字 fallback */
              <span className="flex h-full w-full items-center justify-center text-xs font-semibold text-muted-foreground uppercase">
                {company?.[0] ?? "?"}
              </span>
            )}
          </div>

          {/* ── 公司名稱 + 職稱 ───────────────────────── */}
          <div className="flex flex-col gap-0.5 text-left">
            <span className="text-sm font-medium leading-tight">{company}</span>
            <span className="text-xs text-muted-foreground leading-tight">{role}</span>
          </div>

          {/* ── 年份（推到右側）─────────────────────── */}
          <span className="ml-auto text-xs text-muted-foreground tabular-nums">
            {period}
          </span>
        </div>
      </AccordionTrigger>

      {/* ── 展開內容 ──────────────────────────────────── */}
      {hasContent && (
        <AccordionContent className="text-sm text-muted-foreground px-0 pb-4">
          {content}
        </AccordionContent>
      )}
    </AccordionItem>
  )
}
