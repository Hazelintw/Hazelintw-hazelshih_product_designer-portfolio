"use client"

import { createContext, useContext, useState, useEffect } from "react"

/* ── Context ─────────────────────────────────────────── */
const LeftPanelContext = createContext({
  links:        [],
  setLinks:     () => {},
  showHero:     null,   // null = defer to LeftPanel's own logic (pathname check)
  setShowHero:  () => {},
  showFooter:   null,
  setShowFooter: () => {},
})

/* ── Provider（放在 root layout）────────────────────── */
export function LeftPanelProvider({ children }) {
  const [links,      setLinks]      = useState([])
  const [showHero,   setShowHero]   = useState(null)
  const [showFooter, setShowFooter] = useState(null)

  return (
    <LeftPanelContext.Provider
      value={{ links, setLinks, showHero, setShowHero, showFooter, setShowFooter }}
    >
      {children}
    </LeftPanelContext.Provider>
  )
}

/* ── Hook（LeftPanel 內部使用）───────────────────────── */
export function useLeftPanelLinks() {
  return useContext(LeftPanelContext)
}

/**
 * SetPanelLinks — 各頁面放這個元件來注入 anchor links 及面板設定
 *
 * Props:
 *  - links      { id, label }[]   anchor 連結清單（預設空陣列）
 *  - showHero   boolean | undefined  true/false 覆寫 Hero 顯示；未傳時由 LeftPanel 自行判斷
 *  - showFooter boolean | undefined  同上
 */
export function SetPanelLinks({ links = [], showHero, showFooter }) {
  const { setLinks, setShowHero, setShowFooter } = useContext(LeftPanelContext)

  useEffect(() => {
    setLinks(links)
    if (showHero   !== undefined) setShowHero(showHero)
    if (showFooter !== undefined) setShowFooter(showFooter)

    return () => {
      setLinks([])
      setShowHero(null)
      setShowFooter(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
