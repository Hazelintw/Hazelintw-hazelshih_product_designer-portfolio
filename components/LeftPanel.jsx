"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const NAV_LINKS = [
  { href: "/works",  label: "Works"  },
  { href: "/about",  label: "About"  },
  { href: "/resume", label: "Resume" },
]

/**
 * LeftPanel — 整合式左側固定面板（取代 Navbar + Sidebar）
 *
 * Props:
 *  - links      { id, label }[]  anchor 導覽，沒傳入就不顯示
 *  - className                   額外 className
 */
export default function LeftPanel({ links = [], className }) {
  const pathname  = usePathname()
  const [lang, setLang]       = useState("zh")
  const [activeId, setActiveId] = useState(links[0]?.id ?? "")
  const clickedRef = useRef(false)
  const timerRef   = useRef(null)

  /* ── IntersectionObserver：偵測目前可見 anchor 區塊 ── */
  useEffect(() => {
    if (links.length === 0) return

    const els = links
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickedRef.current) return
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [links])

  function handleAnchorClick(e, id) {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    setActiveId(id)
    clickedRef.current = true
    target.scrollIntoView({ behavior: "smooth", block: "start" })
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => { clickedRef.current = false }, 800)
  }

  function isActive(href) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <aside
      className={cn(
        "w-[280px] shrink-0",
        "sticky top-0 h-screen overflow-y-auto",
        "flex flex-col",
        "border-r bg-background",
        className
      )}
    >
      {/* ── 1. 頭像 Logo ─────────────────────────────── */}
      <div className="px-6 pt-6 pb-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 rounded-full bg-muted items-center justify-center overflow-hidden ring-2 ring-border shrink-0">
            {/* TODO: 換成真實 <Image> */}
            <svg viewBox="0 0 32 32" className="size-full text-muted-foreground" fill="currentColor">
              <circle cx="16" cy="12" r="6" />
              <ellipse cx="16" cy="26" rx="10" ry="6" />
            </svg>
          </span>
        </Link>
      </div>

      {/* ── 2. 導覽連結 ──────────────────────────────── */}
      <nav className="px-6 pb-4">
        <ul className="flex flex-col gap-0.5">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "block rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                  isActive(href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── 3. 中 / En 語言切換 ──────────────────────── */}
      <div className="px-6 pb-6">
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

      {/* ── 4. Anchor 導覽區（選填）─────────────────── */}
      {links.length > 0 && (
        <>
          <Separator />
          <nav className="px-4 py-4">
            <ul className="flex flex-col gap-0.5">
              {links.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => handleAnchorClick(e, id)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                      activeId === id
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "h-3.5 w-0.5 rounded-full shrink-0 transition-colors",
                        activeId === id ? "bg-foreground" : "bg-transparent"
                      )}
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </aside>
  )
}
