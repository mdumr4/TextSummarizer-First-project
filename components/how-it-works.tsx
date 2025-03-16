import { Check } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Input Your Text",
      description: "Paste your text or upload a document file (TXT, PDF).",
    },
    {
      number: "02",
      title: "Customize Settings",
      description: "Adjust the summary length to match your needs.",
    },
    {
      number: "03",
      title: "Generate Summary",
      description: "Our AI analyzes the text and creates a concise summary.",
    },
    {
      number: "04",
      title: "Save or Share",
      description: "Save your summary for later or copy it for immediate use.",
    },
  ]

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Summarize any text in just a few simple steps
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-xl font-bold">{step.number}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-[50%] top-8 hidden h-[2px] w-full bg-border md:block"></div>
              )}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-center">{step.title}</h3>
                <p className="text-center text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center space-y-4">
          <h3 className="text-2xl font-bold">Why Choose Our Summarizer?</h3>
          <ul className="grid gap-2 md:grid-cols-2">
            {[
              "Powered by state-of-the-art T5 model",
              "Completely free to use",
              "No registration required",
              "Privacy-focused design",
              "Fast and responsive interface",
              "Works with various text formats",
              "Customizable summary length",
              "Save summaries for later use",
            ].map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

