// components/results/ResultsSkeleton.tsx

export default function ResultsSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-[#f8f9fc] px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-el-border bg-white p-8 shadow-sm">
            <div className="mx-auto h-48 w-48 rounded-full bg-slate-200" />

            <div className="mt-6 space-y-3">
              <div className="h-5 w-40 rounded bg-slate-200" />
              <div className="h-4 w-64 rounded bg-slate-200" />
            </div>
          </div>

          <div className="rounded-lg border border-el-border bg-white p-8 shadow-sm">
            <div className="mb-6 h-6 w-48 rounded bg-slate-200" />

            <div className="h-[320px] rounded-lg bg-slate-200" />
          </div>
        </div>

        <div className="space-y-5">
          <div className="h-6 w-44 rounded bg-slate-200" />

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-el-border bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="h-5 w-48 rounded bg-slate-200" />
                <div className="h-7 w-24 rounded-full bg-slate-200" />
              </div>

              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-11/12 rounded bg-slate-200" />
                <div className="h-4 w-8/12 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="h-6 w-52 rounded bg-slate-200" />

          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-el-border bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-200" />

                  <div className="space-y-2">
                    <div className="h-4 w-40 rounded bg-slate-200" />
                    <div className="h-3 w-24 rounded bg-slate-200" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-slate-200" />
                  <div className="h-4 w-10/12 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}