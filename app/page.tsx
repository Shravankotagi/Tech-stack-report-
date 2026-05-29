import Link from 'next/link'
import {
  ShieldCheck, Zap, Share2, FileDown,
  ArrowRight, CheckCircle2, AlertTriangle,
  BarChart3, Lock, Activity
} from 'lucide-react'
import HowItWorks from '@/components/landing/HowItWorks'
import TrustBadges from '@/components/landing/TrustBadges'

// ── Static example audit preview data ────────────────────────────────────────
const EXAMPLE_RISKS = [
  { label: 'Zero observability coverage',  severity: 'CRITICAL' },
  { label: 'No secrets management policy', severity: 'HIGH'     },
  { label: 'Single database, no replicas', severity: 'HIGH'     },
]

const EXAMPLE_STRENGTHS = [
  'Strong CI/CD pipeline with GitHub Actions',
  'TypeScript enforced across the codebase',
]

const EXAMPLE_TECHS = ['Next.js', 'FastAPI', 'PostgreSQL', 'AWS ECS', 'GitHub Actions']

const DIMENSIONS = [
  { label: 'Scalability',      score: 72, icon: BarChart3 },
  { label: 'Observability',    score: 18, icon: Activity   },
  { label: 'Security',         score: 61, icon: Lock       },
  { label: 'CI/CD Maturity',   score: 80, icon: Zap        },
  { label: 'Data Architecture',score: 55, icon: ShieldCheck},
]

const SEVERITY_STYLE: Record<string, string> = {
  CRITICAL: 'badge-critical',
  HIGH:     'badge-high',
  MEDIUM:   'badge-medium',
  LOW:      'badge-low',
}

// ── Feature cards for "Why use this tool" ─────────────────────────────────
const FEATURES = [
  {
    icon: Zap,
    title: 'Instant Analysis',
    desc:  'Paste your stack, get a full audit in under 30 seconds. No waiting, no forms.',
  },
  {
    icon: ShieldCheck,
    title: '5-Dimension Scoring',
    desc:  'Scalability, Observability, Security, CI/CD, and Data Architecture — all scored.',
  },
  {
    icon: Share2,
    title: 'Shareable Reports',
    desc:  'Every report gets a unique URL. Forward it to your board, your team, or your investors.',
  },
  {
    icon: FileDown,
    title: 'PDF Export',
    desc:  'Download a branded PDF report to attach to proposals or board decks.',
  },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-el-bg pt-16 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Copy */}
            <div className="animate-fade-up">
              <p className="text-el-body text-sm font-medium mb-3 tracking-wide uppercase">
                Free Tool by Enlight Lab
              </p>
              <h1 className="text-display-lg text-el-heading mb-6 text-balance">
                Instant AI Audit of<br />
                <span className="text-el-blue">Your Tech Stack</span>
              </h1>
              <p className="text-el-body text-lg mb-4 max-w-lg">
                Paste your stack, architecture notes, or a job listing.
                Get a structured risk and gap analysis in seconds — scored across
                5 engineering dimensions.
              </p>
              <p className="font-semibold text-el-heading mb-8">
                Free. No login. Shareable link included.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/analyze" className="btn-el-primary inline-flex items-center justify-center gap-2">
                  Audit My Stack
                  <ArrowRight size={18} />
                </Link>
                <Link href="#how-it-works" className="btn-el-outline inline-flex items-center justify-center gap-2">
                  See How It Works
                </Link>
              </div>

              {/* Trust line */}
              <p className="mt-6 text-sm text-el-muted flex items-center gap-2">
                <CheckCircle2 size={15} className="text-green-500" />
                Used by CTOs at early-stage startups and scaling enterprises
              </p>
            </div>

            {/* Right: Example Report Preview */}
            <div className="animate-fade-up animation-delay-200">
              <div className="bg-white rounded-xl border border-el-border shadow-el-hover overflow-hidden">

                {/* Preview header */}
                <div className="bg-el-navy px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-xs mb-1">Example Audit Report</p>
                    <p className="text-white font-semibold text-sm">SaaS Startup Stack</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-xs mb-1">Overall Score</p>
                    <p className="text-white font-bold text-2xl">62<span className="text-sm font-normal">/100</span></p>
                  </div>
                </div>

                {/* Tech badges */}
                <div className="px-5 py-3 border-b border-el-border flex flex-wrap gap-2">
                  {EXAMPLE_TECHS.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>

                {/* Dimension scores */}
                <div className="px-5 py-4 border-b border-el-border space-y-2">
                  {DIMENSIONS.map((d) => (
                    <div key={d.label} className="flex items-center gap-3">
                      <span className="text-el-body text-xs w-32 shrink-0">{d.label}</span>
                      <div className="flex-1 bg-el-border rounded-full h-1.5">
                        <div
                          className="bg-el-blue h-1.5 rounded-full transition-all"
                          style={{ width: `${d.score}%` }}
                        />
                      </div>
                      <span className={`text-xs font-semibold w-8 text-right ${
                        d.score < 30 ? 'text-red-500' :
                        d.score < 60 ? 'text-orange-500' : 'text-green-600'
                      }`}>{d.score}</span>
                    </div>
                  ))}
                </div>

                {/* Risks preview */}
                <div className="px-5 py-4 border-b border-el-border">
                  <p className="text-xs font-semibold text-el-heading mb-3 flex items-center gap-1.5">
                    <AlertTriangle size={13} className="text-orange-500" />
                    Risks Detected
                  </p>
                  <div className="space-y-2">
                    {EXAMPLE_RISKS.map((r) => (
                      <div key={r.label} className="flex items-center justify-between">
                        <span className="text-xs text-el-body">{r.label}</span>
                        <span className={SEVERITY_STYLE[r.severity]}>{r.severity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strengths preview */}
                <div className="px-5 py-4">
                  <p className="text-xs font-semibold text-el-heading mb-3 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-green-500" />
                    Strengths
                  </p>
                  <div className="space-y-1.5">
                    {EXAMPLE_STRENGTHS.map((s) => (
                      <p key={s} className="text-xs text-el-body flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span> {s}
                      </p>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Blue Divider Band (matches EL site) ──────────────────────────── */}
      <div className="el-divider-band mt-16" />

      {/* ── Why Use This Tool ─────────────────────────────────────────────── */}
      <section className="el-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-display-md text-el-heading mb-4">
              From Blind Spots to Board-Ready Clarity
            </h2>
            <p className="text-el-body text-lg max-w-2xl mx-auto">
              Engineering leaders use this tool to surface hidden risks before
              board meetings, due diligence, and team growth sprints.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div key={f.title}
                className={`el-card animate-fade-up`}
                style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-10 h-10 rounded-lg bg-el-blue-light flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-el-blue" />
                </div>
                <h3 className="font-semibold text-el-heading mb-2">{f.title}</h3>
                <p className="text-sm text-el-body">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="el-section bg-el-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-display-md text-el-heading mb-4">
              How It Works
            </h2>
            <p className="text-el-body text-lg max-w-xl mx-auto">
              Three steps from stack description to actionable audit report.
            </p>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* ── Navy CTA Band ─────────────────────────────────────────────────── */}
      <section className="el-section-navy el-section">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-display-md text-white mb-4">
            Ready to Audit Your Stack?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Takes 60 seconds. No login required. Get a shareable report
            your whole team can act on.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/analyze"
              className="bg-white text-el-blue font-semibold px-8 py-3 rounded-md hover:bg-el-blue-light transition-colors inline-flex items-center justify-center gap-2">
              Start Free Audit
              <ArrowRight size={18} />
            </Link>
            <Link href="https://enlightlab.com/contact"
              className="border border-white/40 text-white font-semibold px-8 py-3 rounded-md hover:bg-white/10 transition-colors inline-flex items-center justify-center">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="el-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-display-md text-el-heading mb-12 text-center">
            What Engineering Leaders Say
          </h2>
          <TrustBadges />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="el-section bg-el-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-display-md text-el-heading mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQ.map((item) => (
              <div key={item.q} className="el-card">
                <h3 className="font-semibold text-el-heading mb-2">{item.q}</h3>
                <p className="text-sm text-el-body">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final sticky CTA ─────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-40 no-print">
        <Link
          href="https://enlightlab.com/contact"
          className="btn-el-primary shadow-el-blue flex items-center gap-2 text-sm"
        >
          Book a Discovery Call
          <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  )
}

const FAQ = [
  {
    q: 'What can I paste into the tool?',
    a: 'Anything that describes your technology choices — a bullet list of tools, a paragraph about your architecture, a job description listing required technologies, or a combination of all three.',
  },
  {
    q: 'Is my stack data stored?',
    a: 'Yes, your input and the generated report are stored so we can generate a shareable link. We do not share your data with third parties.',
  },
  {
    q: 'How accurate is the AI analysis?',
    a: 'The audit is powered by Gemini and prompt-engineered by Enlight Lab\'s senior architects. It is highly accurate for technology identification and risk pattern recognition, though it cannot replace a full manual architecture review.',
  },
  {
    q: 'Is this tool really free?',
    a: 'Yes, completely free. No credit card, no account required. It is a top-of-funnel tool Enlight Lab offers to demonstrate technical judgment before any engagement.',
  },
  {
    q: 'What happens after I get my report?',
    a: 'You can share the report link with your team, download it as a PDF, or book a discovery call with Enlight Lab to discuss the findings in depth.',
  },
]