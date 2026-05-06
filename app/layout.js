import "./globals.css"
import { Inter } from "next/font/google"
import SiteChrome from "@/components/SiteChrome"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Portfolio",
  description: "My personal portfolio",
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        {/*
          SiteChrome 是 client component，依路由決定是否渲染
          全域 Navbar / Footer。
          Project detail 頁面有自己的兩欄佈局，不走這裡。
        */}
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
