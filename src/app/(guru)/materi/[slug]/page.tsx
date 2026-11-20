import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  ArticleDetailNav,
  ArticleDetailHeader,
  ArticleSourceBox,
  ArticleContentBody,
  ArticleCtaBox,
} from './_components'

export default async function ArticleDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params

  const article = await prisma.educationArticle.findUnique({
    where: { slug },
    include: {
      bookmarks: true,
    },
  })

  if (!article) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <ArticleDetailNav article={article} />
      <article className="glass-card rounded-3xl p-6 sm:p-12 border border-[#BDD8E9]/70 shadow-xl space-y-6">
        <ArticleDetailHeader article={article} />
        <ArticleSourceBox article={article} />
        <ArticleContentBody article={article} />
        <ArticleCtaBox article={article} />
      </article>
    </div>
  )
}
