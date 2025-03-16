"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Upload, File, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileUploadProps {
  onFileContent: (content: string) => void
}

export default function FileUpload({ onFileContent }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length) {
      processFile(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  const processFile = (file: File) => {
    setError(null)

    // Check file type
    const validTypes = ["text/plain", "application/pdf"]
    if (!validTypes.includes(file.type)) {
      setError("Please upload a TXT or PDF file")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit")
      return
    }

    setFileName(file.name)

    const reader = new FileReader()

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        onFileContent(event.target.result)
        toast({
          title: "File uploaded",
          description: `Successfully loaded ${file.name}`,
        })
      }
    }

    reader.onerror = () => {
      setError("Error reading file")
    }

    if (file.type === "text/plain") {
      reader.readAsText(file)
    } else if (file.type === "application/pdf") {
      // For PDF files, we would normally use a PDF.js or similar library
      // For this example, we'll just show a message that PDF parsing would happen here
      toast({
        title: "PDF Processing",
        description: "PDF processing would extract text here in a real implementation",
      })
      // Simulating text extraction from PDF
      onFileContent(`[Text extracted from ${file.name}]`)
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-border"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <h3 className="text-lg font-medium">Drag & Drop File</h3>
          <p className="text-sm text-muted-foreground">Support for TXT and PDF files</p>

          <input type="file" id="file-upload" className="hidden" accept=".txt,.pdf" onChange={handleFileChange} />

          <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()} className="mt-2">
            <File className="mr-2 h-4 w-4" />
            Browse Files
          </Button>
        </div>
      </div>

      {fileName && (
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center space-x-2">
            <File className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">{fileName}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setFileName(null)
              onFileContent("")
            }}
          >
            Remove
          </Button>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

