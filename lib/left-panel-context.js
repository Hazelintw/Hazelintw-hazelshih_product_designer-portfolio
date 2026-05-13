"use client"

import { createContext, useContext, useState, useEffect } from "react"

/* ── Context ─────────────────────────────────────────── */
const LeftPanelContext = createContext({
  links:            [],
  setLinks:         () => {},
  title:            null,
  setTitle:         () => {},
  text:             null,
  setText:          () => {},
  buttonLabel:      null,
  setButtonLabel:   () => {},
  buttonHref:       null,
  setButtonHref:    () => {},
  showText:         null,
  setShowText:      () => {},
  showButton:       null,
  setShowButton:    () => {},
  showFooter:       null,
  setShowFooter:    () => {},
})

/* ── Provider（放在 root layout）────────────────────── */
export function LeftPanelProvider({ children }) {
  const [links,       setLinks]       = useState([])
  const [title,       setTitle]       = useState(null)
  const [text,        setText]        = useState(null)
  const [buttonLabel, setButtonLabel] = useState(null)
  const [buttonHref,  setButtonHref]  = useState(null)
  const [showText,    setShowText]    = useState(null)
  const [showButton,  setShowButton]  = useState(null)
  const [showFooter,  setShowFooter]  = useState(null)

  return (
    <LeftPanelContext.Provider
      value={{
        links, setLinks,
        title, setTitle,
        text, setText,
        buttonLabel, setButtonLabel,
        buttonHref, setButtonHref,
        showText, setShowText,
        showButton, setShowButton,
        showFooter, setShowFooter,
      }}
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
 *  - links       { id, label }[]    anchor 連結清單（預設空陣列）
 *  - title       string             頁面標題（H1）
 *  - text        string             body 文字（支援 \n\n 換段）
 *  - buttonLabel string             CTA 按鈕文字
 *  - buttonHref  string             CTA 按鈕連結
 *  - showText    boolean            顯示 body 文字
 *  - showButton  boolean            顯示 CTA 按鈕
 *  - showFooter  boolean            顯示 Footer
 */
export function SetPanelLinks({
  links = [], title, text, buttonLabel, buttonHref,
  showText, showButton, showFooter,
}) {
  const {
    setLinks, setTitle, setText, setButtonLabel, setButtonHref,
    setShowText, setShowButton, setShowFooter,
  } = useContext(LeftPanelContext)

  useEffect(() => {
    setLinks(links)
    if (title       !== undefined) setTitle(title)
    if (text        !== undefined) setText(text)
    if (buttonLabel !== undefined) setButtonLabel(buttonLabel)
    if (buttonHref  !== undefined) setButtonHref(buttonHref)
    if (showText    !== undefined) setShowText(showText)
    if (showButton  !== undefined) setShowButton(showButton)
    if (showFooter  !== undefined) setShowFooter(showFooter)

    return () => {
      setLinks([])
      setTitle(null)
      setText(null)
      setButtonLabel(null)
      setButtonHref(null)
      setShowText(null)
      setShowButton(null)
      setShowFooter(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
