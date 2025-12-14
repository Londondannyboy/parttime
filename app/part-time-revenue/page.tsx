import { Metadata } from 'next'
import Link from 'next/link'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { HireProcessStepper } from '@/components/HireProcessStepper'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Revenue Leadership UK | Hire Part-Time Sales Executives',
  description: 'Hire fractional revenue leaders for your business. Part-time CROs, VPs of Sales, and Sales Directors. Expert revenue leadership without full-time cost.',
  keywords: 'fractional revenue, fractional sales director, part-time sales executive, fractional vp sales, hire revenue leader, fractional cro',
  alternates: { canonical: 'https://fractional.quest/fractional-revenue' },
}

export default function FractionalRevenuePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* 3D Knowledge Graph Background */}
        <div className="absolute inset-0">
          <JobsGraph3D categoryFilter="Revenue" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm"><span className="mr-2">←</span> Back to Home</Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-green-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Functional Leadership</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Fractional<br /><span className="text-green-400">Revenue</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Access senior revenue leadership without the full-time commitment. From CROs to VPs of Sales, find the right level of sales expertise for your growth stage.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-green-500 text-white font-bold uppercase tracking-wider hover:bg-green-400 transition-colors">Find Revenue Leadership</Link>
                <Link href="/fractional-cro-services" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Fractional CRO Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Fractional Revenue Leadership</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">Revenue growth requires experienced leadership. Fractional revenue leaders bring proven sales methodologies, GTM expertise, and team-building experience—helping you accelerate growth without the commitment of a full-time hire.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Fractional CRO', description: 'C-level revenue leadership for GTM strategy and growth.', link: '/fractional-cro-services' },
              { title: 'VP of Sales', description: 'Senior sales leadership for team scaling and process.', link: '#contact' },
              { title: 'Sales Director', description: 'Hands-on sales leadership and pipeline management.', link: '#contact' },
            ].map((item, i) => (
              <Link key={i} href={item.link} className="block p-6 bg-gray-50 border border-gray-200 hover:border-green-500 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">What Fractional Revenue Leaders Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'GTM Strategy', description: 'Develop go-to-market strategies for new products, markets, and segments.' },
              { title: 'Sales Process', description: 'Implement sales methodologies, stages, and qualification frameworks.' },
              { title: 'Team Building', description: 'Recruit, train, and develop high-performing sales teams.' },
              { title: 'Pipeline Management', description: 'Build forecasting, pipeline reviews, and deal coaching programmes.' },
              { title: 'Revenue Operations', description: 'Implement CRM, sales tools, and revenue analytics.' },
              { title: 'Partnership Strategy', description: 'Develop channel partnerships and alliance programmes.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border-l-4 border-green-500">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <HireProcessStepper accentColor="green" />
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find Revenue Leadership</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us about your revenue challenges and we'll match you with the right fractional sales executive.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-green-500 text-white font-bold uppercase tracking-wider hover:bg-green-400 transition-colors">Get Started</Link>
            <Link href="/fractional-cro-services" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Learn About Fractional CROs</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
