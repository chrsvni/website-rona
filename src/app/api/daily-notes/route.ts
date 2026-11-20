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

    const { studentId, note, tag } = await request.json()

    if (!studentId || !note) {
      return NextResponse.json(
        { success: false, error: 'ID Siswa dan isi catatan wajib diisi.' },
        { status: 400 }
      )
    }

    const teacher = await prisma.user.findUnique({
      where: { id: session.id },
    })

    if (!teacher) {
      return NextResponse.json(
        { success: false, error: 'Data guru pengampu tidak ditemukan.' },
        { status: 404 }
      )
    }

    const dailyNote = await prisma.dailyNote.create({
      data: {
        studentId,
        teacherId: teacher.id,
        note,
        tag: tag || 'Umum',
        date: new Date(),
      },
    })

    return NextResponse.json({ success: true, data: dailyNote })
  } catch (error) {
    console.error('Daily note create error:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal menyimpan catatan harian.'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
