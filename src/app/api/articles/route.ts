import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import type { EducationArticleWhereInput } from "@/generated/prisma/models";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const search = searchParams.get("search") || "";

    const whereClause: EducationArticleWhereInput = { published: true };
    if (category && category !== "SEMUA") {
      whereClause.category = category;
    }
    if (type && type !== "SEMUA") {
      whereClause.type = type;
    }
    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { author: { contains: search } },
      ];
    }

    const articles = await prisma.educationArticle.findMany({
      where: whereClause,
      include: {
        bookmarks: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch articles";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          error: "Akses ditolak. Hanya administrator yang dapat menambahkan materi edukasi.",
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { 
      title, 
      category, 
      type, 
      excerpt, 
      content, 
      author, 
      sourceUrl, 
      publishedDate, 
      coverImage 
    } = body;

    if (!title || !category) {
      return NextResponse.json(
        { success: false, error: "Judul dan kategori materi wajib diisi." },
        { status: 400 }
      );
    }

    // Buat slug otomatis dari judul + waktu unik
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const slug = `${baseSlug || "materi"}-${Date.now().toString(36)}`;

    const article = await prisma.educationArticle.create({
      data: {
        title,
        slug,
        category,
        type: type || "MATERI",
        excerpt: excerpt || title,
        content: content || excerpt || "Referensi materi eksternal terpercaya.",
        author: author || "Sumber Terpercaya",
        sourceUrl: sourceUrl || null,
        publishedDate: publishedDate || new Date().getFullYear().toString(),
        readingTime: "3 menit",
        coverImage: coverImage || null,
        published: true,
      },
    });

    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("Error creating article:", error);
    const message =
      error instanceof Error ? error.message : "Gagal menyimpan materi edukasi.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
