// components/layout/Footer.tsx

import Link from 'next/link';

const footerLinks = [
  {
    label: 'About',
    href: 'https://enlightlab.com/about',
  },
  {
    label: 'Services',
    href: 'https://enlightlab.com/services',
  },
  {
    label: 'Case Studies',
    href: 'https://enlightlab.com/case-studies',
  },
  {
    label: 'Blogs',
    href: 'https://enlightlab.com/blog',
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0d1b4b]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link
              href="https://enlightlab.com"
              className="inline-block"
            >
              <img
                src="https://enlightlab.com/wp-content/uploads/2023/03/Layer_1.png"
                alt="Enlight Lab"
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              AI-powered technical due diligence and engineering
              intelligence for modern software teams.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Enlight Lab. All rights
            reserved.
          </p>

          <Link
            href="https://enlightlab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-300 transition hover:text-white"
          >
            Back to enlightlab.com →
          </Link>
        </div>
      </div>
    </footer>
  );
}