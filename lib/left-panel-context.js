"use client"

import { createContext, useContext, useState, useEffect } from "react"

/* ── Context ─────────────────────────────────────────── */
const LeftPanelContext = createContext({
  links: [],
  setLinks: () => {},
})

/* ── Provider（放在 root layout）────────────────────── */
export function LeftPanelProvider({ children }) {
  const [links, setLinks] = useState([])
  return (
    <LeftPanelContext.Provider value={{ links, setLinks }}>
      {children}
    </LeftPanelContext.Provider>
  )
}

/* ── Hook（LeftPanel 內部使用）───────────────────────── */
export function useLeftPanelLinks() {
  return useContext(LeftPanelContext)
}

/**
 * SetPanelLinks — 各頁面放這個元件來注入 anchor links
 *
 * Server Component 頁面也能直接 render 這個 client component。
 * mount 時設定 links，unmount（離開頁面）時清空。
 *
 * 使用範例：
 *   <SetPanelLinks links={[{ id: "works", label: "Works" }, ...]} />
 */
export function SetPanelLinks({ links = [] }) {
  const { setLinks } = useContext(LeftPanelContext)

  useEffect(() => {
    setLinks(links)
    return () => setLinks([])   // 離開頁面時清空，避免殘留
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])                        // 只在 mount / unmount 觸發

  return null
}
