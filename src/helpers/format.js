export function formatBDT(amount) {
  const rounded = Math.round(amount)
  return `৳${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(rounded)}`
}
