import { Badge as ShadcnBadge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/**
 * ProjectBadge — 用於標示技術類型或分類（如 App / Web / UI）
 *
 * Props:
 *  - label   {string}  顯示文字，e.g. "App"
 *  - variant {string}  shadcn badge variant：default | secondary | outline | ghost
 *  - className         額外 className，之後可覆寫顏色
 */
export default function ProjectBadge({ label, variant = "secondary", className }) {
  return (
    <ShadcnBadge
      variant={variant}
      className={cn("cursor-default select-none", className)}
    >
      {label}
    </ShadcnBadge>
  )
}
