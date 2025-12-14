import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-2xl">P</span>
              </div>
              <div>
                <span className="font-bold text-white text-xl">Part-Time</span>
                <span className="text-gray-400 font-bold text-xl">.Quest</span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              The UK's emerging platform connecting companies with part-time executives.
              Find your next CFO, CTO, CMO, or COO on a flexible basis.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* For Executives */}
              <div>
                <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
                  For Executives
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/part-time-jobs" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Browse Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="/calculators/rate-finder" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Rate Calculator
                    </Link>
                  </li>
                  <li>
                    <Link href="/calculators/portfolio-builder" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Portfolio Planner
                    </Link>
                  </li>
                  <li>
                    <Link href="/guide" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Getting Started Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/handler/sign-up" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Join Beta
                    </Link>
                  </li>
                </ul>
              </div>

              {/* For Companies */}
              <div>
                <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
                  For Companies
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/calculators/company-savings" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Savings Calculator
                    </Link>
                  </li>
                  <li>
                    <Link href="/cfo" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Part-Time CFO
                    </Link>
                  </li>
                  <li>
                    <Link href="/cto" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Part-Time CTO
                    </Link>
                  </li>
                  <li>
                    <Link href="/cmo" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Part-Time CMO
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Locations */}
              <div>
                <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
                  Locations
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/part-time-jobs-london" className="text-gray-400 hover:text-white text-sm transition-colors">
                      London
                    </Link>
                  </li>
                  <li>
                    <Link href="/part-time-jobs-manchester" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Manchester
                    </Link>
                  </li>
                  <li>
                    <Link href="/part-time-jobs-birmingham" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Birmingham
                    </Link>
                  </li>
                  <li>
                    <Link href="/part-time-jobs-edinburgh" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Edinburgh
                    </Link>
                  </li>
                  <li>
                    <Link href="/remote" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Remote Jobs
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
                  Resources
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/articles" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Articles
                    </Link>
                  </li>
                  <li>
                    <Link href="/calculators" className="text-gray-400 hover:text-white text-sm transition-colors">
                      All Calculators
                    </Link>
                  </li>
                  <li>
                    <Link href="/voice" className="text-gray-400 hover:text-white text-sm transition-colors">
                      AI Assistant
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Part-Time Quest. All rights reserved. Built in the UK.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Beta — Launching December 2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
