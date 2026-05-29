'use client'

import {
  RadarChart as RechartsRadar,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { Dimension } from '@/types/audit'

interface RadarChartProps {
  dimensions: Dimension[]
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-el-border rounded-lg px-3 py-2 shadow-el-hover text-sm">
      <p className="font-semibold text-el-heading">{label}</p>
      <p className="text-el-blue">{payload[0].value}<span className="text-el-muted">/100</span></p>
    </div>
  )
}

export default function RadarChart({ dimensions }: RadarChartProps) {
  const data = dimensions.map((d) => ({
    subject: d.label,
    score:   d.score,
    fullMark: 100,
  }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RechartsRadar data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 11, fill: '#4b5563', fontFamily: 'Inter' }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fontSize: 10, fill: '#94a3b8' }}
          axisLine={false}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#1a3fdb"
          fill="#1a3fdb"
          fillOpacity={0.15}
          strokeWidth={2}
          dot={{ fill: '#1a3fdb', r: 3 }}
        />
        <Tooltip content={<CustomTooltip />} />
      </RechartsRadar>
    </ResponsiveContainer>
  )
}