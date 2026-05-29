'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface ChartData {
  name: string
  count: number
}

interface AdminBarChartProps {
  audits: any[]
}

export default function AdminBarChart({ audits }: AdminBarChartProps) {
  const data: ChartData[] = audits.reduce((acc: ChartData[], audit: any) => {
    const risks = audit.risks as any[] ?? []
    risks.forEach((risk: any) => {
      const existing = acc.find((d) => d.name === risk.severity)
      if (existing) {
        existing.count++
      } else {
        acc.push({ name: risk.severity, count: 1 })
      }
    })
    return acc
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: '#4b5563' }}
          angle={-45}
          textAnchor="end"
          interval={0}
        />
        <YAxis tick={{ fontSize: 11, fill: '#4b5563' }} />
        <Tooltip
          contentStyle={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Bar dataKey="count" fill="#1a3fdb" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}