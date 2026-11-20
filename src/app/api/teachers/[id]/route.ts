import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { UserUpdateInput } from '@/generated/prisma/models'

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params

    const teacher = await prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            students: true,
            screenings: true,
          },
        },
      },
    })

    if (!teacher || teacher.role !== 'GURU') {
      return NextResponse.json(
        { success: false, error: 'Akun guru tidak ditemukan.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: teacher })
  } catch (error) {
    console.error('Error fetching teacher detail:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal memuat detail akun guru.'
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
    const { id } = await props.params
    const body = await request.json()
    const {
      name,
      email,
      password,
      nip,
      schoolName,
      homeroomClass,
      isVerified,
    } = body

    const existingUser = await prisma.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'Akun guru tidak ditemukan.' },
        { status: 404 }
      )
    }

    const cleanEmail = email
      ? email.toString().trim().toLowerCase()
      : existingUser.email
    const cleanNip =
      nip !== undefined
        ? nip
          ? nip.toString().trim().replace(/[\s-]/g, '')
          : null
        : existingUser.nip
    const cleanHomeroom =
      homeroomClass !== undefined
        ? homeroomClass
          ? homeroomClass.toString().trim()
          : null
        : existingUser.homeroomClass

    // Validasi NIP jika diisi
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

      // Cek apakah NIP bentrok dengan guru lain
      if (cleanNip !== existingUser.nip) {
        const nipConflict = await prisma.user.findFirst({
          where: {
            nip: cleanNip,
            NOT: { id },
          },
        })
        if (nipConflict) {
          return NextResponse.json(
            {
              success: false,
              error: `NIP '${cleanNip}' sudah terdaftar pada akun guru lain (${nipConflict.name}).`,
            },
            { status: 400 }
          )
        }
      }
    }

    // Cek apakah email bentrok dengan user lain
    if (cleanEmail !== existingUser.email) {
      const emailConflict = await prisma.user.findFirst({
        where: {
          email: cleanEmail,
          NOT: { id },
        },
      })
      if (emailConflict) {
        return NextResponse.json(
          { success: false, error: 'Email sudah digunakan oleh akun lain.' },
          { status: 400 }
        )
      }
    }

    const updateData: UserUpdateInput = {
      name: name ? name.toString().trim() : existingUser.name,
      email: cleanEmail,
      nip: cleanNip,
      schoolName:
        schoolName !== undefined
          ? schoolName.toString().trim()
          : existingUser.schoolName,
      homeroomClass: cleanHomeroom,
      isVerified:
        isVerified !== undefined
          ? Boolean(isVerified)
          : existingUser.isVerified,
    }

    // Jika admin mengisi password baru (reset password)
    if (password && password.toString().trim() !== '') {
      updateData.password = password.toString().trim()
    }

    const updatedTeacher = await prisma.user.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      data: updatedTeacher,
      message: 'Data akun guru berhasil diperbarui.',
    })
  } catch (error) {
    console.error('Error updating teacher:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal memperbarui akun guru.'
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
    const { id } = await props.params

    const teacher = await prisma.user.findUnique({
      where: { id },
    })

    if (!teacher || teacher.role !== 'GURU') {
      return NextResponse.json(
        {
          success: false,
          error: 'Akun guru tidak ditemukan atau bukan akun guru.',
        },
        { status: 404 }
      )
    }

    await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: `Akun guru '${teacher.name}' beserta seluruh rekamannya berhasil dihapus.`,
    })
  } catch (error) {
    console.error('Error deleting teacher:', error)
    const message =
      error instanceof Error ? error.message : 'Gagal menghapus akun guru.'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
