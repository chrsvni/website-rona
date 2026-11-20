import type { ArticleDetailData } from './types'

interface ArticleContentBodyProps {
  article: ArticleDetailData
}

export function ArticleContentBody({ article }: ArticleContentBodyProps) {
  return (
    <div className="space-y-4">
      {/* Lead Excerpt */}
      {article.excerpt && (
        <div className="p-4 rounded-2xl bg-[#e8f3fa] border-l-4 border-l-[#0A4174] text-sm text-[#001D39] font-medium leading-relaxed">
          {article.excerpt}
        </div>
      )}

      {/* Isi Paragraf Artikel */}
      <div className="prose prose-blue max-w-none text-sm text-[#001D39] leading-relaxed space-y-4 pt-2">
        {article.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={index} className="text-xl font-bold text-[#001D39] pt-4">
                {paragraph.replace('### ', '')}
              </h3>
            )
          }
          if (paragraph.startsWith('#### ')) {
            return (
              <h4 key={index} className="text-base font-bold text-[#0A4174] pt-2">
                {paragraph.replace('#### ', '')}
              </h4>
            )
          }
          return (
            <p
              key={index}
              className="whitespace-pre-line leading-relaxed text-[#001D39]/90"
            >
              {paragraph}
            </p>
          )
        })}
      </div>
    </div>
  )
}
