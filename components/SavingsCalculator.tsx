'use client'

import { useState } from 'react'

const ROLE_DEFAULTS: Record<string, { salary: number; label: string }> = {
  cto: { salary: 150000, label: 'CTO' },
  cfo: { salary: 140000, label: 'CFO' },
  cmo: { salary: 130000, label: 'CMO' },
  coo: { salary: 135000, label: 'COO' },
  ciso: { salary: 145000, label: 'CISO' },
  chro: { salary: 125000, label: 'CHRO' },
  cpo: { salary: 140000, label: 'CPO' },
}

export function SavingsCalculator() {
  const [role, setRole] = useState('cto')
  const [fullTimeSalary, setFullTimeSalary] = useState(150000)
  const [hoursNeeded, setHoursNeeded] = useState(16) // 2 days per week

  // Calculate costs
  const fullTimeTotalCost = fullTimeSalary * 1.35 // Include NI, benefits, overhead
  const hourlyRate = 150 // Average part-time executive hourly rate
  const weeksPerYear = 48
  const fractionalAnnualCost = hoursNeeded * hourlyRate * weeksPerYear
  const savings = fullTimeTotalCost - fractionalAnnualCost
  const savingsPercent = Math.round((savings / fullTimeTotalCost) * 100)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const handleRoleChange = (newRole: string) => {
    setRole(newRole)
    setFullTimeSalary(ROLE_DEFAULTS[newRole].salary)
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 rounded-3xl shadow-2xl p-8 md:p-10 text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          How Much Will You Save?
        </h2>
        <p className="text-purple-200 text-lg">
          Calculate your savings by hiring a part-time executive vs full-time
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-3">
              Select Executive Role
            </label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(ROLE_DEFAULTS).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => handleRoleChange(key)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    role === key
                      ? 'bg-white text-purple-900 shadow-lg'
                      : 'bg-purple-700/50 text-purple-200 hover:bg-purple-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Full-Time Salary */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Full-Time {ROLE_DEFAULTS[role].label} Salary (Base)
            </label>
            <div className="text-3xl font-bold mb-3">
              {formatCurrency(fullTimeSalary)}
            </div>
            <input
              type="range"
              min="80000"
              max="250000"
              step="5000"
              value={fullTimeSalary}
              onChange={(e) => setFullTimeSalary(Number(e.target.value))}
              className="w-full h-3 bg-purple-700 rounded-lg appearance-none cursor-pointer accent-white"
            />
            <div className="flex justify-between text-xs text-purple-300 mt-1">
              <span>£80k</span>
              <span>£250k</span>
            </div>
          </div>

          {/* Hours Needed */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Hours Per Week You Actually Need
            </label>
            <div className="text-3xl font-bold mb-3">
              {hoursNeeded} hours <span className="text-lg font-normal text-purple-300">({(hoursNeeded / 8).toFixed(1)} days)</span>
            </div>
            <input
              type="range"
              min="4"
              max="40"
              step="4"
              value={hoursNeeded}
              onChange={(e) => setHoursNeeded(Number(e.target.value))}
              className="w-full h-3 bg-purple-700 rounded-lg appearance-none cursor-pointer accent-white"
            />
            <div className="flex justify-between text-xs text-purple-300 mt-1">
              <span>4 hrs (0.5 days)</span>
              <span>40 hrs (5 days)</span>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-semibold text-center mb-6">Annual Cost Comparison</h3>

          {/* Full-Time Cost */}
          <div className="bg-red-500/20 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-purple-200">Full-Time {ROLE_DEFAULTS[role].label}</div>
                <div className="text-xs text-purple-300">(Salary + NI + Benefits + Overhead)</div>
              </div>
              <div className="text-2xl font-bold text-red-300">
                {formatCurrency(fullTimeTotalCost)}
              </div>
            </div>
          </div>

          {/* Part-Time Cost */}
          <div className="bg-green-500/20 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-purple-200">Part-Time {ROLE_DEFAULTS[role].label}</div>
                <div className="text-xs text-purple-300">({hoursNeeded} hrs/week × 48 weeks)</div>
              </div>
              <div className="text-2xl font-bold text-green-300">
                {formatCurrency(fractionalAnnualCost)}
              </div>
            </div>
          </div>

          {/* Savings */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-5 text-center mt-6">
            <div className="text-sm font-medium text-green-100 mb-1">Your Annual Savings</div>
            <div className="text-4xl font-bold text-white mb-1">
              {formatCurrency(savings)}
            </div>
            <div className="text-lg font-semibold text-green-100">
              That's {savingsPercent}% less than full-time
            </div>
          </div>

          <p className="text-xs text-purple-300 text-center mt-4">
            Based on £150/hr average part-time rate. Full-time includes 35% for employer NI, pension, benefits and overhead.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="#contact"
          className="inline-flex items-center px-8 py-4 bg-white text-purple-900 font-bold rounded-xl hover:bg-purple-100 transition-all shadow-lg hover:shadow-xl"
        >
          Find Your Part-Time Executive
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* Beta Disclaimer */}
      <div className="mt-6 p-4 bg-purple-950/50 rounded-xl border border-purple-700/50">
        <p className="text-xs text-purple-300 text-center">
          <span className="inline-block bg-purple-700 text-purple-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mr-2">Beta</span>
          This calculator provides rough estimates for illustration only. Actual costs vary based on location, experience, benefits, and market conditions.
          Consult with a qualified accountant for accurate financial planning.
        </p>
      </div>
    </div>
  )
}
