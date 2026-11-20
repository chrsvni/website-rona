'use client'

import { useState, useMemo } from 'react'
import type { ScreeningAuditItem } from '../_components/screening-audit-table'

export function useScreeningAuditFilter(screenings: ScreeningAuditItem[]) {
  const [categoryFilter, setCategoryFilter] = useState('SEMUA')
  const [riskFilter, setRiskFilter] = useState('SEMUA')

  const filteredScreenings = useMemo(() => {
    return screenings.filter((sc) => {
      const matchCat =
        categoryFilter === 'SEMUA' || sc.category === categoryFilter
      const matchRisk = riskFilter === 'SEMUA' || sc.riskLevel === riskFilter
      return matchCat && matchRisk
    })
  }, [screenings, categoryFilter, riskFilter])

  return {
    categoryFilter,
    setCategoryFilter,
    riskFilter,
    setRiskFilter,
    filteredScreenings,
  }
}
