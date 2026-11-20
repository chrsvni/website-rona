import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SESSION_COOKIE_NAME, UserSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { identifier, email, password, role } = body
    const loginUser = (identifier || email || '').toString().trim()

    if (!loginUser || !password) {
      return NextResponse.json(
        { success: false, error: 'Email/NIP dan kata sandi wajib diisi.' },
        { status: 400 }
      )
    }

    // Cari user berdasarkan email atau NIP
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: loginUser.toLowerCase() }, { nip: loginUser }],
      },
    })

    if (!user || user.password !== password) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Kredensial tidak valid. Silakan periksa email/NIP dan kata sandi Anda.',
        },
        { status: 401 }
      )
    }

    // Jika parameter role dikirim (misal dari /loginGuru -> "GURU", /loginAdmin -> "ADMIN")
    if (role && user.role !== role) {
      const targetPortal = role === 'ADMIN' ? 'Administrator' : 'Guru'
      return NextResponse.json(
        {
          success: false,
          error: `Akun ini tidak memiliki hak akses sebagai ${targetPortal}. Silakan gunakan portal masuk yang sesuai.`,
        },
        { status: 403 }
      )
    }

    const sessionData: UserSession = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as 'GURU' | 'ADMIN',
      schoolName: user.schoolName,
      nip: user.nip,
      homeroomClass: user.homeroomClass,
      avatarUrl: user.avatarUrl,
    }

    const cookieValue = encodeURIComponent(JSON.stringify(sessionData))

    const response = NextResponse.json({
      success: true,
      user: sessionData,
      message: 'Login berhasil.',
    })

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: cookieValue,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal melakukan login.'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
