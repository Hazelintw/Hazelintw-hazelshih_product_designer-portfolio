"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/works",      label: "Works"      },
  { href: "/about",      label: "About"      },
  { href: "/playground", label: "Playground" },
  { href: "/resume",     label: "Resume"     },
]

export default function TopNav() {
  const pathname = usePathname()
  const [lang, setLang] = useState("zh")

  function isNavActive(href) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <header className="sticky top-0 z-50 flex justify-center px-6 pt-4 pb-2">
      {/* fit-content 卡片：inline-flex 讓寬度 hug content，mx-auto 置中 */}
      <div className="inline-flex mx-auto items-center gap-3 bg-background rounded-2xl shadow-md border px-4 h-12">

        {/* 左側：頭像 Logo */}
        <Link href="/" className="shrink-0">
          <span className="flex size-8 rounded-full bg-muted items-center justify-center overflow-hidden ring-2 ring-border">
            <svg viewBox="0 0 32 32" className="size-full text-muted-foreground" fill="currentColor">
              <circle cx="16" cy="12" r="6" />
              <ellipse cx="16" cy="26" rx="10" ry="6" />
            </svg>
          </span>
        </Link>

        {/* 中間：導覽連結 */}
        <nav className="flex items-center gap-0.5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap",
                isNavActive(href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 右側：中 / En 切換（xl 以上才顯示） */}
        <div className="hidden xl:flex items-center gap-1 rounded-md border px-1 py-0.5 text-xs font-medium">
          <button
            onClick={() => setLang("zh")}
            className={cn(
              "px-1.5 py-0.5 rounded transition-colors",
              lang === "zh"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            中
          </button>
          <span className="text-border select-none">|</span>
          <button
            onClick={() => setLang("en")}
            className={cn(
              "px-1.5 py-0.5 rounded transition-colors",
              lang === "en"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            En
          </button>
        </div>

      </div>
    </header>
  )
}
