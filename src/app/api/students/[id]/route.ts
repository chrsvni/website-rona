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

    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            nip: true,
            homeroomClass: true,
            schoolName: true,
          },
        },
        screenings: {
          orderBy: { createdAt: 'desc' },
        },
        dailyNotes: {
          orderBy: { date: 'desc' },
        },
      },
    })

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Data siswa tidak ditemukan.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: student })
  } catch (error) {
    console.error('Error fetching student:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal memuat data siswa.'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}

export async function PUT(
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
    const body = await request.json()
    const { name, gender, age, className, parentName, contactNumber, notes } =
      body

    const existingStudent = await prisma.student.findUnique({
      where: { id },
    })

    if (!existingStudent) {
      return NextResponse.json(
        { success: false, error: 'Data siswa tidak ditemukan.' },
        { status: 404 }
      )
    }

    // Otorisasi: jika guru login dan memiliki kelas wali, pastikan siswa memang binaan kelasnya
    if (session && session.role === 'GURU' && session.homeroomClass) {
      if (
        existingStudent.className !== session.homeroomClass &&
        existingStudent.teacherId !== session.id
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Anda hanya memiliki akses untuk mengelola siswa di kelas binaan Anda.',
          },
          { status: 403 }
        )
      }
    }

    // Validasi Nama
    if (!name || name.toString().trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nama lengkap siswa wajib diisi (minimal 2 karakter).',
        },
        { status: 400 }
      )
    }

    // Validasi Gender
    if (gender && gender !== 'Laki-laki' && gender !== 'Perempuan') {
      return NextResponse.json(
        {
          success: false,
          error: 'Pilih jenis kelamin yang valid (Laki-laki atau Perempuan).',
        },
        { status: 400 }
      )
    }

    // Pastikan kelas tetap mengikuti wali kelas guru yang login jika ada
    let targetClass = existingStudent.className
    if (session && session.role === 'GURU' && session.homeroomClass) {
      targetClass = session.homeroomClass
    } else if (className) {
      targetClass = className.toString().trim()
    }

    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        name: name.toString().trim(),
        gender: gender || existingStudent.gender,
        age:
          age !== undefined && age !== ''
            ? parseInt(age.toString())
            : existingStudent.age,
        className: targetClass,
        parentName:
          parentName !== undefined
            ? parentName
              ? parentName.toString().trim()
              : null
            : existingStudent.parentName,
        contactNumber:
          contactNumber !== undefined
            ? contactNumber
              ? contactNumber.toString().trim()
              : null
            : existingStudent.contactNumber,
        notes:
          notes !== undefined
            ? notes
              ? notes.toString().trim()
              : null
            : existingStudent.notes,
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedStudent,
      message: `Data siswa '${updatedStudent.name}' berhasil diperbarui.`,
    })
  } catch (error) {
    console.error('Error updating student:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal memperbarui data siswa.'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}

export async function DELETE(
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

    const student = await prisma.student.findUnique({
      where: { id },
    })

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Data siswa tidak ditemukan.' },
        { status: 404 }
      )
    }

    // Otorisasi guru
    if (session && session.role === 'GURU' && session.homeroomClass) {
      if (
        student.className !== session.homeroomClass &&
        student.teacherId !== session.id
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Anda hanya memiliki wewenang menghapus siswa di kelas binaan Anda.',
          },
          { status: 403 }
        )
      }
    }

    await prisma.student.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: `Data siswa '${student.name}' beserta seluruh riwayat skriningnya berhasil dihapus permanen.`,
    })
  } catch (error) {
    console.error('Error deleting student:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal menghapus data siswa.'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
