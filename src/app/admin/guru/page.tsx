'use client'

import {
  GuruHeader,
  GuruStatsCards,
  GuruFilterBar,
  GuruTable,
  GuruFormModal,
  GuruDeleteModal,
} from './_components'
import { useAdminGuru } from './_hooks'

export default function AdminGuruCRUDPage() {
  const { filterState, formState, mutationState, handleSubmitForm } =
    useAdminGuru()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <GuruHeader onOpenAdd={formState.handleOpenAdd} />
      <GuruStatsCards
        totalGuru={filterState.stats.totalGuru}
        totalSiswa={filterState.stats.totalSiswa}
        totalSkrining={filterState.stats.totalSkrining}
      />
      <GuruFilterBar
        existingClasses={filterState.existingClasses}
        classFilter={filterState.classFilter}
        onClassFilterChange={filterState.setClassFilter}
        search={filterState.search}
        onSearchChange={filterState.setSearch}
      />
      <GuruTable
        loading={mutationState.loading}
        teachers={filterState.filteredTeachers}
        hasFilterOrSearch={Boolean(
          filterState.search || filterState.classFilter !== 'SEMUA'
        )}
        onEdit={formState.handleOpenEdit}
        onDelete={mutationState.setDeleteTarget}
      />
      <GuruFormModal
        isOpen={formState.isModalOpen}
        editingId={formState.editingId}
        formData={formState.formData}
        setFormData={formState.setFormData}
        showPassword={formState.showPassword}
        setShowPassword={formState.setShowPassword}
        formSubmitting={formState.formSubmitting}
        formError={formState.formError}
        formSuccess={formState.formSuccess}
        onClose={formState.handleCloseModal}
        onSubmit={handleSubmitForm}
        onGeneratePassword={formState.handleGeneratePassword}
      />
      <GuruDeleteModal
        deleteTarget={mutationState.deleteTarget}
        deleteSubmitting={mutationState.deleteSubmitting}
        onCancel={() => mutationState.setDeleteTarget(null)}
        onConfirm={mutationState.confirmDelete}
      />
    </div>
  )
}
