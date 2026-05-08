"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export default function LangToggle({ className }) {
  const [lang, setLang] = useState("zh")

  return (
    <div className={cn(
      "flex items-center gap-0.5 rounded-md border px-1 py-0.5 text-xs font-medium shrink-0",
      className
    )}>
      <button
        onClick={() => setLang("zh")}
        className={cn(
          "px-1 py-0.5 rounded transition-colors",
          lang === "zh" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
        )}
      >
        中
      </button>
      <span className="text-border select-none">|</span>
      <button
        onClick={() => setLang("en")}
        className={cn(
          "px-1 py-0.5 rounded transition-colors",
          lang === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
        )}
      >
        En
      </button>
    </div>
  )
}
