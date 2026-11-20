import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
  UserSession,
  createSessionToken,
} from '@/lib/auth'
import bcrypt from 'bcryptjs'

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

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Kredensial tidak valid. Silakan periksa email/NIP dan kata sandi Anda.',
        },
        { status: 401 }
      )
    }

    // Verifikasi password (dukung bcrypt hash dan fallback plaintext dengan auto-upgrade)
    let isPasswordValid = false
    const isBcryptHash =
      user.password.startsWith('$2a$') ||
      user.password.startsWith('$2b$') ||
      user.password.startsWith('$2y$')

    if (isBcryptHash) {
      isPasswordValid = await bcrypt.compare(password, user.password)
    } else {
      // Akun lama yang belum ter-hash
      if (user.password === password) {
        isPasswordValid = true
        // Otomatis tingkatkan keamanan password ke bcrypt hash
        try {
          const hashedPassword = await bcrypt.hash(password, 10)
          await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
          })
        } catch (hashErr) {
          console.error('Failed to auto-upgrade legacy password hash:', hashErr)
        }
      }
    }

    if (!isPasswordValid) {
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

    // Buat token bertanda tangan digital (HMAC-SHA256)
    const sessionToken = await createSessionToken(sessionData)

    const response = NextResponse.json({
      success: true,
      user: sessionData,
      message: 'Login berhasil.',
    })

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionToken,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE,
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
