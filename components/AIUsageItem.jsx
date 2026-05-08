import Image from "next/image"

/**
 * AIUsageItem — 單筆 AI 使用方式
 *
 * 分隔線由父層用 divide-y 控制（不在元件內部加）。
 *
 * Props:
 *  - icon        string (optional)  圖示 URL
 *  - title       string             標題
 *  - description string             說明文字
 */
export default function AIUsageItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4 py-4">

      {/* 左側：圓形 icon */}
      <div className="shrink-0 size-9 rounded-full bg-muted overflow-hidden flex items-center justify-center">
        {icon ? (
          <Image
            src={icon}
            alt={title}
            width={36}
            height={36}
            className="object-cover"
          />
        ) : (
          <span className="text-xs text-muted-foreground">AI</span>
        )}
      </div>

      {/* 右側：title + description */}
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>

    </div>
  )
}
