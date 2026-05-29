'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Mail, ChevronDown, ChevronUp } from 'lucide-react'

interface EmailCaptureFormProps {
  auditId: string
}

export default function EmailCaptureForm({ auditId }: EmailCaptureFormProps) {
  const [open, setOpen]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [form, setForm]       = useState({ name: '', email: '', company: '' })

  function update(field: string, val: string) {
    setForm((prev) => ({ ...prev, [field]: val }))
  }

  async function handleSubmit() {
    if (!form.name || !form.email) {
      toast.error('Name and email are required.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/email-capture', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ auditId, ...form }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error ?? 'Failed to send.')
        return
      }
      setDone(true)
      toast.success('Report sent! Check your inbox.')
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="el-card text-center py-8">
        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <Mail size={22} className="text-green-500" />
        </div>
        <p className="font-semibold text-el-heading">Report on its way!</p>
        <p className="text-sm text-el-muted mt-1">Check {form.email} for your audit report.</p>
      </div>
    )
  }

  return (
    <div className="el-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-el-blue-light rounded-lg flex items-center justify-center">
            <Mail size={17} className="text-el-blue" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-el-heading text-sm">Send this report to my inbox</p>
            <p className="text-xs text-el-muted">Get a copy delivered to your email — no spam</p>
          </div>
        </div>
        {open
          ? <ChevronUp size={18} className="text-el-muted shrink-0" />
          : <ChevronDown size={18} className="text-el-muted shrink-0" />
        }
      </button>

      {open && (
        <div className="mt-5 pt-5 border-t border-el-border space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-el-body mb-1 block">Name *</label>
              <input
                type="text"
                placeholder="Alex Johnson"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-el-border rounded-md
                           focus:outline-none focus:ring-2 focus:ring-el-blue bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-el-body mb-1 block">Email *</label>
              <input
                type="email"
                placeholder="alex@company.com"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-el-border rounded-md
                           focus:outline-none focus:ring-2 focus:ring-el-blue bg-white"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-el-body mb-1 block">Company (optional)</label>
            <input
              type="text"
              placeholder="Acme Inc."
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-el-border rounded-md
                         focus:outline-none focus:ring-2 focus:ring-el-blue bg-white"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-el-primary w-full text-sm py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Report to My Inbox'}
          </button>
        </div>
      )}
    </div>
  )
}