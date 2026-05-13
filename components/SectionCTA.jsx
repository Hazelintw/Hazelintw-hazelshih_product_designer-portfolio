import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * SectionCTA — 深色背景的全寬 CTA 區塊
 *
 * 每行由「一般文字 + 斜體文字」組成，整個區塊可點擊。
 *
 * Props:
 *  - title      string  第一行：一般文字
 *  - italic     string  第一行：緊接在 title 後的斜體文字
 *  - subtitle   string  第二行：一般文字（選填）
 *  - italicSub  string  第二行：斜體文字（選填）
 *  - href       string  點擊目標路徑
 *  - className  string  額外 className（選填）
 */
export default function SectionCTA({ title, italic, subtitle, italicSub, href, className }) {
  return (
    <Link href={href} className={cn("block group", className)}>
      <div className="bg-foreground text-background rounded-2xl px-10 py-14 transition-opacity duration-200 group-hover:opacity-90">

        {/* 第一行 */}
        {(title || italic) && (
          <p className="text-3xl md:text-4xl font-bold leading-snug">
            {title && <span>{title} </span>}
            {italic && <em className="italic font-bold">{italic}</em>}
          </p>
        )}

        {/* 第二行 */}
        {(subtitle || italicSub) && (
          <p className="text-3xl md:text-4xl font-bold leading-snug mt-1">
            {subtitle && <span>{subtitle} </span>}
            {italicSub && <em className="italic font-bold">{italicSub}</em>}
          </p>
        )}

      </div>
    </Link>
  )
}
