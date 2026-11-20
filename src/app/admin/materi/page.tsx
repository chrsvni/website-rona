'use client'

import {
  MateriHeader,
  MateriStatsCards,
  MateriFilterBar,
  MateriTable,
  MateriFormModal,
  MateriDeleteModal,
} from './_components'
import { useAdminMateri } from './_hooks'

export default function AdminMateriCRUDPage() {
  const { filterState, formState, mutationState, handleSubmitForm } =
    useAdminMateri()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <MateriHeader onOpenAdd={formState.handleOpenAdd} />
      <MateriStatsCards
        totalCount={filterState.stats.totalCount}
        disleksiaCount={filterState.stats.disleksiaCount}
        disgrafiaCount={filterState.stats.disgrafiaCount}
        diskalkuliaCount={filterState.stats.diskalkuliaCount}
      />
      <MateriFilterBar
        categoryFilter={filterState.categoryFilter}
        onCategoryFilterChange={filterState.setCategoryFilter}
        search={filterState.search}
        onSearchChange={filterState.setSearch}
      />
      <MateriTable
        loading={mutationState.loading}
        articles={filterState.filteredArticles}
        hasFilterOrSearch={Boolean(
          filterState.search || filterState.categoryFilter !== 'SEMUA'
        )}
        onEdit={formState.handleOpenEdit}
        onDelete={mutationState.setDeleteTarget}
      />
      <MateriFormModal
        isOpen={formState.isModalOpen}
        editingId={formState.editingId}
        formData={formState.formData}
        setFormData={formState.setFormData}
        formSubmitting={formState.formSubmitting}
        formError={formState.formError}
        formSuccess={formState.formSuccess}
        onClose={formState.handleCloseModal}
        onSubmit={handleSubmitForm}
      />
      <MateriDeleteModal
        deleteTarget={mutationState.deleteTarget}
        deleteSubmitting={mutationState.deleteSubmitting}
        onCancel={() => mutationState.setDeleteTarget(null)}
        onConfirm={mutationState.confirmDelete}
      />
    </div>
  )
}
