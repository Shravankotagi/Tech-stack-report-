// components/results/StrengthCard.tsx

import { CheckCircle2 } from 'lucide-react';
import type { Strength } from '@/types/audit';

interface StrengthCardProps {
  strength: Strength;
  index: number;
}

export default function StrengthCard({
  strength,
  index,
}: StrengthCardProps) {
  return (
    <div
      className="rounded-lg border border-el-border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
      style={{
        borderLeftWidth: '4px',
        borderLeftColor: '#16a34a',
      }}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
        </div>

        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-green-600">
              Strength #{index + 1}
            </span>
          </div>

          <h3 className="mb-2 text-lg font-semibold text-el-navy">
            {strength.title}
          </h3>

          <p className="text-sm leading-6 text-el-body">
            {strength.detail}
          </p>
        </div>
      </div>
    </div>
  );
}