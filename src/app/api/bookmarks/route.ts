import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Silakan login terlebih dahulu.' },
        { status: 401 }
      )
    }

    const { articleId } = await request.json()

    if (!articleId) {
      return NextResponse.json(
        { success: false, error: 'ID materi wajib disertakan.' },
        { status: 400 }
      )
    }

    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_articleId: {
          userId: session.id,
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
          userId: session.id,
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
