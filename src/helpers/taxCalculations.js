import { useMemo } from 'react'
import {
  EXEMPTION_CAP,
  GENERAL_THRESHOLD,
  FEMALE_SENIOR_THRESHOLD,
  REBATE_RATE,
  REBATE_TAXABLE_CAP_RATE,
  REBATE_MAX_AMOUNT,
  LOCATION_OPTIONS,
} from './taxConstants'

export function calcExemption(totalIncome) {
  return Math.min(totalIncome / 3, EXEMPTION_CAP)
}

export function buildTaxSlabs(taxFreeThreshold) {
  return [
    { limit: taxFreeThreshold, rate: 0 },
    { limit: taxFreeThreshold + 300000, rate: 0.1 },
    { limit: taxFreeThreshold + 700000, rate: 0.15 },
    { limit: taxFreeThreshold + 1200000, rate: 0.2 },
    { limit: taxFreeThreshold + 3200000, rate: 0.25 },
    { limit: Infinity, rate: 0.3 },
  ]
}

export function calcTaxBreakdown(taxableIncome, slabs) {
  const rows = []
  let remaining = taxableIncome
  let previousLimit = 0
  for (const slab of slabs) {
    if (remaining <= 0) break
    const bandWidth = slab.limit - previousLimit
    const amount = Math.min(remaining, bandWidth)
    rows.push({ rate: slab.rate, bandWidth, bandLimit: slab.limit, amount, tax: amount * slab.rate })
    remaining -= amount
    previousLimit = slab.limit
  }
  return rows
}

export function sumTax(rows) {
  return rows.reduce((total, row) => total + row.tax, 0)
}

export function calcRebate({ investment, taxableIncome }) {
  return Math.min(investment * REBATE_RATE, taxableIncome * REBATE_TAXABLE_CAP_RATE, REBATE_MAX_AMOUNT)
}

export function getMinimumTax(location) {
  const match = LOCATION_OPTIONS.find((option) => option.value === location)
  return match.minimumTax
}

export function calcFinalTax({ taxLiability, rebate, minimumTax, taxableIncome, taxFreeThreshold }) {
  if (taxableIncome <= taxFreeThreshold) return 0
  const netTax = Math.max(taxLiability - rebate, 0)
  return Math.max(netTax, minimumTax)
}

export function useTaxCalculation(inputs) {
  return useMemo(() => {
    const annualSalary = inputs.monthlySalary * 12
    const carBenefitAnnual = inputs.hasCarBenefit ? inputs.carMonthlySalary * 12 : 0
    const totalIncome = annualSalary + inputs.bonusAnnual + carBenefitAnnual
    const exemption = calcExemption(totalIncome)
    const taxableIncome = totalIncome - exemption
    const taxFreeThreshold = inputs.isFemaleOrSenior ? FEMALE_SENIOR_THRESHOLD : GENERAL_THRESHOLD
    const slabs = buildTaxSlabs(taxFreeThreshold)
    const breakdownRows = calcTaxBreakdown(taxableIncome, slabs)
    const taxLiability = sumTax(breakdownRows)
    const rebate = calcRebate({ investment: inputs.investmentAnnual, taxableIncome })
    const minimumTax = getMinimumTax(inputs.location)
    const finalTax = calcFinalTax({ taxLiability, rebate, minimumTax, taxableIncome, taxFreeThreshold })
    const maxBeneficialInvestment = taxableIncome * (REBATE_TAXABLE_CAP_RATE / REBATE_RATE)
    return {
      annualSalary,
      carBenefitAnnual,
      totalIncome,
      exemption,
      taxableIncome,
      taxFreeThreshold,
      breakdownRows,
      taxLiability,
      rebate,
      minimumTax,
      finalTax,
      monthlyDeduction: finalTax / 12,
      maxBeneficialInvestment,
    }
  }, [inputs])
}
