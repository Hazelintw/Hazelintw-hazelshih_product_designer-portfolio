export default async function ProjectPage({ params }) {
  const { slug } = await params

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 capitalize">{slug}</h1>
      <p className="text-muted-foreground">Project detail coming soon.</p>
    </div>
  )
}
