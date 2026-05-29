'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-el-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo — matches {-} Enlight Lab */}
          <Link href="https://enlightlab.com" className="flex items-center shrink-0">
            <img 
              src="https://enlightlab.com/wp-content/uploads/2023/03/Layer_1.png" 
              alt="Enlight Lab" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="https://enlightlab.com/about"
              className="text-sm text-el-body hover:text-el-blue transition-colors">
              About
            </Link>
            <Link href="https://enlightlab.com/services"
              className="text-sm text-el-body hover:text-el-blue transition-colors">
              Services
            </Link>
            <Link href="https://enlightlab.com/case-studies"
              className="text-sm text-el-body hover:text-el-blue transition-colors">
              Case Studies
            </Link>
            <Link href="https://enlightlab.com/blogs"
              className="text-sm text-el-body hover:text-el-blue transition-colors">
              Blogs
            </Link>
            {/* Tool indicator */}
            <span className="text-xs bg-el-blue-light text-el-blue font-semibold px-3 py-1 rounded-full border border-blue-200">
              Stack Auditor Tool
            </span>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-el-body hover:text-el-blue transition-colors"
            >
              Home
            </Link>
            <Link
              href="https://enlightlab.com/contact"
              className="btn-el-primary text-sm py-2 px-5"
            >
              Get a Proposal
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-el-body hover:text-el-blue"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-el-border px-4 py-4 flex flex-col gap-4">
          <Link href="https://enlightlab.com/about"
            className="text-sm text-el-body hover:text-el-blue"
            onClick={() => setMobileOpen(false)}>
            About
          </Link>
          <Link href="https://enlightlab.com/services"
            className="text-sm text-el-body hover:text-el-blue"
            onClick={() => setMobileOpen(false)}>
            Services
          </Link>
          <Link href="https://enlightlab.com/case-studies"
            className="text-sm text-el-body hover:text-el-blue"
            onClick={() => setMobileOpen(false)}>
            Case Studies
          </Link>
          <Link href="https://enlightlab.com/blogs"
            className="text-sm text-el-body hover:text-el-blue"
            onClick={() => setMobileOpen(false)}>
            Blogs
          </Link>
          <Link
            href="https://enlightlab.com/contact"
            className="btn-el-primary text-sm text-center"
            onClick={() => setMobileOpen(false)}>
            Get a Proposal
          </Link>
        </div>
      )}
    </header>
  )
}