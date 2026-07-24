import React from 'react'
import { CAR_BENEFIT_OPTIONS, LOCATION_OPTIONS } from '../helpers/taxConstants'
import { formatBDT } from '../helpers/format'

function LedgerRow({ label, value, muted, emphasis }) {
  return (
    <div className="flex items-baseline justify-between py-2">
      <span className={emphasis ? 'text-sm font-semibold' : 'text-sm'} style={{ color: muted ? 'var(--slate)' : 'var(--ink)' }}>
        {label}
      </span>
      <span className={`font-mono-num ${emphasis ? 'text-base font-semibold' : 'text-sm'}`} style={{ color: emphasis ? 'var(--teal-dark)' : 'var(--ink)' }}>
        {value}
      </span>
    </div>
  )
}

function bandLabel(row, index, isLast) {
  if (index === 0) return `Up to ${formatBDT(row.bandLimit)}`
  if (isLast) return 'Remaining balance'
  return `Next ${formatBDT(row.bandWidth)}`
}

function SlabTable({ rows }) {
  if (rows.length === 0) {
    return (
      <p className="text-sm py-2" style={{ color: 'var(--slate)' }}>
        Taxable income falls fully within the tax-free threshold.
      </p>
    )
  }
  return (
    <div className="overflow-x-auto">
    <table className="w-full text-sm" style={{ color: 'var(--ink)' }}>
      <thead>
        <tr className="ledger-divider">
          <th className="text-left font-semibold py-2" style={{ color: 'var(--slate)' }}>Slab</th>
          <th className="text-right font-semibold py-2" style={{ color: 'var(--slate)' }}>Rate</th>
          <th className="text-right font-semibold py-2" style={{ color: 'var(--slate)' }}>Tax</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.bandLimit} className="ledger-divider">
            <td className="py-2">{bandLabel(row, index, index === rows.length - 1)}</td>
            <td className="text-right py-2 font-mono-num">{row.rate * 100}%</td>
            <td className="text-right py-2 font-mono-num">{formatBDT(row.tax)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export function CarBenefitReference() {
  return (
    <div className="overflow-x-auto">
    <table className="w-full text-xs mt-2">
      <thead>
        <tr className="ledger-divider">
          <th className="text-left font-semibold py-1.5" style={{ color: 'var(--slate)' }}>Engine capacity</th>
          <th className="text-right font-semibold py-1.5" style={{ color: 'var(--slate)' }}>Deemed monthly salary</th>
        </tr>
      </thead>
      <tbody>
        {CAR_BENEFIT_OPTIONS.map((option) => (
          <tr key={option.label} className="ledger-divider">
            <td className="py-1.5" style={{ color: 'var(--slate)' }}>{option.label}</td>
            <td className="text-right py-1.5 font-mono-num" style={{ color: 'var(--slate)' }}>{formatBDT(option.monthlySalary)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

function getLocationLabel(location) {
  const match = LOCATION_OPTIONS.find((option) => option.value === location)
  return match.label
}

export function ResultLedger({ result, inputs }) {
  return (
    <div className="panel result-panel p-6 md:p-8 md:sticky md:top-10 md:self-start min-w-0">
      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--gold)' }}>Assessment Slip</p>
      <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--ink)' }}>
        Based on {formatBDT(inputs.monthlySalary)} monthly salary
      </h2>

      <LedgerRow label="Annual salary" value={formatBDT(result.annualSalary)} />
      <LedgerRow label="Bonus" value={formatBDT(inputs.bonusAnnual)} />
      {result.carBenefitAnnual > 0 && <LedgerRow label="Motor vehicle benefit (deemed)" value={formatBDT(result.carBenefitAnnual)} />}
      <LedgerRow label="Total income" value={formatBDT(result.totalIncome)} emphasis />

      <div className="my-4 ledger-divider" />

      <LedgerRow label="Exemption (1/3 of income, capped at ৳5,00,000)" value={formatBDT(result.exemption)} muted />
      <LedgerRow label="Taxable income" value={formatBDT(result.taxableIncome)} emphasis />

      <div className="my-5">
        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--slate)' }}>Progressive slab tax</p>
        <SlabTable rows={result.breakdownRows} />
      </div>

      <LedgerRow label="Total tax liability" value={formatBDT(result.taxLiability)} emphasis />
      <LedgerRow label="Investment rebate" value={`– ${formatBDT(result.rebate)}`} muted />
      <LedgerRow label={`Minimum tax floor (${getLocationLabel(inputs.location)})`} value={formatBDT(result.minimumTax)} muted />

      <div className="my-4 ledger-divider" />

      <LedgerRow label="Final tax payable (annual)" value={formatBDT(result.finalTax)} emphasis />

      <div className="stamp mt-6 p-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--teal-dark)' }}>Monthly Tax Deduction</p>
        <p className="font-mono-num text-3xl font-semibold mt-1" style={{ color: 'var(--teal-dark)' }}>{formatBDT(result.monthlyDeduction)}</p>
        <p className="text-xs mt-1" style={{ color: 'var(--slate)' }}>per month, deducted at source</p>
      </div>
    </div>
  )
}
