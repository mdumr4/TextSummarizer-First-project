import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Save Time?</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Start summarizing your texts now. No credit card required.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/summarize">Try It Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

