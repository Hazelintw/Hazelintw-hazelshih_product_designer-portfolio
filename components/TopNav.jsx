"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NAV_LINKS } from "@/lib/nav-links"
import LangToggle from "@/components/LangToggle"

export default function TopNav() {
  const pathname = usePathname()

  function isNavActive(href) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <header className="sticky top-0 z-50 flex justify-center px-6 pt-4 pb-2">
      <div className="inline-flex mx-auto items-center gap-3 bg-background rounded-2xl shadow-md border px-4 h-12">

        {/* 左側：頭像 + 導覽連結群組 */}
        <div className="flex items-center gap-3">
          <Link href="/" className="shrink-0">
            <span className="flex size-8 rounded-full bg-muted items-center justify-center overflow-hidden ring-2 ring-border">
              <svg viewBox="0 0 32 32" className="size-full text-muted-foreground" fill="currentColor">
                <circle cx="16" cy="12" r="6" />
                <ellipse cx="16" cy="26" rx="10" ry="6" />
              </svg>
            </span>
          </Link>

          {/* 導覽連結（斜槓分隔） */}
          <nav className="flex items-center gap-1 text-sm">
            {NAV_LINKS.map(({ href, label }, i) => (
              <span key={href} className="flex items-center gap-1">
                {i > 0 && (
                  <span className="text-muted-foreground/40 select-none">/</span>
                )}
                <Link
                  href={href}
                  className={cn(
                    "font-medium transition-colors whitespace-nowrap",
                    isNavActive(href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              </span>
            ))}
          </nav>
        </div>

        {/* 右側：中 / En 切換（xl 以上才顯示） */}
        <LangToggle className="hidden xl:flex" />

      </div>
    </header>
  )
}
