"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { useAuth } from "@/context/auth-context"
import { saveSummary } from "@/lib/firebase"
import TextInput from "@/components/text-input"
import FileUpload from "@/components/file-upload"
import SummaryResult from "@/components/summary-result"
import { Loader2 } from "lucide-react"

export default function SummarizePage() {
  const [inputText, setInputText] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [summaryLength, setSummaryLength] = useState(0.5) // 0.3 = short, 0.5 = medium, 0.7 = long
  const { toast } = useToast()
  const { user } = useAuth()

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to summarize",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setSummary("")

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          length: summaryLength,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to summarize text")
      }

      const data = await response.json()
      setSummary(data.summary)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to summarize text. Please try again.",
        variant: "destructive",
      })
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save summaries",
        variant: "destructive",
      })
      return
    }

    if (!summary) {
      toast({
        title: "Error",
        description: "No summary to save",
        variant: "destructive",
      })
      return
    }

    try {
      await saveSummary(user.uid, {
        originalText: inputText,
        summary,
        timestamp: new Date().toISOString(),
      })

      toast({
        title: "Success",
        description: "Summary saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save summary",
        variant: "destructive",
      })
      console.error("Error:", error)
    }
  }

  const handleFileContent = (content: string) => {
    setInputText(content)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Text Summarizer</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <Tabs defaultValue="text">
              <TabsList className="mb-4">
                <TabsTrigger value="text">Paste Text</TabsTrigger>
                <TabsTrigger value="file">Upload File</TabsTrigger>
              </TabsList>

              <TabsContent value="text">
                <TextInput value={inputText} onChange={(e) => setInputText(e.target.value)} />
              </TabsContent>

              <TabsContent value="file">
                <FileUpload onFileContent={handleFileContent} />
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Summary Length:</span>
                <span className="text-sm font-medium">
                  {summaryLength <= 0.3 ? "Short" : summaryLength <= 0.6 ? "Medium" : "Long"}
                </span>
              </div>
              <Slider
                value={[summaryLength]}
                min={0.1}
                max={0.9}
                step={0.1}
                onValueChange={(value) => setSummaryLength(value[0])}
                className="mb-6"
              />

              <Button onClick={handleSummarize} className="w-full" disabled={loading || !inputText.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  "Summarize"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <SummaryResult summary={summary} loading={loading} onSave={handleSave} isAuthenticated={!!user} />
      </div>
    </div>
  )
}

