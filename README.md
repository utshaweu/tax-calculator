# Personal Income Tax Calculator (Bangladesh)

A React component (`TaxCalculator.jsx`) that estimates annual tax liability
and monthly deduction using the progressive slab structure, 1/3 income
exemption, investment rebate, minimum tax floor, and the motor-vehicle
perquisite table.

## Structure
```
src/
  TaxCalculator.jsx      main component (state + layout)
  helpers/
    taxConstants.js      slab options, thresholds, example cases
    taxCalculations.js   pure tax-calculation functions + useTaxCalculation hook
    format.js            formatBDT currency formatter
  components/
    FormFields.jsx        NumberField, SelectField, CheckboxField, SectionCard
    ExampleButtons.jsx     preset example-case buttons
    ResultLedger.jsx       slab table, car benefit reference, results panel
  css/
    TaxCalculator.css     component-scoped styling (colors, fonts, panels)
    index.css              Tailwind entry point
```

## Use in a React project
1. Copy the `helpers/`, `components/`, `TaxCalculator.jsx`, and
   `css/TaxCalculator.css` files into your `src/` folder, preserving the
   relative paths above.
2. Import and render it:
   ```jsx
   import TaxCalculator from './TaxCalculator'
   export default function App() {
     return <TaxCalculator />
   }
   ```
3. It only depends on `react` (hooks: useState, useMemo) — no other
   packages required. Tailwind utility classes are used for layout;
   custom colors/fonts live in `css/TaxCalculator.css`, so it works even
   without a Tailwind build pipeline as long as that stylesheet is loaded.

## Verified
- Logic cross-checked against both worked examples in the source policy
  document (₹50,000/mo → ৳417/mo tax; ৳1,00,000/mo → ৳2,550/mo tax with
  the illustrated rebate).
- Rendered successfully with `react-dom/server` (no runtime errors).
