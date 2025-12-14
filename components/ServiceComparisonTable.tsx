'use client'

interface ComparisonItem {
  feature: string
  partTime: string
  interim: string
  fullTime: string
}

interface ServiceComparisonTableProps {
  role?: string
  className?: string
  accentColor?: string
}

export function ServiceComparisonTable({
  role = 'CFO',
  className = '',
  accentColor = 'emerald'
}: ServiceComparisonTableProps) {
  const comparisons: ComparisonItem[] = [
    {
      feature: 'Commitment',
      partTime: '1-3 days/week',
      interim: 'Full-time (temporary)',
      fullTime: 'Full-time (permanent)',
    },
    {
      feature: 'Duration',
      partTime: 'Ongoing (6+ months typical)',
      interim: '3-12 months',
      fullTime: 'Permanent',
    },
    {
      feature: 'Cost',
      partTime: '£3,000-£6,000/week',
      interim: '£8,000-£12,000/week',
      fullTime: '£150,000-£250,000/year + benefits',
    },
    {
      feature: 'Focus',
      partTime: 'Strategic + operational',
      interim: 'Gap-fill or transformation',
      fullTime: 'All responsibilities',
    },
    {
      feature: 'Flexibility',
      partTime: 'Scale up/down as needed',
      interim: 'Fixed term contract',
      fullTime: 'Limited flexibility',
    },
    {
      feature: 'Best For',
      partTime: 'Growing companies, specific expertise needs',
      interim: 'Leadership gaps, major transitions',
      fullTime: 'Large orgs with full-time need',
    },
  ]

  const colorClasses: Record<string, { header: string; highlight: string; border: string }> = {
    gray: { header: 'bg-gray-900', highlight: 'bg-gray-100', border: 'border-gray-900' },
    emerald: { header: 'bg-gray-800', highlight: 'bg-gray-100', border: 'border-gray-800' },
    amber: { header: 'bg-gray-800', highlight: 'bg-gray-100', border: 'border-gray-800' },
    blue: { header: 'bg-gray-800', highlight: 'bg-gray-100', border: 'border-gray-800' },
    orange: { header: 'bg-gray-800', highlight: 'bg-gray-100', border: 'border-gray-800' },
    purple: { header: 'bg-gray-800', highlight: 'bg-gray-100', border: 'border-gray-800' },
  }

  const colors = colorClasses[accentColor] || colorClasses.gray

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 text-left text-sm font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b border-gray-200">
              Feature
            </th>
            <th className={`p-4 text-left text-sm font-bold uppercase tracking-wider text-white ${colors.header} border-b-4 ${colors.border}`}>
              Part-Time {role}
            </th>
            <th className="p-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700 bg-gray-100 border-b border-gray-200">
              Interim {role}
            </th>
            <th className="p-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700 bg-gray-100 border-b border-gray-200">
              Full-Time {role}
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisons.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="p-4 text-sm font-semibold text-gray-900 border-b border-gray-200">
                {item.feature}
              </td>
              <td className={`p-4 text-sm text-gray-800 ${colors.highlight} border-b ${colors.border} border-l-4`}>
                {item.partTime}
              </td>
              <td className="p-4 text-sm text-gray-600 border-b border-gray-200">
                {item.interim}
              </td>
              <td className="p-4 text-sm text-gray-600 border-b border-gray-200">
                {item.fullTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
