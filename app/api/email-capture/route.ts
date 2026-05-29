import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'
import { EmailCaptureSchema } from '@/lib/schema'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = EmailCaptureSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input.' },
      { status: 400 }
    )
  }

  const { auditId, name, email, company } = parsed.data

  const audit = await prisma.audit.findUnique({ where: { id: auditId } })
  if (!audit) {
    return NextResponse.json({ error: 'Audit not found.' }, { status: 404 })
  }

  const existing = await prisma.emailCapture.findFirst({
    where: { auditId, email },
  })
  if (existing) {
    return NextResponse.json({ success: true, message: 'Already captured.' })
  }

  try {
    await prisma.emailCapture.create({
      data: { auditId, name, email, company },
    })

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: `Your Tech Stack Audit Report — Enlight Lab`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px;">
          <div style="background: #0d1b4b; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 20px;">{-} Enlight Lab</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">Tech Stack Audit Report</p>
          </div>

          <h2 style="color: #0f172a; font-size: 22px;">Hi ${name}, your audit report is ready.</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Your tech stack scored <strong>${audit.overallScore}/100</strong> — 
            <strong>${audit.maturityLevel}</strong> maturity level.
          </p>
          <p style="color: #4b5563; line-height: 1.6;">${audit.summary}</p>

          <a href="${process.env.NEXT_PUBLIC_APP_URL}/audit/${audit.shareId}"
             style="display: inline-block; background: #1a3fdb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 16px 0;">
            View Full Report →
          </a>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">
            Sent by Enlight Lab · 
            <a href="https://enlightlab.com" style="color: #1a3fdb;">enlightlab.com</a>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Email capture error]', err)
    return NextResponse.json({ error: 'Failed to save.' }, { status: 500 })
  }
}