import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { text, length } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Call the Flask backend API
    const response = await fetch(`${process.env.FLASK_API_URL}/summarize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, length }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: errorData.error || "Failed to summarize text" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in summarize API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

