import React, { useState } from 'react'
import './css/TaxCalculator.css'
import { CAR_BENEFIT_OPTIONS, LOCATION_OPTIONS, EXAMPLE_CASE_1 } from './helpers/taxConstants'
import { formatBDT } from './helpers/format'
import { useTaxCalculation } from './helpers/taxCalculations'
import { NumberField, SelectField, CheckboxField, SectionCard } from './components/FormFields'
import { ExampleButtons } from './components/ExampleButtons'
import { CarBenefitReference, ResultLedger } from './components/ResultLedger'

export default function TaxCalculator() {
  const [inputs, setInputs] = useState(EXAMPLE_CASE_1)
  const result = useTaxCalculation(inputs)

  function updateInput(key, value) {
    setInputs((previous) => ({ ...previous, [key]: value }))
  }

  function clearInputs() {
    setInputs({ ...EXAMPLE_CASE_1, monthlySalary: 0, bonusAnnual: 0, investmentAnnual: 0 })
  }

  return (
    <div className="tax-app min-h-screen px-4 py-10 md:px-10">
      <header className="max-w-5xl mx-auto mb-8 flex items-start gap-4">
        <div className="header-badge font-display">৳</div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>Personal Income Tax</p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold" style={{ color: 'var(--ink)' }}>Tax &amp; Deduction Ledger</h1>
          <p className="text-sm mt-2 max-w-2xl" style={{ color: 'var(--slate)' }}>
            Estimate your annual tax liability and monthly deduction based on the progressive slab structure.
            Figures are illustrative; actual deductions follow applicable law, company policy and NBR regulations.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto grid md:grid-cols-[360px_1fr] gap-8 min-w-0">
        <div className="min-w-0">
          <ExampleButtons onLoad={setInputs} onClear={clearInputs} />

          <SectionCard title="Income" icon={'৳'}>
            <NumberField label="Monthly salary (BDT)" value={inputs.monthlySalary} onChange={(value) => updateInput('monthlySalary', value)} />
            <NumberField
              label="Annual bonus (BDT)"
              value={inputs.bonusAnnual}
              onChange={(value) => updateInput('bonusAnnual', value)}
              hint={`Typical: 1.2 × monthly salary (${formatBDT(inputs.monthlySalary * 1.2)}) across two festival bonuses.`}
            />
          </SectionCard>

          <SectionCard title="Motor vehicle benefit" icon={'\u{1F697}'}>
            <CheckboxField label="Company-provided vehicle" checked={inputs.hasCarBenefit} onChange={(value) => updateInput('hasCarBenefit', value)} />
            {inputs.hasCarBenefit && (
              <SelectField
                label="Engine capacity"
                value={inputs.carMonthlySalary}
                onChange={(value) => updateInput('carMonthlySalary', Number(value))}
                options={CAR_BENEFIT_OPTIONS.map((option) => ({ value: option.monthlySalary, label: option.label }))}
              />
            )}
            <CarBenefitReference />
          </SectionCard>

          <SectionCard title="Investment rebate" icon={'\u{1F4C8}'}>
            <NumberField
              label="Eligible annual investment (BDT)"
              value={inputs.investmentAnnual}
              onChange={(value) => updateInput('investmentAnnual', value)}
              hint={`DPS, Sanchaypatra, life insurance, etc. Rebate maxes out beyond ${formatBDT(result.maxBeneficialInvestment)} for this taxable income.`}
            />
          </SectionCard>

          <SectionCard title="Personal & location" icon={'\u{1F4CD}'}>
            <CheckboxField label="Female or senior citizen (65+)" checked={inputs.isFemaleOrSenior} onChange={(value) => updateInput('isFemaleOrSenior', value)} />
            <SelectField label="Location" value={inputs.location} onChange={(value) => updateInput('location', value)} options={LOCATION_OPTIONS} />
          </SectionCard>
        </div>

        <ResultLedger result={result} inputs={inputs} />
      </div>
    </div>
  )
}
