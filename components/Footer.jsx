import Link from "next/link"
import { GitFork, Globe, Mail, ArrowLeft, ArrowRight } from "lucide-react"
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
    icon: Globe,
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
