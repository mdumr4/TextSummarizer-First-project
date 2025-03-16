"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { getSavedSummaries, deleteSummary } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Trash2, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import LoginPrompt from "@/components/login-prompt"

interface SavedSummary {
  id: string
  originalText: string
  summary: string
  timestamp: string
}

export default function SavedPage() {
  const [summaries, setSummaries] = useState<SavedSummary[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchSummaries = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const fetchedSummaries = await getSavedSummaries(user.uid)
        setSummaries(fetchedSummaries)
      } catch (error) {
        console.error("Error fetching summaries:", error)
        toast({
          title: "Error",
          description: "Failed to load saved summaries",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSummaries()
  }, [user, toast])

  const handleDelete = async (id: string) => {
    if (!user) return

    try {
      await deleteSummary(user.uid, id)
      setSummaries(summaries.filter((summary) => summary.id !== id))
      toast({
        title: "Success",
        description: "Summary deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting summary:", error)
      toast({
        title: "Error",
        description: "Failed to delete summary",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return <LoginPrompt message="Please log in to view your saved summaries" />
  }

  if (loading) {
    return (
      <div className="container mx-auto py-16 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="h-64 bg-gray-200 rounded max-w-3xl mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Saved Summaries</h1>

      {summaries.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">You don't have any saved summaries yet.</p>
          <Button variant="outline" href="/summarize">
            Create a Summary
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {summaries.map((summary) => (
            <Card key={summary.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Summary</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDistanceToNow(new Date(summary.timestamp), { addSuffix: true })}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Original Text:</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{summary.originalText}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Summary:</h3>
                  <p>{summary.summary}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="destructive" size="sm" onClick={() => handleDelete(summary.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

