import Link from "next/link"
import { GitFork, Mail, ArrowLeft, ArrowRight } from "lucide-react"

function LinkedInIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
    </svg>
  )
}
import { cn } from "@/lib/utils"

/**
 * Footer — 兩種變體
 *
 * variant="default"（預設）：一般版，用在 Homepage / About
 *  - 左側：社群 icon（Github / Linkedin / Mail）
 *  - 右側：email 文字
 *
 * variant="project"：Project Detail 版
 *  - 上方：居中顯示 "Thanks for reading!"
 *  - 下方：上一篇 / 下一篇導覽
 *
 * Props（variant="project" 才需要）：
 *  - prev  { href, title }  上一篇連結，不傳則隱藏左箭頭
 *  - next  { href, title }  下一篇連結，不傳則隱藏右箭頭
 */
export default function Footer({ variant = "default", prev, next, className }) {
  if (variant === "project") {
    return <ProjectFooter prev={prev} next={next} className={className} />
  }
  return <DefaultFooter className={className} />
}

/* ── 一般版 ──────────────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    href: "https://github.com",          // TODO: 換成真實連結
    icon: GitFork,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com",        // TODO: 換成真實連結
    icon: LinkedInIcon,
    label: "LinkedIn",
  },
  {
    href: "mailto:hello@example.com",    // TODO: 換成真實 email
    icon: Mail,
    label: "Email",
  },
]

function DefaultFooter({ className }) {
  return (
    <footer
      className={cn(
        "border-t px-6 py-5 flex items-center justify-between text-sm text-muted-foreground",
        className
      )}
    >
      {/* 左側：社群 icon */}
      <ul className="flex items-center gap-3">
        {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center size-8 rounded-md transition-colors hover:text-foreground hover:bg-muted"
            >
              <Icon className="size-4" />
            </a>
          </li>
        ))}
      </ul>

      {/* 右側：email */}
      <span className="text-xs">
        hello@example.com {/* TODO: 換成真實 email */}
      </span>
    </footer>
  )
}

/* ── Project Detail 版 ───────────────────────────────── */
function ProjectFooter({ prev, next, className }) {
  return (
    <footer className={cn("border-t", className)}>

      {/* Thanks for reading */}
      <div className="py-10 text-center">
        <p className="text-base font-medium text-foreground">Thanks for reading!</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Check out more projects below.
        </p>
      </div>

      {/* 上一篇 / 下一篇 */}
      {(prev || next) && (
        <div className="border-t px-6 py-5 flex items-center justify-between gap-4 text-sm">

          {/* 上一篇 */}
          {prev ? (
            <Link
              href={prev.href}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors max-w-[45%]"
            >
              <ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
              <span className="truncate">{prev.title}</span>
            </Link>
          ) : (
            <span /> /* 占位，保持右側靠右 */
          )}

          {/* 下一篇 */}
          {next ? (
            <Link
              href={next.href}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors max-w-[45%] ml-auto"
            >
              <span className="truncate">{next.title}</span>
              <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : null}

        </div>
      )}
    </footer>
  )
}
