export default function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col h-full overflow-hidden border border-gray-700/50 bg-gray-900/30 rounded-lg p-6 animate-pulse">
      <div className="mb-3 space-y-2">
        <div className="h-5 w-2/5 bg-muted rounded" />
        <div className="h-3 w-full bg-muted/60 rounded" />
        <div className="h-3 w-3/4 bg-muted/60 rounded" />
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-5 w-12 bg-muted rounded-full" />
        <div className="h-5 w-12 bg-muted rounded-full" />
      </div>
      <div className="flex gap-2 flex-wrap mb-4">
        <div className="h-5 w-16 bg-muted/50 rounded-full" />
        <div className="h-5 w-20 bg-muted/50 rounded-full" />
        <div className="h-5 w-14 bg-muted/50 rounded-full" />
      </div>
      <div className="mt-auto flex gap-2 pt-4">
        <div className="h-9 flex-1 bg-muted rounded" />
      </div>
    </div>
  )
}
