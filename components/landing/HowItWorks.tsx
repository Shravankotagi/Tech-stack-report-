// components/landing/HowItWorks.tsx

import {
  ClipboardPaste,
  BrainCircuit,
  FileSearch,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Paste Your Stack',
    description:
      'Drop in your tech stack, architecture notes, or even a hiring job description.',
    icon: ClipboardPaste,
  },
  {
    number: '02',
    title: 'AI Analyses in Seconds',
    description:
      'Our AI evaluates scalability, maintainability, hiring risk, and technical maturity instantly.',
    icon: BrainCircuit,
  },
  {
    number: '03',
    title: 'Get Actionable Report',
    description:
      'Receive a detailed audit with strengths, risks, and strategic recommendations.',
    icon: FileSearch,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#f8f9fc] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-el-blue">
            Process
          </p>

          <h2 className="text-4xl font-bold text-el-navy">
            How It Works
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="rounded-lg border border-el-border bg-white p-8 shadow-sm"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-el-blue text-sm font-bold text-white">
                    {step.number}
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                    <Icon className="h-6 w-6 text-el-blue" />
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-semibold text-el-navy">
                  {step.title}
                </h3>

                <p className="text-sm leading-7 text-el-body">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}