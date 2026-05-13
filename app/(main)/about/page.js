import { SetPanelLinks } from "@/lib/left-panel-context"

const ABOUT_LINKS = [
  { id: "article",          label: "Article"          },
  { id: "work-experience",  label: "Work Experience"  },
  { id: "learning-process", label: "Learning Process" },
  { id: "community",        label: "Community"        },
]

const ABOUT_TEXT =
  "對我來說，問對問題比給出答案更重要——它能幫助團隊更精準地理解需求背後真正的目標。\n\n我習慣在設計過程中持續反思：這個方案解決的是真實問題嗎？能被團隊清楚理解嗎？能順利被實現嗎？設計對我來說是共創的過程，清晰的溝通與協作，是讓設計真正落地的關鍵。"

export default function AboutPage() {
  return (
    <section>
      <SetPanelLinks
        title="Hazel's Design Values"
        text={ABOUT_TEXT}
        buttonLabel="查看履歷"
        buttonHref="（請先填入雲端連結）"
        showText={true}
        showButton={true}
        showFooter={true}
        links={ABOUT_LINKS}
      />
      <h1 className="text-3xl font-bold mb-6">About</h1>
      <p className="text-muted-foreground leading-relaxed">
        {/* TODO: fill in bio */}
        Placeholder bio text.
      </p>
    </section>
  )
}
