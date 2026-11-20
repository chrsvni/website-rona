'use client'

import { useState, useMemo } from 'react'
import type { RecentScreeningItem } from '../_components/types'

export function useRecentScreenings(initialScreenings: RecentScreeningItem[]) {
  const [categoryFilter, setCategoryFilter] = useState('SEMUA')

  const filteredScreenings = useMemo(() => {
    if (categoryFilter === 'SEMUA') {
      return initialScreenings
    }
    return initialScreenings.filter((sc) => sc.category === categoryFilter)
  }, [initialScreenings, categoryFilter])

  return {
    categoryFilter,
    setCategoryFilter,
    filteredScreenings,
  }
}
