"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { ExternalLink, Globe, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { useLeftPanelLinks } from "@/lib/left-panel-context"

/* ── 可編輯變數 ──────────────────────────────────────── */
const RESUME_URL    = ""
const LINKEDIN_URL  = ""
const CONTACT_EMAIL = ""
/* ──────────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: "/works",      label: "Works"      },
  { href: "/about",      label: "About"      },
  { href: "/playground", label: "Playground" },
]

/**
 * LeftPanel — 整合式左側固定面板
 *
 * Props:
 *  - showHero    boolean  顯示 Hero 區塊（未傳時自動判斷：pathname === "/"）
 *  - showFooter  boolean  顯示 Footer 區塊（同上）
 *  - className   string   額外 className
 *
 * Anchor links 由各頁面透過 <SetPanelLinks> 注入 Context。
 */
export default function LeftPanel({ showHero, showFooter, className }) {
  const pathname = usePathname()
  const isHome = pathname === "/"

  const { links, title: ctxTitle, showHero: ctxShowHero, showFooter: ctxShowFooter } = useLeftPanelLinks()

  // 優先順序：props → context → pathname fallback
  const _showHero   = showHero   ?? ctxShowHero   ?? isHome
  const _showFooter = showFooter ?? ctxShowFooter ?? isHome

  const [lang, setLang] = useState("zh")
  const [activeId, setActiveId] = useState("")
  const clickedRef = useRef(false)
  const timerRef   = useRef(null)

  useEffect(() => {
    setActiveId(links[0]?.id ?? "")
  }, [links])

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

  function isNavActive(href) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <aside
      className={cn(
        "hidden md:flex",
        "md:w-[300px] xl:w-[400px] shrink-0",
        "sticky top-0 h-screen overflow-y-auto",
        "flex-col",
        "border-r bg-background",
        className
      )}
    >

      {/* ── 1. Navbar ─────────────────────────────────
          左：頭像 + 導覽連結群組  右：中/En 切換
      ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-3 shrink-0">

        {/* 左側：頭像 + 導覽連結 */}
        <div className="flex items-center gap-3 min-w-0">

          {/* 頭像 Logo */}
          <Link href="/" className="shrink-0">
            <span className="flex size-8 rounded-full bg-muted items-center justify-center overflow-hidden ring-2 ring-border">
              <svg viewBox="0 0 32 32" className="size-full text-muted-foreground" fill="currentColor">
                <circle cx="16" cy="12" r="6" />
                <ellipse cx="16" cy="26" rx="10" ry="6" />
              </svg>
            </span>
          </Link>

          {/* 導覽連結（斜槓分隔） */}
          <nav className="flex items-center gap-1 text-sm min-w-0">
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

        {/* 右側：中 / En 切換（平板隱藏，桌機才顯示） */}
        <div className="hidden xl:flex items-center gap-0.5 rounded-md border px-1 py-0.5 text-xs font-medium shrink-0">
          <button
            onClick={() => setLang("zh")}
            className={cn(
              "px-1 py-0.5 rounded transition-colors",
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
              "px-1 py-0.5 rounded transition-colors",
              lang === "en"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            En
          </button>
        </div>

      </div>

      {/* ── 2. Title + Hero ───────────────────────────── */}
      {(ctxTitle || _showHero) && <Separator />}

      {/* Title（有傳入時顯示） */}
      {ctxTitle && (
        <div className="px-6 pt-8 pb-0">
          <h1 className="text-2xl font-bold">{ctxTitle}</h1>
        </div>
      )}

      {_showHero && (
        <>
          <div className="px-6 py-8 flex flex-col gap-4">
            <h1 className="text-xl font-bold leading-snug">
              Hi, I'm [Name] — a Product Designer crafting thoughtful digital experiences.
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Focused on UI/UX design, design systems, and bridging the gap between product and engineering.
            </p>
            {RESUME_URL !== "" && (
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 self-start rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                查看履歷
                <ExternalLink className="size-3.5" />
              </a>
            )}
            {RESUME_URL === "" && (
              <button
                disabled
                className="inline-flex items-center gap-1.5 self-start rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background opacity-60 cursor-default"
              >
                查看履歷
                <ExternalLink className="size-3.5" />
              </button>
            )}
          </div>
        </>
      )}

      {/* ── 3. Anchor 導覽（由頁面透過 Context 注入）──── */}
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

      {/* ── spacer ──────────────────────────────────── */}
      <div className="flex-1" />

      {/* ── 4. Footer（只在 Homepage 顯示）────────────── */}
      {_showFooter && (
        <>
          <Separator />
          <div className="flex items-center justify-between px-5 py-4">
            {/* LinkedIn icon */}
            <a
              href={LINKEDIN_URL || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={cn(
                "transition-colors cursor-pointer",
                LINKEDIN_URL
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-muted-foreground/40 pointer-events-none"
              )}
            >
              <Globe className="size-4" />
            </a>

            {/* Email */}
            <a
              href={CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : undefined}
              className={cn(
                "text-xs transition-colors cursor-pointer",
                CONTACT_EMAIL
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-muted-foreground/40 pointer-events-none"
              )}
            >
              {CONTACT_EMAIL || "email@example.com"}
            </a>
          </div>
        </>
      )}

    </aside>
  )
}
