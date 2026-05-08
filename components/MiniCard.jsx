import Link from "next/link"
import Image from "next/image"
import Badge from "@/components/Badge"

/**
 * MiniCard — 小型作品卡片
 *
 * Props:
 *  - href      string           點擊目標路徑
 *  - category  string           分類標籤（uppercase 小字）
 *  - title     string           標題
 *  - badges    string[]         Badge 標籤清單
 *  - image     string (optional) 縮圖圖片 URL
 */
export default function MiniCard({ href, category, title, badges = [], image }) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border bg-card overflow-hidden transition-shadow hover:shadow-md"
    >
      {/* 縮圖 */}
      {image ? (
        <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      ) : (
        <div className="w-full aspect-[16/9] bg-muted flex items-center justify-center text-xs text-muted-foreground">
          No image
        </div>
      )}

      {/* 文字區 */}
      <div className="flex flex-col gap-2 p-4">
        {category && (
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {category}
          </p>
        )}
        <h3 className="text-sm font-semibold leading-snug">{title}</h3>
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {badges.map((b) => (
              <Badge key={b} label={b} />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
