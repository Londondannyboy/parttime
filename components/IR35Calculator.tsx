'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

// UK Tax rates for 2024/25
const TAX_CONFIG = {
  // Income Tax bands
  personalAllowance: 12570,
  basicRate: 0.20,
  basicRateLimit: 50270,
  higherRate: 0.40,
  higherRateLimit: 125140,
  additionalRate: 0.45,

  // National Insurance (Employee)
  niPrimaryThreshold: 12570,
  niUpperEarningsLimit: 50270,
  niEmployeeRate: 0.08, // 8% (reduced from 12% in 2024)
  niEmployeeUpperRate: 0.02,

  // National Insurance (Employer)
  niSecondaryThreshold: 9100,
  niEmployerRate: 0.138, // 13.8%

  // Dividend Tax (2024/25)
  dividendAllowance: 500, // Reduced from £1000
  dividendBasicRate: 0.0875, // 8.75%
  dividendHigherRate: 0.3375, // 33.75%
  dividendAdditionalRate: 0.3935, // 39.35%

  // Corporation Tax
  corpTaxSmall: 0.19, // Up to £50k profit
  corpTaxMain: 0.25, // Over £250k profit
  corpTaxMarginal: 0.265, // Between £50k-£250k

  // Other
  apprenticeshipLevy: 0.005, // 0.5% above £3m payroll (ignored for individuals)
  workingWeeks: 48,
}

interface IR35CalculatorProps {
  defaultDayRate?: number
  className?: string
}

export function IR35Calculator({ defaultDayRate = 800, className = '' }: IR35CalculatorProps) {
  const [dayRate, setDayRate] = useState(defaultDayRate)
  const [daysPerWeek, setDaysPerWeek] = useState(4)
  const [weeksPerYear, setWeeksPerYear] = useState(TAX_CONFIG.workingWeeks)

  // Gross annual income
  const grossAnnual = dayRate * daysPerWeek * weeksPerYear

  // Calculate INSIDE IR35 (Umbrella/PAYE)
  const insideIR35 = useMemo(() => {
    // Umbrella typically takes ~£25/week margin
    const umbrellaMargin = 25 * weeksPerYear
    // Employer's NI is deducted from your gross
    const employerNI = Math.max(0, (grossAnnual - umbrellaMargin - TAX_CONFIG.niSecondaryThreshold * 12) * TAX_CONFIG.niEmployerRate)
    // 5% expenses allowance for IR35
    const expensesAllowance = grossAnnual * 0.05

    const taxableGross = grossAnnual - umbrellaMargin - employerNI - expensesAllowance

    // Income Tax
    let incomeTax = 0
    if (taxableGross > TAX_CONFIG.personalAllowance) {
      const taxableAfterPA = taxableGross - TAX_CONFIG.personalAllowance

      if (taxableAfterPA <= TAX_CONFIG.basicRateLimit - TAX_CONFIG.personalAllowance) {
        incomeTax = taxableAfterPA * TAX_CONFIG.basicRate
      } else if (taxableAfterPA <= TAX_CONFIG.higherRateLimit - TAX_CONFIG.personalAllowance) {
        const basicPortion = TAX_CONFIG.basicRateLimit - TAX_CONFIG.personalAllowance
        const higherPortion = taxableAfterPA - basicPortion
        incomeTax = basicPortion * TAX_CONFIG.basicRate + higherPortion * TAX_CONFIG.higherRate
      } else {
        const basicPortion = TAX_CONFIG.basicRateLimit - TAX_CONFIG.personalAllowance
        const higherPortion = TAX_CONFIG.higherRateLimit - TAX_CONFIG.basicRateLimit
        const additionalPortion = taxableAfterPA - basicPortion - higherPortion
        incomeTax = basicPortion * TAX_CONFIG.basicRate + higherPortion * TAX_CONFIG.higherRate + additionalPortion * TAX_CONFIG.additionalRate
      }
    }

    // Employee NI
    let employeeNI = 0
    if (taxableGross > TAX_CONFIG.niPrimaryThreshold) {
      if (taxableGross <= TAX_CONFIG.niUpperEarningsLimit) {
        employeeNI = (taxableGross - TAX_CONFIG.niPrimaryThreshold) * TAX_CONFIG.niEmployeeRate
      } else {
        employeeNI =
          (TAX_CONFIG.niUpperEarningsLimit - TAX_CONFIG.niPrimaryThreshold) * TAX_CONFIG.niEmployeeRate +
          (taxableGross - TAX_CONFIG.niUpperEarningsLimit) * TAX_CONFIG.niEmployeeUpperRate
      }
    }

    const totalDeductions = incomeTax + employeeNI + umbrellaMargin + employerNI
    const takeHome = grossAnnual - totalDeductions - expensesAllowance + expensesAllowance // Expenses reduce taxable but you keep them

    return {
      grossAnnual,
      umbrellaMargin,
      employerNI,
      expensesAllowance,
      taxableGross,
      incomeTax,
      employeeNI,
      totalTax: incomeTax + employeeNI + employerNI,
      takeHome: grossAnnual - incomeTax - employeeNI - umbrellaMargin - employerNI,
      effectiveRate: ((incomeTax + employeeNI + employerNI + umbrellaMargin) / grossAnnual) * 100,
    }
  }, [grossAnnual, weeksPerYear])

  // Calculate OUTSIDE IR35 (Limited Company)
  const outsideIR35 = useMemo(() => {
    // Optimal strategy: Take salary at NI threshold, rest as dividends
    const optimalSalary = TAX_CONFIG.personalAllowance
    const companyRevenue = grossAnnual

    // Minimal employer's NI on low salary (usually zero at this level)
    const employerNI = 0

    // Company expenses (accountant, insurance, pension contrib, etc.)
    const companyExpenses = 3000 // Estimated annual company costs

    // Corporation Tax
    const companyProfit = companyRevenue - optimalSalary - companyExpenses
    let corpTax = 0
    if (companyProfit <= 50000) {
      corpTax = companyProfit * TAX_CONFIG.corpTaxSmall
    } else if (companyProfit <= 250000) {
      corpTax = companyProfit * TAX_CONFIG.corpTaxMarginal
    } else {
      corpTax = companyProfit * TAX_CONFIG.corpTaxMain
    }

    // Available for dividends
    const availableForDividends = companyProfit - corpTax

    // Dividend tax calculation
    let dividendTax = 0
    const taxableDividends = Math.max(0, availableForDividends - TAX_CONFIG.dividendAllowance)

    // Need to add salary to dividends to determine tax band
    const totalIncome = optimalSalary + availableForDividends

    if (taxableDividends > 0) {
      // Determine which band dividends fall into based on total income
      const incomeAfterPA = totalIncome - TAX_CONFIG.personalAllowance
      const basicBandRemaining = Math.max(0, TAX_CONFIG.basicRateLimit - TAX_CONFIG.personalAllowance - optimalSalary)

      if (taxableDividends <= basicBandRemaining) {
        dividendTax = taxableDividends * TAX_CONFIG.dividendBasicRate
      } else if (incomeAfterPA <= TAX_CONFIG.higherRateLimit - TAX_CONFIG.personalAllowance) {
        const basicPortion = basicBandRemaining
        const higherPortion = taxableDividends - basicBandRemaining
        dividendTax = basicPortion * TAX_CONFIG.dividendBasicRate + higherPortion * TAX_CONFIG.dividendHigherRate
      } else {
        const basicPortion = basicBandRemaining
        const higherPortion = TAX_CONFIG.higherRateLimit - TAX_CONFIG.basicRateLimit
        const additionalPortion = taxableDividends - basicPortion - higherPortion
        dividendTax =
          basicPortion * TAX_CONFIG.dividendBasicRate +
          higherPortion * TAX_CONFIG.dividendHigherRate +
          additionalPortion * TAX_CONFIG.dividendAdditionalRate
      }
    }

    // Income tax on salary (usually zero if at personal allowance)
    const salaryIncomeTax = Math.max(0, (optimalSalary - TAX_CONFIG.personalAllowance) * TAX_CONFIG.basicRate)

    // Employee NI on salary (usually zero)
    const salaryNI = Math.max(0, (optimalSalary - TAX_CONFIG.niPrimaryThreshold) * TAX_CONFIG.niEmployeeRate)

    const totalTax = corpTax + dividendTax + salaryIncomeTax + salaryNI
    const takeHome = companyRevenue - totalTax - companyExpenses

    return {
      grossAnnual: companyRevenue,
      salary: optimalSalary,
      companyExpenses,
      companyProfit,
      corpTax,
      availableForDividends,
      dividendTax,
      salaryIncomeTax,
      salaryNI,
      totalTax,
      takeHome,
      effectiveRate: ((totalTax + companyExpenses) / companyRevenue) * 100,
    }
  }, [grossAnnual])

  // Difference
  const difference = outsideIR35.takeHome - insideIR35.takeHome
  const percentageSaved = ((difference / insideIR35.takeHome) * 100).toFixed(1)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className={`bg-white border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-black text-white p-6">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 block mb-2">UK Tax Calculator</span>
        <h2 className="text-2xl font-black">IR35 Take-Home Pay Calculator</h2>
        <p className="text-gray-400 mt-2">See how IR35 status affects your earnings as a fractional executive</p>
      </div>

      {/* Inputs */}
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Day Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Day Rate</label>
            <div className="text-2xl font-black text-gray-900 mb-2">{formatCurrency(dayRate)}</div>
            <input
              type="range"
              min="400"
              max="2000"
              step="50"
              value={dayRate}
              onChange={(e) => setDayRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>£400</span>
              <span>£2,000</span>
            </div>
          </div>

          {/* Days Per Week */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Days Per Week</label>
            <div className="text-2xl font-black text-gray-900 mb-2">{daysPerWeek} days</div>
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 day</span>
              <span>5 days</span>
            </div>
          </div>

          {/* Weeks Per Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weeks Per Year</label>
            <div className="text-2xl font-black text-gray-900 mb-2">{weeksPerYear} weeks</div>
            <input
              type="range"
              min="40"
              max="52"
              step="1"
              value={weeksPerYear}
              onChange={(e) => setWeeksPerYear(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>40 weeks</span>
              <span>52 weeks</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Gross Annual: </span>
          <span className="text-lg font-bold text-gray-900">{formatCurrency(grossAnnual)}</span>
        </div>
      </div>

      {/* Results Comparison */}
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {/* Inside IR35 */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <h3 className="text-lg font-bold text-gray-900">Inside IR35</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Umbrella company or deemed employment - taxed like an employee</p>

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Gross Revenue</dt>
              <dd className="font-medium">{formatCurrency(insideIR35.grossAnnual)}</dd>
            </div>
            <div className="flex justify-between text-red-600">
              <dt>Employer's NI</dt>
              <dd>-{formatCurrency(insideIR35.employerNI)}</dd>
            </div>
            <div className="flex justify-between text-red-600">
              <dt>Income Tax</dt>
              <dd>-{formatCurrency(insideIR35.incomeTax)}</dd>
            </div>
            <div className="flex justify-between text-red-600">
              <dt>Employee NI</dt>
              <dd>-{formatCurrency(insideIR35.employeeNI)}</dd>
            </div>
            <div className="flex justify-between text-red-600">
              <dt>Umbrella Margin</dt>
              <dd>-{formatCurrency(insideIR35.umbrellaMargin)}</dd>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <dt className="text-gray-500">5% Expenses</dt>
              <dd className="text-green-600">+{formatCurrency(insideIR35.expensesAllowance)}</dd>
            </div>
          </dl>

          <div className="mt-4 p-4 bg-red-50 border border-red-200">
            <div className="text-sm text-red-700">Take-Home Pay</div>
            <div className="text-3xl font-black text-red-700">{formatCurrency(insideIR35.takeHome)}</div>
            <div className="text-sm text-red-600">{insideIR35.effectiveRate.toFixed(1)}% effective tax rate</div>
          </div>
        </div>

        {/* Outside IR35 */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 bg-emerald-500 rounded-full" />
            <h3 className="text-lg font-bold text-gray-900">Outside IR35</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Limited company - optimal salary + dividends structure</p>

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Company Revenue</dt>
              <dd className="font-medium">{formatCurrency(outsideIR35.grossAnnual)}</dd>
            </div>
            <div className="flex justify-between text-gray-500">
              <dt>Salary Taken</dt>
              <dd>{formatCurrency(outsideIR35.salary)}</dd>
            </div>
            <div className="flex justify-between text-red-600">
              <dt>Company Expenses</dt>
              <dd>-{formatCurrency(outsideIR35.companyExpenses)}</dd>
            </div>
            <div className="flex justify-between text-red-600">
              <dt>Corporation Tax</dt>
              <dd>-{formatCurrency(outsideIR35.corpTax)}</dd>
            </div>
            <div className="flex justify-between text-red-600">
              <dt>Dividend Tax</dt>
              <dd>-{formatCurrency(outsideIR35.dividendTax)}</dd>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <dt className="text-gray-500">Dividends Available</dt>
              <dd className="text-emerald-600">{formatCurrency(outsideIR35.availableForDividends)}</dd>
            </div>
          </dl>

          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200">
            <div className="text-sm text-emerald-700">Take-Home Pay</div>
            <div className="text-3xl font-black text-emerald-700">{formatCurrency(outsideIR35.takeHome)}</div>
            <div className="text-sm text-emerald-600">{outsideIR35.effectiveRate.toFixed(1)}% effective tax rate</div>
          </div>
        </div>
      </div>

      {/* Savings Summary */}
      <div className="p-6 bg-amber-500 text-black">
        <div className="text-center">
          <div className="text-sm font-bold uppercase tracking-wider mb-1">Being Outside IR35 Saves You</div>
          <div className="text-4xl font-black">{formatCurrency(difference)}</div>
          <div className="text-lg font-bold">per year ({percentageSaved}% more take-home)</div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-amber-50 border-t-4 border-amber-400">
        <div className="flex items-start gap-3">
          <span className="inline-block bg-amber-500 text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5">Beta</span>
          <div className="text-xs text-gray-700">
            <p className="mb-2">
              <strong>Important:</strong> This calculator provides rough estimates for illustration only. IR35 status is determined by the nature of your working arrangement, not by choice.
              <strong> Always consult with a qualified tax accountant or IR35 specialist</strong> before making financial decisions.
            </p>
            <p className="text-gray-600">
              Tax rates based on 2024/25 UK tax year. Outside IR35 assumes optimal limited company structure.
              For official guidance, see{' '}
              <Link href="https://www.gov.uk/guidance/understanding-off-payroll-working-ir35" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline font-medium">
                gov.uk/IR35
              </Link>
              {' '}or use HMRC's{' '}
              <Link href="https://www.gov.uk/guidance/check-employment-status-for-tax" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline font-medium">
                CEST tool
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
