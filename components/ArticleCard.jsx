import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import Badge from "@/components/Badge"

/**
 * ArticleCard — 左圖右文的文章卡片，點擊開新分頁
 *
 * Props:
 *  - image        string    封面圖片路徑（選填）
 *  - date         string    發布日期，e.g. "Nov 2025"
 *  - title        string    文章標題
 *  - description  string    摘要文字
 *  - badges       string[]  標籤清單
 *  - href         string    外連網址
 */
export default function ArticleCard({ image, date, title, description, badges = [], href }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 rounded-xl border bg-card overflow-hidden transition-shadow hover:shadow-md group"
    >
      {/* 左側：封面圖 */}
      <div className="relative w-[200px] shrink-0 bg-muted">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="200px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* 右側：文字內容 */}
      <div className="flex flex-col gap-2 py-5 pr-5 flex-1 min-w-0">

        {/* 頂部：日期 + 外連 icon */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{date}</p>
          <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </div>

        {/* 標題 */}
        <h3 className="text-sm font-semibold leading-snug">{title}</h3>

        {/* 描述 */}
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {description}
          </p>
        )}

        {/* Badges */}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-1">
            {badges.map((b) => (
              <Badge key={b} label={b} />
            ))}
          </div>
        )}

      </div>
    </Link>
  )
}
