// components/admin/EmailCaptureTable.tsx

interface EmailCapture {
  id: string;
  name: string;
  email: string;
  company: string;
  auditScore: number;
  createdAt: string;
}

interface EmailCaptureTableProps {
  captures: EmailCapture[];
}

export default function EmailCaptureTable({
  captures,
}: EmailCaptureTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-el-border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-el-border bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Name
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Email
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Company
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Audit Score
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {captures.map((capture) => (
              <tr
                key={capture.id}
                className="border-b border-el-border transition hover:bg-slate-50"
              >
                <td className="px-6 py-4 text-sm font-medium text-el-navy">
                  {capture.name}
                </td>

                <td className="px-6 py-4 text-sm text-el-body">
                  {capture.email}
                </td>

                <td className="px-6 py-4 text-sm text-el-body">
                  {capture.company}
                </td>

                <td className="px-6 py-4 text-sm text-el-body">
                  {capture.auditScore}
                </td>

                <td className="px-6 py-4 text-sm text-el-body">
                  {new Date(
                    capture.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}