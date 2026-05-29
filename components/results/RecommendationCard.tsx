// components/results/RecommendationCard.tsx

import type { Recommendation } from '@/types/audit';

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

export default function RecommendationCard({
  recommendation,
  index,
}: RecommendationCardProps) {
  return (
    <div
      className="rounded-lg border border-el-border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
      style={{
        borderLeftWidth: '4px',
        borderLeftColor: '#1a3fdb',
      }}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wide text-el-blue">
            Recommendation #{index + 1}
          </span>

          <h3 className="text-lg font-semibold text-el-navy">
            {recommendation.title}
          </h3>
        </div>

        <span className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {recommendation.service}
        </span>
      </div>

      <p className="mb-5 text-sm leading-6 text-el-body">
        {recommendation.detail}
      </p>

      <div className="rounded-md bg-slate-50 px-4 py-3">
        <p className="text-sm font-medium text-slate-700">
          Urgency:{' '}
          <span className="font-semibold text-el-navy">
            {recommendation.urgency}
          </span>
        </p>
      </div>
    </div>
  );
}