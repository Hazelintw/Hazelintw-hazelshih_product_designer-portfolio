"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/works",      label: "Works"      },
  { href: "/about",      label: "About"      },
  { href: "/playground", label: "Playground" },
  { href: "/resume",     label: "Resume"     },
]

function TopNavbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState("zh")

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function isNavActive(href) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b bg-background/80 backdrop-blur-md"
          : "bg-background"
      )}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

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
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                isNavActive(href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 右側：中 / En 切換 */}
        <div className="flex items-center gap-1 rounded-md border w-fit px-1 py-0.5 text-xs font-medium">
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

export default function PlaygroundLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
