import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { UserWhereInput } from '@/generated/prisma/models'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const whereClause: UserWhereInput = {
      role: 'GURU',
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { nip: { contains: search } },
        { schoolName: { contains: search } },
        { homeroomClass: { contains: search } },
      ]
    }

    const teachers = await prisma.user.findMany({
      where: whereClause,
      include: {
        _count: {
          select: {
            students: true,
            screenings: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: teachers })
  } catch (error) {
    console.error('Error fetching teachers:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal memuat daftar guru.'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, nip, schoolName, homeroomClass } = body

    if (!name || !name.toString().trim()) {
      return NextResponse.json(
        { success: false, error: 'Nama lengkap guru wajib diisi.' },
        { status: 400 }
      )
    }

    if (!email || !email.toString().trim()) {
      return NextResponse.json(
        { success: false, error: 'Email guru wajib diisi untuk akses login.' },
        { status: 400 }
      )
    }

    if (!password || !password.toString().trim()) {
      return NextResponse.json(
        { success: false, error: 'Kata sandi akun guru wajib diisi.' },
        { status: 400 }
      )
    }

    if (!homeroomClass || !homeroomClass.toString().trim()) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Penugasan wali kelas wajib diisi (contoh: Kelas 3A, Kelas 1, dsb).',
        },
        { status: 400 }
      )
    }

    const cleanEmail = email.toString().trim().toLowerCase()
    const cleanNip = nip ? nip.toString().trim().replace(/[\s-]/g, '') : null
    const cleanHomeroom = homeroomClass.toString().trim()

    // Validasi NIP Standar Nasional (Harus Tepat 18 Digit Angka)
    if (cleanNip) {
      if (!/^\d+$/.test(cleanNip)) {
        return NextResponse.json(
          {
            success: false,
            error: 'NIP hanya boleh terdiri dari karakter angka (0-9).',
          },
          { status: 400 }
        )
      }
      if (cleanNip.length !== 18) {
        return NextResponse.json(
          {
            success: false,
            error: `NIP harus terdiri dari tepat 18 digit angka sesuai standar NIP nasional. Jumlah angka saat ini: ${cleanNip.length} digit.`,
          },
          { status: 400 }
        )
      }

      // Cek keunikan NIP
      const existingNip = await prisma.user.findFirst({
        where: { nip: cleanNip },
      })
      if (existingNip) {
        return NextResponse.json(
          {
            success: false,
            error: `NIP '${cleanNip}' sudah terdaftar pada akun guru lain (${existingNip.name}).`,
          },
          { status: 400 }
        )
      }
    }

    // Cek apakah email sudah terdaftar
    const existingEmail = await prisma.user.findUnique({
      where: { email: cleanEmail },
    })

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Email sudah digunakan oleh akun lain. Silakan gunakan email lain.',
        },
        { status: 400 }
      )
    }

    const newTeacher = await prisma.user.create({
      data: {
        name: name.toString().trim(),
        email: cleanEmail,
        password: password.toString().trim(),
        role: 'GURU',
        isVerified: true,
        schoolName: schoolName
          ? schoolName.toString().trim()
          : 'SD Negeri Binaan',
        nip: cleanNip,
        homeroomClass: cleanHomeroom,
      },
    })

    return NextResponse.json({
      success: true,
      data: newTeacher,
      message: `Akun Guru ${newTeacher.name} (Wali ${cleanHomeroom}) berhasil diterbitkan. Guru dapat langsung login menggunakan email/NIP dan kata sandinya.`,
    })
  } catch (error) {
    console.error('Error creating teacher account:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal membuat akun guru.'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
