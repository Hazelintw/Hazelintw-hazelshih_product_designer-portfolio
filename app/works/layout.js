import TopNav from "@/components/TopNav"

export default function WorksLayout({ children }) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
