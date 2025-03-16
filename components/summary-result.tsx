"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Copy, Save, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SummaryResultProps {
  summary: string
  loading: boolean
  onSave: () => void
  isAuthenticated: boolean
}

export default function SummaryResult({ summary, loading, onSave, isAuthenticated }: SummaryResultProps) {
  const { toast } = useToast()

  const handleCopy = () => {
    navigator.clipboard.writeText(summary)
    toast({
      title: "Copied",
      description: "Summary copied to clipboard",
    })
  }

  return (
    <Card className="col-span-1">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Summary</h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Generating summary...</p>
            </div>
          ) : summary ? (
            <div className="rounded-md border p-4 min-h-[200px]">
              <p className="whitespace-pre-line">{summary}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 py-8 text-center">
              <p className="text-muted-foreground">Your summary will appear here after processing</p>
            </div>
          )}
        </div>
      </CardContent>

      {summary && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button onClick={onSave} disabled={!isAuthenticated}>
            <Save className="mr-2 h-4 w-4" />
            {isAuthenticated ? "Save" : "Login to Save"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

