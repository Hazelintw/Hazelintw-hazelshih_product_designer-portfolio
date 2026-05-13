"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"

const LANGUAGES = [
  { value: "zh-TW", label: "繁體中文" },
  { value: "en",    label: "English"  },
]

/**
 * LangDropdown — 語言切換下拉選單
 *
 * Props:
 *  - className  string  額外 className（傳給 trigger 按鈕）
 */
export default function LangDropdown({ className }) {
  const [lang, setLang] = useState("zh-TW")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          role="button"
          aria-label="切換語言"
          className={cn(
            "flex items-center justify-center rounded-md p-1.5",
            "text-muted-foreground hover:text-foreground hover:bg-accent",
            "transition-colors outline-none cursor-pointer",
            className
          )}
        >
          <Globe className="size-4" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={6}>
        <DropdownMenuRadioGroup value={lang} onValueChange={setLang}>
          {LANGUAGES.map(({ value, label }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
