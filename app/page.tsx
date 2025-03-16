import type { Metadata } from "next"
import Hero from "@/components/hero"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import Testimonials from "@/components/testimonials"
import CTA from "@/components/cta"

export const metadata: Metadata = {
  title: "SummarizeAI - Free Text Summarization Tool",
  description:
    "A free, AI-powered text summarization tool that generates concise summaries while preserving key details.",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </main>
  )
}

