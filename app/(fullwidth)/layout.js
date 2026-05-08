import TopNav from "@/components/TopNav"

export default function FullwidthLayout({ children }) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1  px-5 md:px-10 lg:px-40 pt-12 pb-16">
        {children}
      </main>
    </div>
  )
}
