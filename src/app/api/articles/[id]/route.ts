import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;

    const article = await prisma.educationArticle.findUnique({
      where: { id },
    });

    if (!article) {
      return NextResponse.json(
        { success: false, error: "Materi referensi tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("Error fetching article detail:", error);
    const message =
      error instanceof Error ? error.message : "Gagal memuat detail artikel.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const body = await request.json();
    const { title, category, type, excerpt, content, author, sourceUrl, publishedDate } = body;

    if (!title || !category) {
      return NextResponse.json(
        { success: false, error: "Judul dan kategori wajib diisi." },
        { status: 400 }
      );
    }

    const updated = await prisma.educationArticle.update({
      where: { id },
      data: {
        title,
        category,
        type: type || "MATERI",
        excerpt: excerpt || title,
        content: content || excerpt || "Referensi materi eksternal terpercaya.",
        author: author || "Sumber Terpercaya",
        sourceUrl: sourceUrl || null,
        publishedDate: publishedDate || null,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating article:", error);
    const message =
      error instanceof Error ? error.message : "Gagal memperbarui artikel.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;

    await prisma.educationArticle.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Materi referensi berhasil dihapus.",
    });
  } catch (error) {
    console.error("Error deleting article:", error);
    const message =
      error instanceof Error ? error.message : "Gagal menghapus materi.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
