import TopNav from "@/components/TopNav"

export default function FullwidthLayout({ children }) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1  px-6 md:px-16 lg:px-40 pt-12 pb-16">
        {children}
      </main>
    </div>
  )
}
