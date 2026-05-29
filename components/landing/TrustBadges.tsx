// components/landing/TrustBadges.tsx

import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'This instantly highlighted the architectural debt we were ignoring for months.',
    name: 'Daniel Foster',
    title: 'CTO, ScaleForge',
  },
  {
    quote:
      'The recommendations were surprisingly actionable and aligned with our hiring roadmap.',
    name: 'Priya Mehta',
    title: 'VP Engineering, CartPilot',
  },
  {
    quote:
      'An excellent technical due diligence tool before scaling engineering teams.',
    name: 'Marcus Lee',
    title: 'Founder & CTO, VertexCloud',
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-el-blue">
            Trusted
          </p>

          <h2 className="text-4xl font-bold text-el-navy">
            Trusted by Engineering Leaders
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-lg border border-el-border bg-white p-8 shadow-sm"
            >
              <Quote className="mb-5 h-10 w-10 text-el-blue" />

              <p className="mb-6 text-sm leading-7 text-el-body">
                "{testimonial.quote}"
              </p>

              <div>
                <h4 className="font-semibold text-el-navy">
                  {testimonial.name}
                </h4>

                <p className="text-sm text-slate-500">
                  {testimonial.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}