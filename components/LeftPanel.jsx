"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { ExternalLink, Globe, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { useLeftPanelLinks } from "@/lib/left-panel-context"
import LangDropdown from "@/components/LangDropdown"
import { RESUME_URL, LINKEDIN_URL, CONTACT_EMAIL } from "@/lib/constants"

/* LeftPanel Navbar 專用連結（與 TopNav 一致） */
const PANEL_NAV_LINKS = [
  { href: "/#works", label: "Works",  activeOn: "/" },
  { href: "/about",  label: "About",  activeOn: "/about" },
]

/* ── 可編輯變數 ──────────────────────────────────────── */
const HERO_TITLE = "Hello! I’m Hazel.4 年 Product Designer — 重視系統一致性與產品落地"
const HERO_TEXT  = "專注於複雜產品流程與系統設計。我擅長從模糊需求中整理問題脈絡，平衡使用者需求、商業目標與開發可行性，讓設計能被團隊清楚理解並順利實現"
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
    title:       ctxTitle,
    text:        ctxText,
    buttonLabel: ctxButtonLabel,
    buttonHref:  ctxButtonHref,
    showText:    ctxShowText,
    showButton:  ctxShowButton,
    showFooter:  ctxShowFooter,
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

            {/* Body 文字：ctx text 優先，首頁 fallback HERO_TEXT；\n\n 換段 */}
            {_showText && (() => {
              const body = ctxText ?? (isHome ? HERO_TEXT : null)
              if (!body) return null
              const paras = body.split("\n\n")
              return (
                <div className={cn(
                  "flex flex-col gap-2",
                  (isHome || ctxTitle) && "mt-3"
                )}>
                  {paras.map((p, i) => (
                    <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
              )
            })()}

            {/* CTA Button：ctx buttonLabel/buttonHref 優先，首頁 fallback RESUME_URL */}
            {_showButton && (() => {
              const label = ctxButtonLabel ?? "查看履歷"
              const href  = ctxButtonHref  ?? RESUME_URL
              const btnClass = "inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
              return (
                <div className={cn((_showText || ctxTitle) && "mt-3")}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={btnClass}>
                      {label}
                      <ExternalLink className="size-3.5" />
                    </a>
                  ) : (
                    <button disabled className={cn(btnClass, "opacity-60 cursor-default")}>
                      {label}
                      <ExternalLink className="size-3.5" />
                    </button>
                  )}
                </div>
              )
            })()}

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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
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
