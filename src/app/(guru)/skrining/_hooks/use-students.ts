'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import type { StudentData } from '../_components/types'
import { getTeacherProfile, getStudents } from '../_services/screening-api'

export function useStudents() {
  const searchParams = useSearchParams()
  const [students, setStudents] = useState<StudentData[]>([])
  const [selectedStudentId, setSelectedStudentId] = useState<string>('')
  const [teacherHomeroom, setTeacherHomeroom] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function loadData() {
      try {
        const [homeroom, studentList] = await Promise.all([
          getTeacherProfile(),
          getStudents(),
        ])

        if (!ignore) {
          if (homeroom) setTeacherHomeroom(homeroom)
          if (studentList.length > 0) {
            setStudents(studentList)
            const studentParam = searchParams.get('studentId')
            if (
              studentParam &&
              studentList.some((s) => s.id === studentParam)
            ) {
              setSelectedStudentId(studentParam)
            } else {
              setSelectedStudentId(studentList[0].id)
            }
          }
        }
      } catch (err) {
        console.error('Failed to load students data', err)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadData()

    return () => {
      ignore = true
    }
  }, [searchParams])

  const selectedStudent = students.find((s) => s.id === selectedStudentId)

  return {
    students,
    selectedStudentId,
    setSelectedStudentId,
    teacherHomeroom,
    selectedStudent,
    loading,
  }
}
