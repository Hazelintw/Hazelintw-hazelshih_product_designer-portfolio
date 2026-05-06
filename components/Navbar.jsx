"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const navLinks = [
  { href: "/works", label: "Works" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [lang, setLang] = useState("zh") // "zh" | "en"

  function isActive(href) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur border-b">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 h-14">

        {/* ── Left：Avatar / Logo ─────────────────────── */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex size-8 rounded-full bg-muted items-center justify-center overflow-hidden ring-2 ring-border">
            {/* TODO: replace src with real avatar */}
            <svg viewBox="0 0 32 32" className="size-full text-muted-foreground" fill="currentColor">
              <circle cx="16" cy="12" r="6" />
              <ellipse cx="16" cy="26" rx="10" ry="6" />
            </svg>
          </span>
        </Link>

        {/* ── Center：nav links（desktop）────────────── */}
        <ul className="hidden md:flex items-center gap-7 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={
                  isActive(href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground transition-colors"
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Right：lang toggle + hamburger ──────────── */}
        <div className="flex items-center gap-2">

          {/* Lang toggle（desktop）*/}
          <div className="hidden md:flex items-center gap-1 rounded-md border px-1 py-0.5 text-xs font-medium">
            <button
              onClick={() => setLang("zh")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                lang === "zh"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              中
            </button>
            <span className="text-border select-none">|</span>
            <button
              onClick={() => setLang("en")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                lang === "en"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              En
            </button>
          </div>

          {/* Hamburger（mobile）*/}
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" />
              }
            >
              <Menu className="size-5" />
              <span className="sr-only">開啟選單</span>
            </SheetTrigger>

            <SheetContent side="right" className="w-64 pt-10">
              <SheetHeader>
                <SheetTitle className="sr-only">導覽選單</SheetTitle>
              </SheetHeader>

              {/* Mobile nav links */}
              <ul className="flex flex-col gap-1 px-4 mt-4">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive(href)
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile lang toggle */}
              <div className="flex items-center gap-1 rounded-md border w-fit px-1 py-0.5 text-xs font-medium mx-4 mt-6">
                <button
                  onClick={() => setLang("zh")}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    lang === "zh"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  中
                </button>
                <span className="text-border select-none">|</span>
                <button
                  onClick={() => setLang("en")}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    lang === "en"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  En
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </nav>
    </header>
  )
}
