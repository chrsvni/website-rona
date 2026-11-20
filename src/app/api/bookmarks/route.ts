import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { articleId } = await request.json()

    const teacher = await prisma.user.findFirst({
      where: { role: 'GURU' },
    })

    if (!teacher || !articleId) {
      return NextResponse.json(
        { success: false, error: 'Parameter tidak lengkap.' },
        { status: 400 }
      )
    }

    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_articleId: {
          userId: teacher.id,
          articleId,
        },
      },
    })

    if (existing) {
      await prisma.bookmark.delete({
        where: { id: existing.id },
      })
      return NextResponse.json({ success: true, bookmarked: false })
    } else {
      await prisma.bookmark.create({
        data: {
          userId: teacher.id,
          articleId,
        },
      })
      return NextResponse.json({ success: true, bookmarked: true })
    }
  } catch (error) {
    console.error('Bookmark toggle error:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal mengubah status bookmark'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
