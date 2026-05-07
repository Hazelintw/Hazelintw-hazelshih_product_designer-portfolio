"use client"

import { cn } from "@/lib/utils"

/**
 * FilterTabs — 分類篩選列
 *
 * Props:
 *  - tabs     { id, label }[]  選項清單
 *  - value    string           目前選中的 tab id（controlled）
 *  - onChange (id: string) => void
 */
export default function FilterTabs({ tabs = [], value, onChange }) {
  return (
    <nav className="flex gap-1" aria-label="分類篩選">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange?.(id)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
            value === id
              ? "bg-foreground text-background border-foreground"
              : "text-muted-foreground border-border hover:bg-muted hover:text-foreground"
          )}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
