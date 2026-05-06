import Link from "next/link"
import Image from "next/image"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import ProjectBadge from "@/components/Badge"
import { cn } from "@/lib/utils"

/**
 * ProjectCard — 單一作品卡片
 *
 * Props:
 *  - slug        {string}    連結至 /project/[slug]
 *  - projectName {string}    作品名稱（小字，card 上方）
 *  - title       {string}    卡片標題（H2 大字）
 *  - description {string}    文字說明
 *  - badges      {string[]}  標籤陣列，e.g. ["App", "UI"]
 *  - image       {string}    封面圖片路徑（public/ 下）
 *  - imageAlt    {string}    圖片 alt 文字
 *  - className               額外 className
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
    <Link href={`/project/${slug}`} className="block group/link focus-visible:outline-none">
      <Card
        className={cn(
          "transition-shadow duration-200 hover:shadow-md focus-within:shadow-md cursor-pointer",
          className
        )}
      >
        {/* ── 封面圖片 ─────────────────────────────── */}
        {image && (
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-300 group-hover/link:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        {/* ── Header：作品名稱 + 標題 ──────────────── */}
        <CardHeader>
          {/* 作品名稱（小字） */}
          {projectName && (
            <p className="text-xs text-muted-foreground tracking-wide uppercase">
              {projectName}
            </p>
          )}

          {/* 卡片標題（H2） */}
          <CardTitle>
            <h2 className="text-xl font-semibold leading-snug">{title}</h2>
          </CardTitle>

          {/* Badge 標籤 */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {badges.map((badge) => (
                <ProjectBadge key={badge} label={badge} />
              ))}
            </div>
          )}
        </CardHeader>

        {/* ── 文字說明 ─────────────────────────────── */}
        {description && (
          <CardContent>
            <CardDescription className="line-clamp-2">{description}</CardDescription>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
