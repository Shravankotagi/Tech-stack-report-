'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowRight, Info } from 'lucide-react'
import StackInputForm from '@/components/input/StackInputForm'
import PasteExamples from '@/components/input/PasteExamples'

// ─── Frontend Validation ───────────────────────────────────────────────────────

const KNOWN_TECHS = /\b(next\.?js|react|vue|angular|svelte|node|python|django|fastapi|flask|rails|laravel|spring|express|postgres|mysql|mongodb|redis|kafka|rabbitmq|docker|kubernetes|k8s|aws|gcp|azure|vercel|netlify|heroku|github|gitlab|jenkins|terraform|typescript|javascript|go|rust|java|php|swift|kotlin|graphql|rest|grpc|nginx|cloudfront|s3|lambda|ecs|eks|rds|dynamodb|elasticsearch|datadog|sentry|grafana|prometheus|stripe|twilio|supabase|firebase|prisma|tailwind|bootstrap|jquery|webpack|vite|remix|nuxt|gatsby|flutter|react native|kotlin|swift|postgres|sqlite|cassandra|neo4j|clickhouse|snowflake|bigquery|dbt|airflow|celery|fastify|hono|bun|deno)\b/gi

const GIBBERISH = /^[^a-zA-Z]*$|^(.)\1{10,}$/

const PROMPT_INJECTION = /ignore (previous|all|prior)|you are now|pretend you|act as|jailbreak|system prompt|forget everything/i

const NONSENSICAL_CATEGORIES: Array<{ label: RegExp; techs: RegExp }> = [
  { label: /frontend/i,    techs: /\b(python|java(?!script)|php|ruby|go|rust|c\+\+|c#|\.net|aws|gcp|azure|kubernetes|docker|sql|postgres|mysql|mongodb|redis|kafka)\b/i },
  { label: /backend/i,     techs: /\b(html|css|tailwind|bootstrap|figma|sketch|photoshop|svg)\b/i },
  { label: /database/i,    techs: /\b(html|css|javascript|typescript|react|vue|angular|next\.?js|tailwind)\b/i },
]

function validateInput(text: string): { valid: boolean; error?: string } {
  const trimmed = text.trim()

  // Gibberish check
  if (GIBBERISH.test(trimmed)) {
    return { valid: false, error: 'This doesn\'t look like a tech stack. Please describe your actual technologies.' }
  }

  // Prompt injection check
  if (PROMPT_INJECTION.test(trimmed)) {
    return { valid: false, error: 'Invalid input. Please describe your actual tech stack.' }
  }

  // Off-topic check — no tech keywords at all
  const techMatches = trimmed.match(KNOWN_TECHS) || []
  const uniqueTechs = new Set(techMatches.map(t => t.toLowerCase()))

  if (uniqueTechs.size === 0) {
    return { valid: false, error: 'No technologies detected. Please mention your actual stack — e.g. React, Node.js, PostgreSQL, AWS.' }
  }

  if (uniqueTechs.size < 2) {
    return { valid: false, error: 'Please provide more detail — include at least your frontend, backend, and database or hosting.' }
  }

  // Nonsensical category/tech combinations
  for (const { label, techs } of NONSENSICAL_CATEGORIES) {
    const labelMatch = trimmed.match(label)
    if (labelMatch) {
      const lineWithLabel = trimmed.split('\n').find(line => label.test(line))
      if (lineWithLabel && techs.test(lineWithLabel)) {
        return {
          valid: false,
          error: `It looks like there may be a mistake — check your ${labelMatch[0].toLowerCase()} technologies. For example, HTML/CSS are not backend technologies, and Python is not a frontend framework.`,
        }
      }
    }
  }

  return { valid: true }
}

// ─── Page Component ────────────────────────────────────────────────────────────

export default function AnalyzePage() {
  const router = useRouter()
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  const charCount = text.length
  const isLongEnough = charCount >= 20 && charCount <= 5000

  function handleTextChange(val: string) {
    setText(val)
    if (validationError) setValidationError(null)
  }

  async function handleSubmit() {
    if (!isLongEnough || loading) return

    // Frontend validation
    const validation = validateInput(text)
    if (!validation.valid) {
      setValidationError(validation.error!)
      return
    }

    setLoading(true)
    setValidationError(null)

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stackText: text }),
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

      router.push(`/audit/${data.shareId}`)

    } catch {
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const isValid = isLongEnough && !validationError

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

      <div className="el-divider-band" />

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Info box */}
        <div className="flex items-start gap-3 bg-el-blue-light border border-blue-200 rounded-lg px-4 py-3 mb-8">
          <Info size={16} className="text-el-blue mt-0.5 shrink-0" />
          <p className="text-sm text-el-blue">
            <strong>What to paste:</strong> Describe your frontend framework, backend language, database, hosting/infrastructure, and any tools for CI/CD, monitoring, or auth. The more detail, the more precise the audit.
          </p>
        </div>

        {/* Textarea */}
        <StackInputForm
          value={text}
          onChange={handleTextChange}
          disabled={loading}
          hasError={!!validationError}
        />

        {/* Validation error */}
        {validationError && (
          <div className="mt-2 flex items-start gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <span className="text-sm">{validationError}</span>
          </div>
        )}

        {/* Character count */}
        <div className="flex items-center justify-between mt-2 mb-6">
          <span className={`text-xs ${
            charCount < 20 ? 'text-el-muted' :
            validationError ? 'text-red-500' :
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
          <PasteExamples onSelect={(example) => { setText(example); setValidationError(null) }} />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isLongEnough || loading}
          className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-md font-semibold text-base transition-all duration-200
            ${isLongEnough && !loading
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

        <p className="text-center text-xs text-el-muted mt-6">
          Your input is stored to generate a shareable report link.
          We do not share your data with third parties.
        </p>

      </div>
    </div>
  )
}