"use client"

import { createContext, useContext, useState, useEffect } from "react"

/* ── Context ─────────────────────────────────────────── */
const LeftPanelContext = createContext({
  links:         [],
  setLinks:      () => {},
  title:         null,
  setTitle:      () => {},
  showHero:      null,
  setShowHero:   () => {},
  showFooter:    null,
  setShowFooter: () => {},
})

/* ── Provider（放在 root layout）────────────────────── */
export function LeftPanelProvider({ children }) {
  const [links,      setLinks]      = useState([])
  const [title,      setTitle]      = useState(null)
  const [showHero,   setShowHero]   = useState(null)
  const [showFooter, setShowFooter] = useState(null)

  return (
    <LeftPanelContext.Provider
      value={{ links, setLinks, title, setTitle, showHero, setShowHero, showFooter, setShowFooter }}
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
 *  - links      { id, label }[]    anchor 連結清單（預設空陣列）
 *  - title      string | undefined 顯示在 Hero 上方的頁面標題
 *  - showHero   boolean | undefined
 *  - showFooter boolean | undefined
 */
export function SetPanelLinks({ links = [], title, showHero, showFooter }) {
  const { setLinks, setTitle, setShowHero, setShowFooter } = useContext(LeftPanelContext)

  useEffect(() => {
    setLinks(links)
    if (title      !== undefined) setTitle(title)
    if (showHero   !== undefined) setShowHero(showHero)
    if (showFooter !== undefined) setShowFooter(showFooter)

    return () => {
      setLinks([])
      setTitle(null)
      setShowHero(null)
      setShowFooter(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
