"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type TodoStatsProps = {
  activeCount: number
  completedCount: number
  filter: "all" | "active" | "completed"
  onFilterChange: (filter: "all" | "active" | "completed") => void
  onClearCompleted: () => void
}

export function TodoStats({ activeCount, completedCount, filter, onFilterChange, onClearCompleted }: TodoStatsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-card border border-border">
      <div className="flex gap-2 text-sm">
        <span className="font-medium text-foreground">{activeCount}</span>
        <span className="text-muted-foreground">{activeCount === 1 ? "task" : "tasks"} left</span>
      </div>

      <div className="flex gap-1">
        <Button
          variant={filter === "all" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onFilterChange("all")}
          className={cn(filter === "all" && "bg-primary text-primary-foreground hover:bg-primary/90")}
        >
          {"All"}
        </Button>
        <Button
          variant={filter === "active" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onFilterChange("active")}
          className={cn(filter === "active" && "bg-primary text-primary-foreground hover:bg-primary/90")}
        >
          {"Active"}
        </Button>
        <Button
          variant={filter === "completed" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onFilterChange("completed")}
          className={cn(filter === "completed" && "bg-primary text-primary-foreground hover:bg-primary/90")}
        >
          {"Completed"}
        </Button>
      </div>

      {completedCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearCompleted}
          className="text-muted-foreground hover:text-destructive"
        >
          {"Clear completed"}
        </Button>
      )}
    </div>
  )
}
