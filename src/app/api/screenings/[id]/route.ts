import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from '@/lib/auth'

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Silakan login terlebih dahulu.' },
        { status: 401 }
      )
    }

    const { id } = await props.params

    const screening = await prisma.screening.findUnique({
      where: { id },
      include: {
        student: true,
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
            schoolName: true,
            nip: true,
          },
        },
      },
    })

    if (!screening) {
      return NextResponse.json(
        { success: false, error: 'Data skrining tidak ditemukan.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: screening })
  } catch (error) {
    console.error('Error fetching screening detail:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal memuat detail skrining.'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
