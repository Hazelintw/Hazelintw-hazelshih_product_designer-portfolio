"use client"

import { useState } from "react"
import FilterTabs from "@/components/FilterTabs"
import MasonryGrid from "@/components/MasonryGrid"

const TABS = [
  { id: "all",         label: "All"          },
  { id: "experiments", label: "Experiments"  },
  { id: "visual",      label: "Visual Works" },
]

const ALL_ITEMS = [
  {
    id: "ascii",
    src: "https://picsum.photos/seed/ascii/800/1000",
    alt: "ASCII Motion",
    href: "#",
    width: 800,
    height: 1000,
    category: "experiments",
  },
  {
    id: "pixel",
    src: "https://picsum.photos/seed/pixel/800/600",
    alt: "Pixel House",
    href: "#",
    width: 800,
    height: 600,
    category: "visual",
  },
  {
    id: "loader",
    src: "https://picsum.photos/seed/loader/800/800",
    alt: "Loading Animation",
    href: "#",
    width: 800,
    height: 800,
    category: "experiments",
  },
  {
    id: "type",
    src: "https://picsum.photos/seed/type/800/1067",
    alt: "Typography",
    href: "#",
    width: 800,
    height: 1067,
    category: "visual",
  },
  {
    id: "motion",
    src: "https://picsum.photos/seed/motion/800/600",
    alt: "Motion Study",
    href: "#",
    width: 800,
    height: 600,
    category: "experiments",
  },
  {
    id: "gradient",
    src: "https://picsum.photos/seed/gradient/800/900",
    alt: "Gradient Poster",
    href: "#",
    width: 800,
    height: 900,
    category: "visual",
  },
]

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filtered =
    activeTab === "all"
      ? ALL_ITEMS
      : ALL_ITEMS.filter((item) => item.category === activeTab)

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Playground</h1>

      <FilterTabs tabs={TABS} value={activeTab} onChange={setActiveTab} />

      <div className="mt-5">
        {filtered.length > 0 ? (
          <MasonryGrid items={filtered} className="md:columns-3 lg:columns-4" />
        ) : (
          <p className="text-sm text-muted-foreground">此分類目前沒有作品。</p>
        )}
      </div>
    </section>
  )
}
