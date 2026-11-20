'use client'

import {
  type StudentItem,
  type StudentManagementProps,
  StudentPortalHeader,
  StudentPortalFilter,
  StudentGrid,
  StudentFormModal,
  StudentDeleteModal,
} from './_components'
import { useStudentManagement } from './_hooks'

export type { StudentItem }

export function StudentManagement(props: StudentManagementProps) {
  const {
    assignedClass,
    teacherSession,
    filterState,
    formState,
    mutationState,
    handleSubmitForm,
  } = useStudentManagement(props)

  return (
    <div className="space-y-8">
      <StudentPortalHeader
        homeroomClass={teacherSession?.homeroomClass}
        onOpenAdd={formState.handleOpenAdd}
      />
      <StudentPortalFilter
        screeningFilter={filterState.screeningFilter}
        onScreeningFilterChange={filterState.setScreeningFilter}
        search={filterState.search}
        onSearchChange={filterState.setSearch}
      />
      <StudentGrid
        students={filterState.filteredStudents}
        totalStudentsCount={mutationState.students.length}
        assignedClass={assignedClass}
        onEdit={(st) =>
          formState.handleOpenEdit(st, teacherSession?.homeroomClass)
        }
        onDelete={mutationState.setDeleteTarget}
      />

      <StudentFormModal
        isOpen={formState.isModalOpen}
        editingStudent={formState.editingStudent}
        formData={formState.formData}
        setFormData={formState.setFormData}
        formSubmitting={formState.formSubmitting}
        formError={formState.formError}
        formSuccess={formState.formSuccess}
        homeroomClass={teacherSession?.homeroomClass}
        onClose={formState.handleCloseModal}
        onSubmit={handleSubmitForm}
      />

      <StudentDeleteModal
        deleteTarget={mutationState.deleteTarget}
        deleteSubmitting={mutationState.deleteSubmitting}
        deleteError={mutationState.deleteError}
        onCancel={() => mutationState.setDeleteTarget(null)}
        onConfirm={mutationState.deleteStudentConfirm}
      />
    </div>
  )
}
