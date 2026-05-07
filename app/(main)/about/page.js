import { SetPanelLinks } from "@/lib/left-panel-context"

const ABOUT_LINKS = [
  { id: "overview",  label: "Overview"  },
  { id: "education", label: "Education" },
  { id: "social",    label: "Social"    },
  { id: "fun",       label: "Fun stuff" },
]

export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <SetPanelLinks links={ABOUT_LINKS} title="About" />
      <h1 className="text-3xl font-bold mb-6">About</h1>
      <p className="text-muted-foreground leading-relaxed">
        {/* TODO: fill in bio */}
        Placeholder bio text.
      </p>
    </section>
  )
}
