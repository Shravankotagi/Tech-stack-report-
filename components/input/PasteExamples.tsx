// components/input/PasteExamples.tsx

'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
} from 'lucide-react';

interface PasteExamplesProps {
  onSelect: (text: string) => void;
}

const examples = [
  {
    title: 'SaaS Startup Stack',
    content: `Frontend: Next.js 15, TypeScript, Tailwind CSS
Backend: Node.js, Express, PostgreSQL
Infrastructure: AWS ECS, CloudFront, S3
Auth: Clerk
Monitoring: Sentry
CI/CD: GitHub Actions

Team size: 8 engineers
Current issues:
- Slow deployments
- Increasing cloud costs
- No automated testing
- Scaling concerns for enterprise customers`,
  },
  {
    title: 'E-commerce Platform',
    content: `Frontend: React, Redux, SCSS
Backend: Laravel PHP Monolith
Database: MySQL
Payments: Stripe
Hosting: DigitalOcean Droplets

Pain points:
- Checkout failures during traffic spikes
- Difficult onboarding for new engineers
- Legacy codebase slowing feature delivery
- SEO performance issues`,
  },
  {
    title: 'Job Listing Text',
    content: `Senior Full Stack Engineer

Requirements:
- 5+ years React experience
- Node.js and GraphQL
- Kubernetes experience preferred
- AWS infrastructure management
- CI/CD pipeline ownership
- PostgreSQL optimization
- Experience scaling SaaS systems

Nice to have:
- Rust or Go experience
- ML infrastructure exposure`,
  },
];

export default function PasteExamples({
  onSelect,
}: PasteExamplesProps) {
  const [open, setOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(
    null
  );

  const handleSelect = async (
    text: string,
    index: number
  ) => {
    onSelect(text);

    try {
      await navigator.clipboard.writeText(text);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error('Clipboard copy failed');
    }
  };

  return (
    <div className="rounded-lg border border-el-border bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div>
          <h3 className="text-sm font-semibold text-el-navy">
            Need Inspiration?
          </h3>

          <p className="mt-1 text-sm text-el-body">
            View example tech stacks and job descriptions
          </p>
        </div>

        {open ? (
          <ChevronUp className="h-5 w-5 text-slate-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-500" />
        )}
      </button>

      {open && (
        <div className="space-y-5 border-t border-el-border p-5">
          {examples.map((example, index) => (
            <div
              key={example.title}
              className="rounded-lg border border-slate-200 bg-slate-50 p-5"
            >
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h4 className="text-sm font-semibold text-el-navy">
                  {example.title}
                </h4>

                <button
                  type="button"
                  onClick={() =>
                    handleSelect(example.content, index)
                  }
                  className="inline-flex items-center gap-2 rounded-md bg-el-blue px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Use Example
                    </>
                  )}
                </button>
              </div>

              <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-slate-700">
                {example.content}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}