import React from 'react'

export function FieldLabel({ children }) {
  return <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--slate)' }}>{children}</label>
}

export function NumberField({ label, value, onChange, hint }) {
  return (
    <div className="mb-4">
      <FieldLabel>{label}</FieldLabel>
      <input
        type="number"
        min="0"
        className="field-input w-full"
        value={value}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
      />
      {hint && <p className="text-xs mt-1.5 leading-snug" style={{ color: 'var(--slate)' }}>{hint}</p>}
    </div>
  )
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <div className="mb-4">
      <FieldLabel>{label}</FieldLabel>
      <select className="field-input w-full" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export function CheckboxField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2.5 mb-4 cursor-pointer select-none">
      <input type="checkbox" className="checkbox-input" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{label}</span>
    </label>
  )
}

export function SectionCard({ title, icon, children }) {
  return (
    <div className="panel section-card p-5 mb-5">
      <h3 className="font-display flex items-center gap-2 text-base font-semibold mb-4" style={{ color: 'var(--teal-dark)' }}>
        <span className="section-icon">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  )
}
