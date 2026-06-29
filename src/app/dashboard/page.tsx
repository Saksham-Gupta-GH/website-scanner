"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Loader2, Globe, AlertTriangle } from "lucide-react"
import Link from "next/link"

function DashboardContent() {
  const searchParams = useSearchParams()
  const url = searchParams.get("url")
  
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) {
      setError("No URL provided.")
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/analyze?url=${encodeURIComponent(url)}`)
        const result = await response.json()
        
        if (result.status === "error") {
          setError(result.message || "Failed to analyze website.")
        } else {
          setData(result)
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
        <h2 className="text-2xl font-bold tracking-tight">Analyzing {url}...</h2>
        <p className="text-zinc-400 max-w-md">
          Our AI is crawling the website, extracting metadata, and analyzing the UX, SEO, and copywriting. This usually takes 10-15 seconds.
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center text-red-400">
        <AlertTriangle className="w-12 h-12" />
        <h2 className="text-2xl font-bold">Analysis Failed</h2>
        <p className="max-w-md">{error}</p>
        <Link href="/" className="px-4 py-2 bg-white text-black rounded-full font-medium mt-4">
          Try Again
        </Link>
      </div>
    )
  }

  // Basic rendering of raw data for now, until we build the full dashboard UI
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3">
        <Globe className="w-8 h-8 text-purple-400" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analysis Results</h1>
          <p className="text-zinc-400">{url}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Overall Score</CardTitle>
            <CardDescription className="text-zinc-400">AI computed optimization score</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-600 mb-4">
              {data?.analysis?.overall_score || "N/A"}
            </div>
            <Progress value={data?.analysis?.overall_score || 0} className="w-full h-2 bg-zinc-800 [&>div]:bg-purple-500" />
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Key Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data?.analysis?.recommendations?.map((rec: string, i: number) => (
                <li key={i} className="flex gap-3 text-zinc-300">
                  <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
                  <span>{rec}</span>
                </li>
              )) || <li className="text-zinc-500">No recommendations available or AI parsing failed.</li>}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Raw Data Output for debugging */}
      <Card className="bg-zinc-900 border-zinc-800 text-white mt-8">
        <CardHeader>
          <CardTitle>Raw Data (Debug)</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-black p-4 rounded-md overflow-x-auto text-xs text-zinc-400">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <nav className="mb-12">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter w-fit hover:opacity-80 transition-opacity">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span>OptimizAI</span>
        </Link>
      </nav>
      
      <main className="max-w-6xl mx-auto">
        <Suspense fallback={<Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-500" />}>
          <DashboardContent />
        </Suspense>
      </main>
    </div>
  )
}
