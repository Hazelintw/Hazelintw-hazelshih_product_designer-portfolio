"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { ExternalLink, Globe, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { useLeftPanelLinks } from "@/lib/left-panel-context"
import LangDropdown from "@/components/LangDropdown"

/* LeftPanel Navbar 專用連結（與 TopNav 一致） */
const PANEL_NAV_LINKS = [
  { href: "/#works", label: "Works",  activeOn: "/" },
  { href: "/about",  label: "About",  activeOn: "/about" },
]

/* ── 可編輯變數 ──────────────────────────────────────── */
const RESUME_URL    = ""
const LINKEDIN_URL  = ""
const CONTACT_EMAIL = ""
const HERO_TITLE    = "Hello! I'm Hazel. Product designer 4+ years"
const HERO_TEXT     = "（placeholder 個人描述文字）"
/* ──────────────────────────────────────────────────── */

/**
 * LeftPanel — 整合式左側固定面板
 *
 * 所有面板設定（title / showText / showButton / showFooter / links）
 * 由各頁面透過 <SetPanelLinks> 注入 Context 控制。
 *
 * Props:
 *  - className  string  額外 className
 */
export default function LeftPanel({ className }) {
  const pathname = usePathname()

  const {
    links,
    title:      ctxTitle,
    showText:   ctxShowText,
    showButton: ctxShowButton,
    showFooter: ctxShowFooter,
  } = useLeftPanelLinks()

  // pathname fallback：首頁預設全部顯示
  const isHome       = pathname === "/"
  const _showText    = ctxShowText   ?? isHome
  const _showButton  = ctxShowButton ?? isHome
  const _showFooter  = ctxShowFooter ?? isHome

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

  function isNavActive(activeOn) {
    return pathname === activeOn || pathname.startsWith(activeOn + "/")
  }

  const hasContent = ctxTitle || _showText || _showButton || links.length > 0

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
          左：頭像 + 連結群組（About / Works / Playground）
          右：中/En 切換（xl 以上顯示）
      ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-3 shrink-0">

        <div className="flex items-center gap-3 min-w-0">
          {/* 頭像 */}
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
            {PANEL_NAV_LINKS.map(({ href, label, activeOn }, i) => (
              <span key={href} className="flex items-center gap-1">
                {i > 0 && (
                  <span className="text-muted-foreground/40 select-none">/</span>
                )}
                <Link
                  href={href}
                  className={cn(
                    "font-medium transition-colors whitespace-nowrap",
                    isNavActive(activeOn)
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

        {/* 語言切換 */}
        <LangDropdown />

      </div>

      {/* ── 2. Content（title / text / button / anchor）── */}
      {hasContent && (
        <>
          <Separator />
          <div className="px-6 pt-8 pb-6 flex flex-col">

            {/* H1 標題：首頁用 HERO_TITLE，其他頁面用 context title */}
            {(isHome || ctxTitle) && (
              <h1 className="text-2xl font-bold leading-snug">
                {isHome ? HERO_TITLE : ctxTitle}
              </h1>
            )}

            {/* Body 文字：首頁用 HERO_TEXT */}
            {_showText && (
              <p className={cn(
                "text-sm text-muted-foreground leading-relaxed",
                (isHome || ctxTitle) && "mt-3"
              )}>
                {HERO_TEXT}
              </p>
            )}

            {/* CTA Button */}
            {_showButton && (
              <div className={cn((_showText || ctxTitle) && "mt-3")}>
                {RESUME_URL ? (
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
                  >
                    查看履歷
                    <ExternalLink className="size-3.5" />
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background opacity-60 cursor-default"
                  >
                    查看履歷
                    <ExternalLink className="size-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Anchor 導覽 */}
            {links.length > 0 && (
              <nav className={cn(
                (_showButton || _showText || isHome || ctxTitle) && "mt-5"
              )}>
                <ul className="flex flex-col divide-y">
                  {links.map(({ id, label }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        onClick={(e) => handleAnchorClick(e, id)}
                        className={cn(
                          "flex items-center gap-3 py-3 text-sm font-medium transition-colors",
                          activeId === id
                            ? "text-orange-500"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {label}
                        <ArrowRight className="size-3.5 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

          </div>
        </>
      )}

      {/* ── spacer ──────────────────────────────────── */}
      <div className="flex-1" />

      {/* ── 3. Footer ────────────────────────────────── */}
      {_showFooter && (
        <>
          <Separator />
          <div className="flex items-center justify-between px-5 py-4">
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
