'use client'

import { useEffect, useState } from 'react'

interface ScoreRingProps {
  score: number  // 0–100
  size?: number
  strokeWidth?: number
}

function getScoreColor(score: number): string {
  if (score >= 75) return '#16a34a'  // green
  if (score >= 50) return '#1a3fdb'  // el-blue
  if (score >= 30) return '#ea580c'  // orange
  return '#dc2626'                    // red
}

export default function ScoreRing({
  score,
  size = 160,
  strokeWidth = 12,
}: ScoreRingProps) {
  const [animated, setAnimated] = useState(false)

  const radius        = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset        = circumference - (animated ? score / 100 : 0) * circumference
  const color         = getScoreColor(score)
  const center        = size / 2

  useEffect(() => {
    // Trigger animation after mount
    const t = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        {/* Animated progress arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>

      {/* Score number in center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-bold tabular-nums"
          style={{ fontSize: size * 0.22, color, lineHeight: 1 }}
        >
          {score}
        </span>
        <span
          className="text-el-muted font-medium"
          style={{ fontSize: size * 0.1 }}
        >
          / 100
        </span>
      </div>
    </div>
  )
}