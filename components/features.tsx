import { FileText, Zap, Sliders, Save, Upload, Lock } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Text Summarization",
      description: "Paste any text and get a concise summary that preserves all key information.",
    },
    {
      icon: <Upload className="h-10 w-10 text-primary" />,
      title: "File Upload",
      description: "Upload TXT and PDF files directly for instant summarization.",
    },
    {
      icon: <Sliders className="h-10 w-10 text-primary" />,
      title: "Customizable Length",
      description: "Adjust summary length from short to long based on your needs.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Fast & Lightweight",
      description: "Get summaries in seconds with our optimized processing engine.",
    },
    {
      icon: <Save className="h-10 w-10 text-primary" />,
      title: "Save Summaries",
      description: "Create an account to save and access your summaries anytime, anywhere.",
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Secure & Private",
      description: "Your data is encrypted and never shared with third parties.",
    },
  ]

  return (
    <section className="py-16 bg-muted/50" id="features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powerful Features</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Everything you need to summarize text efficiently and effectively
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background">
              {feature.icon}
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

