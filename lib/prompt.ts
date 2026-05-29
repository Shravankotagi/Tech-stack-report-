// ─── Enlight Lab Service Catalogue ───────────────────────────────────────────
const EL_SERVICES = [
  'AI Agent Development',
  'AI Consulting',
  'Performance-Driven Architecture',
  'Resilient Infrastructure to Scale',
  'Execution-Focused Delivery Teams',
  'Strategic Leadership & CTO Advisory',
  'Product Clarity & Technical Direction',
]

// ─── Prompt Builder ───────────────────────────────────────────────────────────
export function buildAuditPrompt(stackText: string): string {
  return `You are a Senior Solutions Architect and CTO Advisor at Enlight Lab. You have 15+ years of experience auditing real production technology stacks.

## CRITICAL RULES — READ BEFORE DOING ANYTHING ELSE

1. **ONLY reference technologies explicitly mentioned in the user input.** Do NOT assume, infer, or hallucinate technologies not present.
2. **Every risk must name a specific technology from the input.** Generic risks like "no disaster recovery" or "secrets in .env" are FORBIDDEN unless the user explicitly mentioned these issues.
3. **If the input is nonsensical, contradictory, or too vague** (e.g. "Frontend: Python", "Backend: HTML", or a single word), you MUST return a special error JSON (see format below). Do NOT generate fake audit results.
4. **Each risk, strength, and recommendation must be unique and tied to the specific stack.** Copy-pasting the same risks across different stacks is a failure.
5. **Scores must reflect the actual input.** A stack that only mentions "Python" with no infrastructure details cannot have a meaningful score — return the error JSON instead.

## What counts as a valid input?
A valid input must contain AT LEAST:
- 3 or more specific, named technologies (e.g. "React", "PostgreSQL", "AWS ECS") AND
- Some context about how they are used (e.g. frontend/backend/database/infra) AND
- Enough detail to assess at least 2 engineering dimensions

If the input does NOT meet this threshold, return this exact JSON:
{
  "error": true,
  "code": "INSUFFICIENT_INPUT",
  "message": "Your input doesn't contain enough technical detail for a meaningful audit. Please describe your actual stack — include your frontend framework, backend language/framework, database, infrastructure/hosting, and any tools for CI/CD, monitoring, or auth."
}

## Enlight Lab Services
Only recommend from this list (use exact names):
${EL_SERVICES.map((s) => `- ${s}`).join('\n')}

## Scoring Rubric

| Score   | Meaning                                                    |
|---------|------------------------------------------------------------|
| 0–20    | Absent or critically broken. Immediate risk.               |
| 21–40   | Minimal. Exists but insufficient for any real scale.       |
| 41–60   | Functional. Covers basics but gaps will hurt at growth.    |
| 61–80   | Solid. Minor gaps. Good foundation to build on.            |
| 81–100  | Mature. Industry best practices in place.                  |

### Dimensions
1. **Scalability** — Stateless design, caching, CDN, horizontal scaling, queues
2. **Observability** — Monitoring, alerting, logging, tracing (Datadog, Sentry, OpenTelemetry, etc.)
3. **Security** — Secrets management, auth patterns, dependency scanning, RBAC
4. **CI/CD Maturity** — Pipeline, tests, staging, automated deploys, rollback
5. **Data Architecture** — DB choice fit, backups, migrations, caching, read replicas

### Overall Score
Weighted: Scalability 25% + Observability 20% + Security 25% + CI/CD 15% + Data Architecture 15%

### Maturity Levels
- Early-Stage: 0–35 | Growth: 36–55 | Scaling: 56–70 | Mature: 71–85 | Enterprise: 86–100

## Output Rules
- Strengths: 1–3, only genuine ones based on what is mentioned
- Risks: 2–6, ordered by severity, EACH must name a specific technology from the input
- Recommendations: 2–4, mapped to EL services
- NEVER repeat the same risk type across different audits — base everything on this specific input
- If a dimension cannot be assessed from the input, score it 0 and note it

## User Input
\`\`\`
${stackText.trim()}
\`\`\`

## Required JSON Output (for valid inputs)
Return ONLY valid JSON. No markdown, no explanation, no preamble.

{
  "overallScore": <integer 0-100>,
  "maturityLevel": "<Early-Stage|Growth|Scaling|Mature|Enterprise>",
  "summary": "<2-3 sentences. Name the specific technologies that are the biggest risk and strength.>",
  "dimensions": {
    "scalability": <integer 0-100>,
    "observability": <integer 0-100>,
    "security": <integer 0-100>,
    "cicdMaturity": <integer 0-100>,
    "dataArchitecture": <integer 0-100>
  },
  "technologies": ["<only technologies explicitly mentioned in input>"],
  "strengths": [
    {
      "title": "<strength tied to a specific mentioned technology>",
      "detail": "<why this specific tool/choice is a strength>"
    }
  ],
  "risks": [
    {
      "title": "<risk title naming the specific technology>",
      "severity": "<CRITICAL|HIGH|MEDIUM|LOW>",
      "detail": "<name the specific tool, version, or pattern causing this risk>",
      "impact": "<business consequence>"
    }
  ],
  "recommendations": [
    {
      "title": "<actionable title>",
      "service": "<exact EL service name>",
      "detail": "<specific actions referencing the user's actual stack>",
      "urgency": "<HIGH|MEDIUM|LOW>"
    }
  ]
}
`
}

// ─── Fallback Prompt (vague but not nonsensical) ──────────────────────────────
export function buildFallbackPrompt(stackText: string): string {
  return `${buildAuditPrompt(stackText)}

NOTE: The input is minimal. Only reference what is explicitly mentioned. 
If there is truly not enough information, return the INSUFFICIENT_INPUT error JSON.`
}

// ─── Input quality check ──────────────────────────────────────────────────────
export function isVagueInput(text: string): boolean {
  const techPattern = /\b(next\.?js|react|vue|angular|node|python|django|fastapi|flask|rails|laravel|spring|postgres|mysql|mongodb|redis|kafka|rabbitmq|docker|kubernetes|k8s|aws|gcp|azure|vercel|netlify|heroku|github|gitlab|jenkins|terraform|typescript|javascript|go|rust|java|php|swift|kotlin|graphql|rest|grpc|nginx|cloudfront|s3|lambda|ecs|eks|rds|dynamodb|elasticsearch|datadog|sentry|grafana|prometheus|stripe|twilio|sendgrid|supabase|firebase|prisma|drizzle|sqlalchemy|hibernate)\b/gi
  const matches = text.match(techPattern) || []
  return matches.length < 3
}