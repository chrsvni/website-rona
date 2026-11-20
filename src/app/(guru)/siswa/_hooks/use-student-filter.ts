'use client'

import { useState, useMemo } from 'react'
import type { StudentItem } from '../_components/types'

export function useStudentFilter(students: StudentItem[]) {
  const [search, setSearch] = useState('')
  const [screeningFilter, setScreeningFilter] = useState('ALL')

  const filteredStudents = useMemo(() => {
    return students.filter((st) => {
      const matchSearch =
        search === '' || st.name.toLowerCase().includes(search.toLowerCase())

      const hasScreening = st.screenings && st.screenings.length > 0
      const matchScreening =
        screeningFilter === 'ALL' ||
        (screeningFilter === 'DONE' && hasScreening) ||
        (screeningFilter === 'NOT_DONE' && !hasScreening)

      return matchSearch && matchScreening
    })
  }, [students, search, screeningFilter])

  return {
    search,
    setSearch,
    screeningFilter,
    setScreeningFilter,
    filteredStudents,
  }
}
