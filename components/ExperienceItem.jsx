import Image from "next/image"

/**
 * ExperienceItem — 單筆工作經歷列
 *
 * Props:
 *  - logo     string  公司 logo 圖片路徑（空值顯示 bg-muted 佔位）
 *  - title    string  職稱
 *  - company  string  公司名稱
 *  - date     string  任職期間，e.g. "2024 - present"
 */
export default function ExperienceItem({ logo, title, company, date }) {
  return (
    <div className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 [&:not(:last-child)]:border-b">

      {/* Logo */}
      <div className="relative size-12 shrink-0 rounded-lg bg-muted overflow-hidden ring-1 ring-border">
        {logo ? (
          <Image src={logo} alt={company} fill className="object-cover" sizes="48px" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted-foreground uppercase">
            {company?.[0] ?? "?"}
          </span>
        )}
      </div>

      {/* 文字 */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* 上方：Title @ Company */}
        <p className="text-sm font-semibold leading-none">
          {title}
          <span className="text-muted-foreground font-normal"> @ {company}</span>
        </p>
        {/* 下方：任職期間 */}
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>

    </div>
  )
}
