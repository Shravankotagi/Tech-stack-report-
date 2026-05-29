import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { parseDimensions, SEVERITY_CONFIG, type AuditResult } from '@/types/audit'
import type { Metadata } from 'next'
import ResultsClient from './ResultsClient'

// ── Generate metadata for OG share previews ───────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const audit = await prisma.audit.findUnique({ where: { shareId: id } })
  if (!audit) return { title: 'Audit Not Found' }
  return {
    title: `Tech Stack Audit — Score ${audit.overallScore}/100 | Enlight Lab`,
    description: audit.summary,
    openGraph: {
      title: `Tech Stack Audit — ${audit.maturityLevel} (${audit.overallScore}/100)`,
      description: audit.summary,
    },
  }
}

// ── Server Component: fetch data ──────────────────────────────────────────
export default async function AuditResultPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const audit = await prisma.audit.findUnique({ where: { shareId: id } })
  if (!audit) notFound()

  const result: AuditResult = {
    id:            audit.id,
    shareId:       audit.shareId,
    inputText:     audit.inputText,
    overallScore:  audit.overallScore,
    maturityLevel: audit.maturityLevel,
    summary:       audit.summary,
    dimensions:    parseDimensions({
      scalability:      audit.scalability,
      observability:    audit.observability,
      security:         audit.security,
      cicdMaturity:     audit.cicdMaturity,
      dataArchitecture: audit.dataArch,
    }),
    technologies:    audit.technologies    as string[],
    strengths:       audit.strengths       as unknown as AuditResult['strengths'],
    risks:           audit.risks           as unknown as AuditResult['risks'],
    recommendations: audit.recommendations as unknown as AuditResult['recommendations'],
    createdAt:       audit.createdAt.toISOString(),
  }

  return <ResultsClient result={result} />
}