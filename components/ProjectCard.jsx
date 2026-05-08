import Link from "next/link"
import Image from "next/image"
import ProjectBadge from "@/components/Badge"
import { cn } from "@/lib/utils"

/**
 * ProjectCard — 左右排版作品卡片
 *
 * Props:
 *  - slug        string    連結至 /project/[slug]
 *  - projectName string    作品名稱（小字）
 *  - title       string    標題
 *  - description string    文字說明
 *  - badges      string[]  標籤陣列
 *  - image       string    封面圖片 URL
 *  - imageAlt    string    圖片 alt 文字
 *  - className   string    額外 className
 */
export default function ProjectCard({
  slug,
  projectName,
  title,
  description,
  badges = [],
  image,
  imageAlt = "",
  className,
}) {
  return (
    <Link href={`/project/${slug}`} className={cn("block group", className)}>
      <div className="flex rounded-xl bg-muted overflow-hidden transition-shadow duration-200 hover:shadow-md h-[320px]">

        {/* ── 左側：文字內容 ────────────────────────── */}
        <div className="flex-1 px-8 py-10 flex flex-col gap-3 justify-center min-w-0">
          {projectName && (
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {projectName}
            </p>
          )}
          <h2 className="text-xl font-semibold leading-snug">{title}</h2>
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {badges.map((badge) => (
                <ProjectBadge key={badge} label={badge} />
              ))}
            </div>
          )}
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {description}
            </p>
          )}
        </div>

        {/* ── 右側：封面圖片（約 45% 寬）────────────── */}
        <div className="w-[45%] shrink-0 relative overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          ) : (
            <div className="absolute inset-0 bg-muted-foreground/10 flex items-center justify-center text-xs text-muted-foreground">
              No image
            </div>
          )}
        </div>

      </div>
    </Link>
  )
}
