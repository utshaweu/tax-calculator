import React from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import TaxCalculator from './TaxCalculator.jsx'

const root = document.getElementById('root')
createRoot(root).render(
  <React.StrictMode>
    <TaxCalculator />
  </React.StrictMode>
)
