'use client'

import { useState, useMemo } from 'react'
import type { ArticleItem } from '../_components/types'

export function useArticleFilter(articles: ArticleItem[]) {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('SEMUA')

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchCat =
        categoryFilter === 'SEMUA' || art.category === categoryFilter
      const matchQuery =
        search.trim() === '' ||
        art.title.toLowerCase().includes(search.toLowerCase()) ||
        art.author.toLowerCase().includes(search.toLowerCase()) ||
        (art.excerpt && art.excerpt.toLowerCase().includes(search.toLowerCase()))
      return matchCat && matchQuery
    })
  }, [articles, search, categoryFilter])

  const stats = useMemo(() => {
    const totalCount = articles.length
    const disleksiaCount = articles.filter(
      (a) => a.category === 'DISLEKSIA'
    ).length
    const disgrafiaCount = articles.filter(
      (a) => a.category === 'DISGRAFIA'
    ).length
    const diskalkuliaCount = articles.filter(
      (a) => a.category === 'DISKALKULIA'
    ).length

    return {
      totalCount,
      disleksiaCount,
      disgrafiaCount,
      diskalkuliaCount,
    }
  }, [articles])

  return {
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    filteredArticles,
    stats,
  }
}
