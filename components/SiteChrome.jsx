"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

/**
 * SiteChrome — 全域 Navbar / Footer 的條件渲染
 *
 * Project detail 頁面（/project/*）有自己的兩欄佈局，
 * Navbar 放在左欄內、Footer 放在 page.js 裡，
 * 所以這裡不重複渲染。
 *
 * 其他所有頁面（/、/works、/about…）照舊顯示全域 Navbar + Footer。
 */
export default function SiteChrome({ children }) {
  const pathname = usePathname()
  const isProjectPage = pathname.startsWith("/project/")

  if (isProjectPage) {
    // Project 頁面：只渲染 children，不加任何外殼
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
