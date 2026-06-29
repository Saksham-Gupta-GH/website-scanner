"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Home() {
  const [url, setUrl] = useState("")
  const router = useRouter()

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault()
    if (url) {
      router.push(`/dashboard?url=${encodeURIComponent(url)}`)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span>OptimizAI</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Saksham-Gupta-GH" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          Introducing AI Website Optimization
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white to-zinc-500 text-transparent bg-clip-text">
          Turn your website into a <br /> conversion machine.
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl">
          Instantly analyze your landing page for UX, SEO, and copywriting flaws. 
          Get actionable insights and AI-generated redesigns to boost conversions.
        </p>

        <form 
          onSubmit={handleAnalyze}
          className="w-full max-w-md flex items-center gap-2 p-1.5 bg-zinc-900 border border-zinc-800 rounded-full focus-within:border-purple-500/50 focus-within:ring-4 focus-within:ring-purple-500/10 transition-all"
        >
          <Input 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your website URL (e.g., https://startup.com)" 
            className="bg-transparent border-none text-white placeholder:text-zinc-500 focus-visible:ring-0 px-4 h-11"
            type="url"
            required
          />
          <Button type="submit" className="rounded-full bg-purple-600 hover:bg-purple-500 h-11 px-6 font-medium">
            Analyze
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
        
        <div className="mt-20 pt-10 border-t border-white/5 w-full">
          <p className="text-sm text-zinc-500 mb-6">Trusted by founders and marketing teams</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale">
            <span className="font-bold text-xl">ACME Corp</span>
            <span className="font-bold text-xl">Globex</span>
            <span className="font-bold text-xl">Soylent</span>
          </div>
        </div>
      </main>
    </div>
  )
}
