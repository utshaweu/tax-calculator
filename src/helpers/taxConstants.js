export const CAR_BENEFIT_OPTIONS = [
  { label: 'Up to 1,500 cc', monthlySalary: 15000 },
  { label: 'Above 1,500cc – 2,000cc', monthlySalary: 20000 },
  { label: 'Above 2,000cc – 2,500cc', monthlySalary: 30000 },
  { label: 'Above 2,500cc', monthlySalary: 50000 },
]

export const LOCATION_OPTIONS = [
  { value: 'dhakaChattogram', label: 'Dhaka / Chattogram City Corporation', minimumTax: 5000 },
  { value: 'otherCityCorp', label: 'Other City Corporation', minimumTax: 4000 },
  { value: 'otherAreas', label: 'All Other Areas', minimumTax: 3000 },
]

export const GENERAL_THRESHOLD = 400000
export const FEMALE_SENIOR_THRESHOLD = 425000
export const EXEMPTION_CAP = 500000
export const REBATE_RATE = 0.15
export const REBATE_TAXABLE_CAP_RATE = 0.03
export const REBATE_MAX_AMOUNT = 1000000

export const EXAMPLE_CASE_1 = {
  monthlySalary: 50000,
  bonusAnnual: 60000,
  hasCarBenefit: false,
  carMonthlySalary: CAR_BENEFIT_OPTIONS[0].monthlySalary,
  investmentAnnual: 0,
  isFemaleOrSenior: false,
  location: 'dhakaChattogram',
}

export const EXAMPLE_CASE_2 = {
  ...EXAMPLE_CASE_1,
  monthlySalary: 100000,
  bonusAnnual: 120000,
}
