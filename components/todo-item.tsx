"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Pencil, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Todo } from "./todo-app"

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-3 p-4 rounded-lg bg-card border border-border",
        "transition-all duration-200 hover:border-primary/30",
        todo.completed && "opacity-60",
      )}
    >
      <Checkbox checked={todo.completed} onCheckedChange={() => onToggle(todo.id)} className="h-5 w-5" />

      {isEditing ? (
        <>
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 h-9"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave()
              if (e.key === "Escape") handleCancel()
            }}
          />
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" className="h-9 w-9" onClick={handleSave}>
              <Check className="h-4 w-4 text-accent" />
            </Button>
            <Button size="icon" variant="ghost" className="h-9 w-9" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <>
          <p
            className={cn(
              "flex-1 text-base transition-all leading-relaxed",
              todo.completed && "line-through text-muted-foreground",
            )}
          >
            {todo.text}
          </p>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 hover:text-destructive"
              onClick={() => onDelete(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
