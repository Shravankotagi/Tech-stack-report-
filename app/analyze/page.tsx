'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowRight, Info } from 'lucide-react'
import StackInputForm from '@/components/input/StackInputForm'
import PasteExamples from '@/components/input/PasteExamples'

export default function AnalyzePage() {
  const router   = useRouter()
  const [text, setText]       = useState('')
  const [loading, setLoading] = useState(false)

  const charCount = text.length
  const isValid   = charCount >= 20 && charCount <= 5000

  async function handleSubmit() {
    if (!isValid || loading) return
    setLoading(true)

    try {
      const res = await fetch('/api/audit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ stackText: text }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        if (data.code === 'RATE_LIMIT') {
          toast.error('Rate limit reached. You can run 5 audits per hour.')
        } else {
          toast.error(data.error ?? 'Something went wrong. Please try again.')
        }
        return
      }

      // Redirect to results page
      router.push(`/audit/${data.shareId}`)

    } catch {
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-el-bg">

      {/* Page Header */}
      <div className="bg-el-navy py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-white/60 text-sm mb-2 uppercase tracking-wide">Free Tool</p>
          <h1 className="text-white font-bold text-3xl md:text-4xl mb-3">
            Audit Your Tech Stack
          </h1>
          <p className="text-white/70 text-lg">
            Paste your stack, architecture notes, or a job listing below.
            Our AI will analyse it across 5 engineering dimensions.
          </p>
        </div>
      </div>

      {/* Blue divider */}
      <div className="el-divider-band" />

      {/* Main Form */}
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Info box */}
        <div className="flex items-start gap-3 bg-el-blue-light border border-blue-200 rounded-lg px-4 py-3 mb-8">
          <Info size={16} className="text-el-blue mt-0.5 shrink-0" />
          <p className="text-sm text-el-blue">
            <strong>What to paste:</strong> A list of your tech tools, a paragraph about your
            architecture, deployment setup, or even a job description. The more detail, the
            more precise the audit.
          </p>
        </div>

        {/* Textarea */}
        <StackInputForm
          value={text}
          onChange={setText}
          disabled={loading}
        />

        {/* Character count */}
        <div className="flex items-center justify-between mt-2 mb-6">
          <span className={`text-xs ${
            charCount < 20 ? 'text-el-muted' :
            charCount > 4500 ? 'text-orange-500' :
            'text-green-600'
          }`}>
            {charCount < 20
              ? `${20 - charCount} more characters needed`
              : charCount > 4500
              ? `${5000 - charCount} characters remaining`
              : `${charCount} characters — looks good`
            }
          </span>
          <span className="text-xs text-el-muted">{charCount} / 5000</span>
        </div>

        {/* Examples */}
        <div className="mb-8">
          <PasteExamples onSelect={(example) => setText(example)} />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-md font-semibold text-base transition-all duration-200
            ${isValid && !loading
              ? 'bg-el-blue text-white hover:bg-el-blue-dark shadow-el-blue cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Analysing your stack...
            </>
          ) : (
            <>
              Analyse My Stack
              <ArrowRight size={20} />
            </>
          )}
        </button>

        {loading && (
          <p className="text-center text-sm text-el-muted mt-4 animate-pulse">
            Our AI is reviewing your stack across 5 engineering dimensions...
            this takes about 15–30 seconds.
          </p>
        )}

        {/* Privacy note */}
        <p className="text-center text-xs text-el-muted mt-6">
          Your input is stored to generate a shareable report link.
          We do not share your data with third parties.
        </p>

      </div>
    </div>
  )
}