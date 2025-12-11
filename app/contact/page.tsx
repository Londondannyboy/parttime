import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Contact Us | Fractional.Quest',
  description: 'Get in touch with Fractional.Quest. Whether you\'re a job seeker or hiring company.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 to-purple-100 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Have questions or ready to connect? Choose your path below.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Job Seekers */}
            <Link href="/contact/candidates">
              <div className="border-2 border-purple-200 rounded-lg p-8 hover:border-purple-700 hover:shadow-lg transition cursor-pointer h-full">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Seekers</h2>
                <p className="text-gray-600 mb-6">
                  Are you a fractional executive or specialist looking for your next opportunity? Tell us about yourself and what you're looking for.
                </p>
                <div className="text-purple-700 font-semibold">Get Started →</div>
              </div>
            </Link>

            {/* Companies / Hiring */}
            <Link href="/contact/companies">
              <div className="border-2 border-purple-200 rounded-lg p-8 hover:border-purple-700 hover:shadow-lg transition cursor-pointer h-full">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏢</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Companies</h2>
                <p className="text-gray-600 mb-6">
                  Looking to hire fractional executives or specialist talent? Let us know about your open roles and requirements.
                </p>
                <div className="text-purple-700 font-semibold">Post a Job →</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ or additional info */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Questions?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">What is a Fractional Executive?</h3>
              <p className="text-gray-600">
                A fractional executive is a senior-level professional who works part-time or on a project basis, typically 1-3 days per week, providing specialized expertise without the cost of a full-time hire.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">How does it work?</h3>
              <p className="text-gray-600">
                Browse our network of vetted professionals, connect directly, and start collaborating. Flexible arrangements work around both parties' schedules.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
