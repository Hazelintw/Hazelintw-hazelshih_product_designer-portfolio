/**
 * SectionLayout — 左右兩欄 section 元件
 *
 * Props:
 *  - id        string            section anchor id
 *  - title     string            左欄標題
 *  - subtitle  string (optional) 左欄副標題
 *  - children  ReactNode         右欄內容
 *  - className string (optional) 額外 className
 */
export default function SectionLayout({ id, title, subtitle, children, className }) {
  return (
    <section id={id} className={`flex flex-col md:flex-row gap-8 py-10 ${className ?? ""}`}>

      {/* 左欄：標題 + 副標題，固定寬度，靠上對齊 */}
      <div className="w-full md:w-[180px] shrink-0">
        <h2 className="text-sm font-semibold">{title}</h2>
        {subtitle && (
          <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>
        )}
      </div>

      {/* 右欄：內容 */}
      <div className="flex-1 min-w-0">
        {children}
      </div>

    </section>
  )
}
