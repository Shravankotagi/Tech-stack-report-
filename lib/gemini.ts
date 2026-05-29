import { GoogleGenerativeAI } from '@google/generative-ai'
import { buildAuditPrompt, buildFallbackPrompt, isVagueInput } from './prompt'
import { validateAuditOutput, type AuditOutput } from './schema'

// ─── Client singleton ─────────────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const model = genAI.getGenerativeModel({
  model: 'gemini-3.1-flash-lite',
  generationConfig: {
    responseMimeType: 'application/json',
    temperature: 0.3,
    topP: 0.8,
    maxOutputTokens: 2048,
  },
})

// ─── Main audit function ──────────────────────────────────────────────────────
export async function runAudit(stackText: string): Promise<{
  success: true
  data: AuditOutput
} | {
  success: false
  error: string
  code: 'AI_ERROR' | 'PARSE_ERROR' | 'VALIDATION_ERROR'
}> {
  try {
    // Choose prompt based on input quality
    const prompt = isVagueInput(stackText)
      ? buildFallbackPrompt(stackText)
      : buildAuditPrompt(stackText)

    // Call Gemini
    const result = await model.generateContent(prompt)
    const responseText = result.response.text()

    if (!responseText || responseText.trim() === '') {
      return {
        success: false,
        error: 'Gemini returned an empty response.',
        code: 'AI_ERROR',
      }
    }

    // Parse JSON
    let parsed: unknown
    try {
      const cleaned = responseText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim()
      parsed = JSON.parse(cleaned)
    } catch {
      return {
        success: false,
        error: 'Failed to parse Gemini JSON response.',
        code: 'PARSE_ERROR',
      }
    }

    // ── Check for insufficient input error returned by AI ──────────────────
    if (
      parsed &&
      typeof parsed === 'object' &&
      (parsed as Record<string, unknown>).error === true
    ) {
      const errObj = parsed as { error: true; code: string; message: string }
      return {
        success: false,
        error: errObj.message ?? 'Your input does not contain enough detail for a meaningful audit. Please describe your frontend, backend, database, and infrastructure.',
        code: 'AI_ERROR',
      }
    }

    // ── Validate with Zod ──────────────────────────────────────────────────
    const validation = validateAuditOutput(parsed)
    if (!validation.success) {
      const errMsg = (validation as { success: false; error: string }).error
      return {
        success: false,
        error: `Validation failed: ${errMsg}`,
        code: 'VALIDATION_ERROR' as const,
      }
    }

    return { success: true, data: validation.data }

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown Gemini error'
    return {
      success: false,
      error: message,
      code: 'AI_ERROR',
    }
  }
}