'use client'

import { useState, useMemo } from 'react'
import type { TeacherItem } from '../_components/types'

export function useTeacherFilter(teachers: TeacherItem[]) {
  const [search, setSearch] = useState('')
  const [classFilter, setClassFilter] = useState('SEMUA')

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const matchClass =
        classFilter === 'SEMUA' || t.homeroomClass === classFilter
      if (!matchClass) return false

      if (!search.trim()) return true
      const query = search.toLowerCase()
      return (
        t.name.toLowerCase().includes(query) ||
        t.email.toLowerCase().includes(query) ||
        (t.nip && t.nip.includes(query)) ||
        (t.homeroomClass && t.homeroomClass.toLowerCase().includes(query)) ||
        (t.schoolName && t.schoolName.toLowerCase().includes(query))
      )
    })
  }, [teachers, search, classFilter])

  const stats = useMemo(() => {
    const totalGuru = teachers.length
    const totalSiswa = teachers.reduce(
      (acc, curr) => acc + (curr._count?.students || 0),
      0
    )
    const totalSkrining = teachers.reduce(
      (acc, curr) => acc + (curr._count?.screenings || 0),
      0
    )

    return {
      totalGuru,
      totalSiswa,
      totalSkrining,
    }
  }, [teachers])

  const existingClasses = useMemo(() => {
    return Array.from(
      new Set(teachers.map((t) => t.homeroomClass).filter(Boolean))
    ) as string[]
  }, [teachers])

  return {
    search,
    setSearch,
    classFilter,
    setClassFilter,
    filteredTeachers,
    stats,
    existingClasses,
  }
}
