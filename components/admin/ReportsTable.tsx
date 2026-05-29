// components/admin/ReportsTable.tsx

'use client';

import { useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
} from 'lucide-react';

interface AdminAudit {
  id: string;
  score: number;
  maturity: string;
  technologies: string[];
  risks: unknown[];
  createdAt: string;
}

interface ReportsTableProps {
  audits: AdminAudit[];
}

type SortKey =
  | 'id'
  | 'score'
  | 'maturity'
  | 'technologies'
  | 'risks'
  | 'createdAt';

export default function ReportsTable({
  audits,
}: ReportsTableProps) {
  const [sortKey, setSortKey] =
    useState<SortKey>('createdAt');

  const [sortDirection, setSortDirection] = useState<
    'asc' | 'desc'
  >('desc');

  const sortedAudits = useMemo(() => {
    return [...audits].sort((a, b) => {
      let valueA: string | number = '';
      let valueB: string | number = '';

      switch (sortKey) {
        case 'technologies':
          valueA = a.technologies.length;
          valueB = b.technologies.length;
          break;

        case 'risks':
          valueA = a.risks.length;
          valueB = b.risks.length;
          break;

        case 'createdAt':
          valueA = new Date(a.createdAt).getTime();
          valueB = new Date(b.createdAt).getTime();
          break;

        default:
          valueA = a[sortKey];
          valueB = b[sortKey];
      }

      if (sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      }

      return valueA < valueB ? 1 : -1;
    });
  }, [audits, sortDirection, sortKey]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) =>
        prev === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) {
      return (
        <ChevronsUpDown className="h-4 w-4 text-slate-400" />
      );
    }

    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4 text-el-blue" />
    ) : (
      <ChevronDown className="h-4 w-4 text-el-blue" />
    );
  };

  return (
    <div className="overflow-hidden rounded-lg border border-el-border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-el-border bg-slate-50">
            <tr>
              {[
                ['id', 'ID'],
                ['score', 'Score'],
                ['maturity', 'Maturity'],
                ['technologies', 'Technologies'],
                ['risks', 'Risks'],
                ['createdAt', 'Date'],
              ].map(([key, label]) => (
                <th
                  key={key}
                  className="px-6 py-4 text-left"
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleSort(key as SortKey)
                    }
                    className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600"
                  >
                    {label}
                    {renderSortIcon(key as SortKey)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortedAudits.map((audit) => (
              <tr
                key={audit.id}
                className="border-b border-el-border transition hover:bg-slate-50"
              >
                <td className="px-6 py-4 text-sm font-medium text-el-navy">
                  {audit.id}
                </td>

                <td className="px-6 py-4 text-sm text-el-body">
                  {audit.score}
                </td>

                <td className="px-6 py-4 text-sm text-el-body">
                  {audit.maturity}
                </td>

                <td className="px-6 py-4 text-sm text-el-body">
                  {audit.technologies.length}
                </td>

                <td className="px-6 py-4 text-sm text-el-body">
                  {audit.risks.length}
                </td>

                <td className="px-6 py-4 text-sm text-el-body">
                  {new Date(audit.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}