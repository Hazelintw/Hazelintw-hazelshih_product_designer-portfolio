"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Sidebar — 左側 anchor 導覽列
 *
 * Props:
 *  - title    {string}       頁面標題，顯示在連結清單上方
 *  - links    {SidebarLink[]} 導覽項目陣列（見下方型別）
 *  - className               額外 className（套在最外層 aside）
 *
 * SidebarLink:
 *  - id       {string}  對應頁面上 <section id="..."> 的 id
 *  - label    {string}  顯示文字
 */
export default function Sidebar({ title, links = [], className }) {
  const [activeId, setActiveId] = useState(links[0]?.id ?? "")
  // 紀錄是否剛被點擊，點擊後短暫暫停 observer 避免 active 跳動
  const clickedRef = useRef(false)
  const timerRef   = useRef(null)

  /* ── IntersectionObserver：自動偵測目前可見區塊 ──── */
  useEffect(() => {
    if (links.length === 0) return

    const headings = links
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickedRef.current) return   // 點擊期間暫停

        // 取「intersecting 且最靠近頂端」的那一個
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        // 當區塊進入視窗上方 20% 範圍時觸發
        rootMargin: "-10% 0px -70% 0px",
        threshold: 0,
      }
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [links])

  /* ── 點擊：平滑捲動 + 暫停 observer ─────────────── */
  function handleClick(e, id) {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    setActiveId(id)
    clickedRef.current = true
    target.scrollIntoView({ behavior: "smooth", block: "start" })

    // 捲動完成後（約 800ms）恢復 observer
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      clickedRef.current = false
    }, 800)
  }

  return (
    // hidden on mobile，桌面才顯示
    <aside className={cn("hidden lg:flex flex-col gap-4 w-48 shrink-0", className)}>

      {/* ── 頁面標題 ──────────────────────────────── */}
      {title && (
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-2">
          {title}
        </p>
      )}

      {/* ── anchor 連結清單 ───────────────────────── */}
      <nav>
        <ul className="flex flex-col gap-0.5">
          {links.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={cn(
                  "block rounded-md px-2 py-1.5 text-sm transition-colors",
                  activeId === id
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {/* active 指示條 */}
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      "h-3.5 w-0.5 rounded-full transition-colors shrink-0",
                      activeId === id ? "bg-foreground" : "bg-transparent"
                    )}
                  />
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

    </aside>
  )
}
