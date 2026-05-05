import ProjectSidebar from "@/components/ProjectSidebar"

export default function ProjectLayout({ children }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24 flex gap-12">
      <aside className="hidden md:block w-64 shrink-0">
        <ProjectSidebar />
      </aside>
      <article className="flex-1 min-w-0">{children}</article>
    </div>
  )
}
