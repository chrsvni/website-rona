import {
  MateriPortalHeader,
  MateriPortalFilter,
  MateriGrid,
} from './_components'
import { getPortalArticles } from './_services/materi-service'

export default async function EducationPage(props: {
  searchParams: Promise<{ cat?: string; search?: string }>
}) {
  const searchParams = await props.searchParams
  const categoryFilter = searchParams.cat || 'SEMUA'
  const search = searchParams.search || ''

  const articles = await getPortalArticles(categoryFilter, search)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <MateriPortalHeader />
      <MateriPortalFilter
        currentCategory={categoryFilter}
        currentSearch={search}
      />
      <MateriGrid articles={articles} />
    </div>
  )
}
