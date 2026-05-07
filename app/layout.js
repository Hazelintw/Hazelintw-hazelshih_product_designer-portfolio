import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Portfolio",
  description: "My personal portfolio",
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className={cn(inter.className, "flex min-h-screen")}>
        {children}
      </body>
    </html>
  )
}
