import Image from "next/image"

/**
 * CourseCard — 單筆課程 / 學習紀錄列
 *
 * Props:
 *  - logo   string  logo 圖片路徑（空值顯示 bg-muted 佔位）
 *  - name   string  課程名稱
 *  - year   string  年份
 */
export default function CourseCard({ logo, name, year }) {
  return (
    <div className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 [&:not(:last-child)]:border-b">

      {/* Logo */}
      <div className="relative size-12 shrink-0 rounded-lg bg-muted overflow-hidden ring-1 ring-border">
        {logo ? (
          <Image src={logo} alt={name} fill className="object-cover" sizes="48px" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted-foreground uppercase">
            {name?.[0] ?? "?"}
          </span>
        )}
      </div>

      {/* 課程名稱 */}
      <p className="flex-1 min-w-0 text-sm font-medium leading-snug">{name}</p>

      {/* 年份 */}
      <p className="text-xs text-muted-foreground tabular-nums shrink-0">{year}</p>

    </div>
  )
}
