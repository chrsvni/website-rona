import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateScreeningBySystem } from '@/lib/screening-data'
import { getServerSession } from '@/lib/auth'
import type { ScreeningWhereInput } from '@/generated/prisma/models'

export async function GET(request: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Silakan login terlebih dahulu.' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    const category = searchParams.get('category')

    const whereClause: ScreeningWhereInput = {}
    if (studentId) whereClause.studentId = studentId
    if (category) whereClause.category = category

    const screenings = await prisma.screening.findMany({
      where: whereClause,
      include: {
        student: true,
        teacher: {
          select: { id: true, name: true, schoolName: true, nip: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: screenings })
  } catch (error) {
    console.error('Error fetching screenings:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal memuat data skrining.'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      studentId,
      category,
      taskName,
      taskProofNotes,
      taskProofUrl,
      behaviorAnswers,
      dailyIndication,
      dailyGeneralNote,
    } = body

    if (
      !studentId ||
      !category ||
      !behaviorAnswers ||
      !Array.isArray(behaviorAnswers)
    ) {
      return NextResponse.json(
        { success: false, error: 'Data skrining tidak lengkap.' },
        { status: 400 }
      )
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Siswa tidak ditemukan.' },
        { status: 404 }
      )
    }

    // Guru Pengampu dari sesi login yang terverifikasi
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Silakan login terlebih dahulu.' },
        { status: 401 }
      )
    }

    const teacher = await prisma.user.findUnique({ where: { id: session.id } })

    if (!teacher) {
      return NextResponse.json(
        { success: false, error: 'Data guru pengampu tidak ditemukan.' },
        { status: 404 }
      )
    }

    // Hitung Otomatis Menggunakan Algoritma Sistem Rona
    // (Rekomendasi diatur oleh sistem bukan guru)
    const diagnosis = calculateScreeningBySystem(
      category as 'DISLEKSIA' | 'DISGRAFIA' | 'DISKALKULIA',
      behaviorAnswers,
      student.name
    )

    const newScreening = await prisma.screening.create({
      data: {
        studentId: student.id,
        teacherId: teacher.id,
        category,
        taskName: taskName || `Observasi Tugas ${category}`,
        taskProofNotes:
          taskProofNotes || 'Bukti pengerjaan tugas observasi siswa.',
        taskProofUrl: taskProofUrl || null,
        behaviorAnswers: JSON.stringify(behaviorAnswers),
        dailyIndication: dailyIndication || null,
        dailyGeneralNote: dailyGeneralNote || null,
        totalScore: diagnosis.totalScore,
        maxPossibleScore: diagnosis.maxScore,
        percentageScore: diagnosis.percentageScore,
        riskLevel: diagnosis.riskLevel,
        systemRecommendation: diagnosis.systemRecommendation,
        actionPlan: diagnosis.actionPlan,
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    })

    // Otomatis simpan daily note jika ada catatan harian diisi
    if (dailyIndication || dailyGeneralNote) {
      await prisma.dailyNote.create({
        data: {
          studentId: student.id,
          teacherId: teacher.id,
          note: [dailyIndication, dailyGeneralNote].filter(Boolean).join(' - '),
          tag:
            category === 'DISLEKSIA'
              ? 'Membaca'
              : category === 'DISGRAFIA'
                ? 'Menulis'
                : 'Menghitung',
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: newScreening,
      diagnosis,
    })
  } catch (error) {
    console.error('Error creating screening:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal menyimpan hasil skrining.'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
