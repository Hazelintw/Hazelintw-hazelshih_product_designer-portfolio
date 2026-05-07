import TopNav from "@/components/TopNav"

export default function PlaygroundLayout({ children }) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
