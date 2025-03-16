"use client"

import type React from "react"

import { Textarea } from "@/components/ui/textarea"

interface TextInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextInput({ value, onChange }: TextInputProps) {
  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Paste your text here to summarize..."
        className="min-h-[200px] resize-y"
        value={value}
        onChange={onChange}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Paste or type any text</span>
        <span>{value.length} characters</span>
      </div>
    </div>
  )
}

