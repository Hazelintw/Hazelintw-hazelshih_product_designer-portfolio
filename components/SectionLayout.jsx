/**
 * SectionLayout — section 元件
 *
 * Props:
 *  - id        string            section anchor id
 *  - title     string            標題
 *  - subtitle  string (optional) 副標題
 *  - children  ReactNode         內容
 *  - vertical  boolean           true = 標題在上、內容在下（單欄垂直）
 *                                false（預設）= 左標題右內容水平兩欄
 *  - className string (optional) 額外 className
 *  - style     object (optional)  inline style（如 scrollMarginTop）
 */
export default function SectionLayout({ id, title, subtitle, children, vertical = false, className, style }) {
  if (vertical) {
    return (
      <section id={id} style={style} className={`flex flex-col gap-4 ${className ?? ""}`}>

        {/* 標題區：垂直排列靠左 */}
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          {subtitle && (
            <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>
          )}
        </div>

        {/* 內容 */}
        <div className="w-full">
          {children}
        </div>

      </section>
    )
  }

  return (
    <section id={id} style={style} className={`flex flex-col md:flex-row gap-8 ${className ?? ""}`}>

      {/* 左欄：標題 + 副標題，固定寬度，靠上對齊 */}
      <div className="w-full md:w-[180px] shrink-0">
        <h2 className="text-2xl font-semibold">{title}</h2>
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
