import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * MasonryGrid — 瀑布流圖片排列（CSS columns）
 *
 * Props:
 *  - items      {MasonryItem[]}  圖片資料陣列（見下方型別）
 *  - cols       {{ sm, md, lg }} 各斷點欄數，預設 1 / 2 / 3
 *  - gap        {string}         欄間距 Tailwind class，預設 "gap-3"
 *  - className                   額外 className
 *
 * MasonryItem:
 *  - id         {string}         唯一 key
 *  - src        {string}         圖片路徑（public/ 下）
 *  - alt        {string}         alt 文字
 *  - href       {string}         點擊連結（選填）
 *  - width      {number}         原始圖片寬度（給 next/image 用）
 *  - height     {number}         原始圖片高度（給 next/image 用）
 */
export default function MasonryGrid({
  items = [],
  gap = "gap-3",
  className,
}) {
  return (
    /*
     * CSS columns 瀑布流：
     *  - columns-1          → 手機（預設）
     *  - md:columns-2       → 平板 ≥ 768px
     *  - lg:columns-3       → 桌面 ≥ 1024px
     *  - break-inside-avoid 讓每張圖不被欄位截斷
     */
    <div
      className={cn(
        "columns-1 md:columns-2 lg:columns-3",
        gap,
        className
      )}
    >
      {items.map((item) => (
        <MasonryItem key={item.id} item={item} />
      ))}
    </div>
  )
}

/* ── 單張圖片 ────────────────────────────────────────── */
function MasonryItem({ item }) {
  const { src, alt, href, width, height } = item

  const image = (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className="w-full h-auto rounded-xl object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  )

  return (
    <div className="break-inside-avoid mb-3">
      {href ? (
        <Link
          href={href}
          className="block overflow-hidden rounded-xl ring-1 ring-border transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {image}
        </Link>
      ) : (
        <div className="overflow-hidden rounded-xl ring-1 ring-border">
          {image}
        </div>
      )}
    </div>
  )
}
