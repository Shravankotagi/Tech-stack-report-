'use client'

interface StackInputFormProps {
  value: string
  onChange: (val: string) => void
  disabled?: boolean
}

export default function StackInputForm({ value, onChange, disabled }: StackInputFormProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder={`Paste your tech stack here. Examples:

Frontend: Next.js 14 + Tailwind CSS
Backend: FastAPI (Python)
Database: PostgreSQL on RDS
Hosting: AWS ECS + Fargate
CI/CD: GitHub Actions
Monitoring: None
Auth: JWT tokens

Or paste a job description, architecture doc, or any free-form description of your stack.`}
      className={`w-full h-64 px-4 py-3 rounded-lg border text-sm font-mono text-el-heading
        placeholder:text-el-muted placeholder:font-sans resize-none
        focus:outline-none focus:ring-2 focus:ring-el-blue focus:border-transparent
        transition-all duration-200
        ${disabled
          ? 'bg-gray-50 border-el-border cursor-not-allowed opacity-70'
          : 'bg-white border-el-border hover:border-el-blue/40'
        }`}
      maxLength={5000}
      spellCheck={false}
    />
  )
}