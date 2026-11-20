import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from '@/lib/auth'
import type { StudentWhereInput } from '@/generated/prisma/models'

export async function GET(request: Request) {
  try {
    const session = await getServerSession()
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')?.trim() || ''
    const className = searchParams.get('className')?.trim() || ''

    const whereClause: StudentWhereInput = {}

    if (session && session.role === 'GURU') {
      if (session.homeroomClass) {
        whereClause.className = session.homeroomClass
      } else {
        whereClause.teacherId = session.id
      }
    }

    if (
      className &&
      (!session || session.role !== 'GURU' || !session.homeroomClass)
    ) {
      whereClause.className = className
    }

    if (search) {
      whereClause.name = { contains: search }
    }

    const students = await prisma.student.findMany({
      where: whereClause,
      include: {
        screenings: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: {
            screenings: true,
            dailyNotes: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: students })
  } catch (error) {
    console.error('Error fetching students:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal memuat data siswa'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    const body = await request.json()
    const { name, gender, age, className, parentName, contactNumber, notes } =
      body

    // Validasi field wajib
    if (!name || name.toString().trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nama lengkap siswa wajib diisi (minimal 2 karakter).',
        },
        { status: 400 }
      )
    }

    if (!gender || (gender !== 'Laki-laki' && gender !== 'Perempuan')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Pilih jenis kelamin yang valid (Laki-laki atau Perempuan).',
        },
        { status: 400 }
      )
    }

    // Tentukan guru pengampu dan kelas otomatis
    let teacherId = session?.id
    let targetClass = className

    if (session && session.role === 'GURU') {
      teacherId = session.id
      // Otomatis kunci kelas siswa ke kelas wali kelas guru yang bersangkutan
      if (session.homeroomClass) {
        targetClass = session.homeroomClass
      }
    }

    if (!teacherId) {
      const defaultTeacher = await prisma.user.findFirst({
        where: { role: 'GURU' },
      })
      teacherId = defaultTeacher?.id
    }

    if (!teacherId) {
      return NextResponse.json(
        { success: false, error: 'Data guru pengampu tidak ditemukan.' },
        { status: 404 }
      )
    }

    const newStudent = await prisma.student.create({
      data: {
        name: name.toString().trim(),
        gender,
        age: age ? parseInt(age.toString()) : null,
        className: targetClass || (session?.homeroomClass ?? 'Kelas 3A'),
        schoolName: session?.schoolName || 'SD Negeri Binaan',
        parentName: parentName ? parentName.toString().trim() : null,
        contactNumber: contactNumber ? contactNumber.toString().trim() : null,
        notes: notes ? notes.toString().trim() : null,
        teacherId,
      },
    })

    return NextResponse.json({
      success: true,
      data: newStudent,
      message: `Siswa '${newStudent.name}' berhasil ditambahkan ke ${newStudent.className}.`,
    })
  } catch (error) {
    console.error('Error creating student:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal membuat student.'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
