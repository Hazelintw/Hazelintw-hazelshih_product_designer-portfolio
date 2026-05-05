"use client"

// TODO: populate with actual project sections
const sections = ["Overview", "Process", "Outcome"]

export default function ProjectSidebar() {
  return (
    <nav className="sticky top-24 flex flex-col gap-2">
      {sections.map((s) => (
        <a
          key={s}
          href={`#${s.toLowerCase()}`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {s}
        </a>
      ))}
    </nav>
  )
}
