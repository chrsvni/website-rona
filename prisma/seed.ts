import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";
import { calculateScreeningBySystem } from "../src/lib/screening-data";

const dbPath = path.resolve(process.cwd(), "dev.db").replace(/\\/g, "/");
const adapter = new PrismaLibSql({
  url: `file:${dbPath}`,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Checking Rona database before seeding...");

  // Proteksi: Jika database sudah ada data (pengguna atau siswa), jangan timpa atau re-seed!
  const existingUsers = await prisma.user.count();
  const existingStudents = await prisma.student.count();
  if (existingUsers > 0 || existingStudents > 0) {
    console.log(
      `Database sudah memiliki ${existingUsers} pengguna dan ${existingStudents} siswa. ` +
      "Seeding dibatalkan secara aman agar data yang telah diubah atau dihapus oleh pengguna tidak ter-reset."
    );
    return;
  }

  console.log("Database kosong, memulai proses seeding awal...");

  // 1. Clean existing records (hanya jika kosong/tidak ada data yang perlu dijaga)
  await prisma.bookmark.deleteMany();
  await prisma.dailyNote.deleteMany();
  await prisma.screening.deleteMany();
  await prisma.student.deleteMany();
  await prisma.educationArticle.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users (Guru & Admin)
  const teacher = await prisma.user.create({
    data: {
      id: "usr_guru_demo",
      name: "Ibu Cika Kirana, S.Pd.",
      email: "guru@rona.edu",
      password: "password123", // In actual app, hash or plain for demo
      role: "GURU",
      isVerified: true,
      schoolName: "SD Negeri Cempaka Putih 01",
      nip: "199208152019032008",
      homeroomClass: "Kelas 3A",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256",
    },
  });

  const admin = await prisma.user.create({
    data: {
      id: "usr_admin_demo",
      name: "Administrator Rona Pusat",
      email: "admin@rona.edu",
      password: "adminpassword123",
      role: "ADMIN",
      isVerified: true,
      schoolName: "Dinas Pendidikan & Litbang Rona",
      nip: "198504122009011002",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256",
    },
  });

  console.log("Users created:", { teacher: teacher.name, admin: admin.name });

  // 3. Create Students
  const student1 = await prisma.student.create({
    data: {
      id: "std_01",
      name: "Kenzo Pratama",
      gender: "Laki-laki",
      age: 8,
      className: "Kelas 3A",
      schoolName: "SD Negeri Cempaka Putih 01",
      parentName: "Bpk. Hendra Pratama",
      contactNumber: "081298765432",
      notes: "Siswa sangat aktif dalam diskusi lisan dan seni lukis, namun sering tampak cemas ketika diminta membaca buku teks di kelas.",
      teacherId: teacher.id,
    },
  });

  const student2 = await prisma.student.create({
    data: {
      id: "std_02",
      name: "Siti Rahma",
      gender: "Perempuan",
      age: 9,
      className: "Kelas 3B",
      schoolName: "SD Negeri Cempaka Putih 01",
      parentName: "Ibu Nurhayati",
      contactNumber: "081344556677",
      notes: "Mudah lelah saat menyalin pelajaran dari papan tulis, pensil dipegang dengan tekanan sangat keras hingga kertas robek.",
      teacherId: teacher.id,
    },
  });

  const student3 = await prisma.student.create({
    data: {
      id: "std_03",
      name: "Budi Santoso",
      gender: "Laki-laki",
      age: 8,
      className: "Kelas 3A",
      schoolName: "SD Negeri Cempaka Putih 01",
      parentName: "Bpk. Supriyanto",
      contactNumber: "081511223344",
      notes: "Sangat mahir berbahasa dan bercerita, tetapi kesulitan menghubungkan angka puluhan dan sering tertukar nilai 17 dengan 71.",
      teacherId: teacher.id,
    },
  });

  const student4 = await prisma.student.create({
    data: {
      id: "std_04",
      name: "Ayu Nirmala",
      gender: "Perempuan",
      age: 8,
      className: "Kelas 2C",
      schoolName: "SD Negeri Cempaka Putih 01",
      parentName: "Ibu Hartini",
      contactNumber: "082166778899",
      notes: "Perkembangan belajar secara umum baik, sedang dipantau untuk adaptasi membaca mandiri.",
      teacherId: teacher.id,
    },
  });

  console.log("Students created: 4 students.");

  // 4. Create Education Articles (Fakta & Edukasi: Disleksia, Disgrafia, Diskalkulia, Panduan, Media)
  const articles = [
    {
      id: "art_01",
      title: "Mengenal Disleksia: Mitos, Fakta, dan Cara Deteksi Dini di Ruang Kelas",
      slug: "mengenal-disleksia-fakta-dan-deteksi-dini",
      category: "DISLEKSIA",
      type: "MATERI",
      excerpt:
        "Disleksia bukanlah masalah kecerdasan atau penglihatan, melainkan perbedaan neurologis dalam memproses bahasa dan fonemik bunyi huruf.",
      sourceUrl: "https://ditpsd.kemdikbud.go.id/artikel/detail/mengenal-disleksia-pada-anak-usia-sekolah-dasar",
      publishedDate: "2023",
      content: `### Apa Itu Disleksia?
Disleksia adalah salah satu bentuk kesulitan belajar spesifik (*Specific Learning Disorder*) yang berbasis neurobiologis. Siswa dengan disleksia mengalami kesulitan dalam mengenali kata-kata secara akurat atau lancar, serta mengalami hambatan dalam mengeja (*decoding*) dan menguraikan bunyi huruf.`,
      readingTime: "5 menit",
      author: "Direktorat Sekolah Dasar Kemdikbudristek RI",
      coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
      published: true,
    },
    {
      id: "art_02",
      title: "Panduan Metode Multisensori (Orton-Gillingham) untuk Siswa Disleksia",
      slug: "panduan-metode-multisensori-orton-gillingham",
      category: "DISLEKSIA",
      type: "PANDUAN_METODE",
      excerpt:
        "Strategi konkret melibatkan indra penglihatan, pendengaran, sentuhan, dan gerakan otot secara simultan untuk memperkuat jalur memori fonologis anak.",
      sourceUrl: "https://journal.uny.ac.id/index.php/jpk",
      publishedDate: "2024",
      content: `### Prinsip Metode Multisensori (VAKT)
VAKT merupakan akronim dari *Visual, Auditory, Kinesthetic, and Tactile*. Dalam metode ini, guru tidak hanya mengandalkan papan tulis dan suara, melainkan mengaktifkan seluruh sensor sensori siswa.`,
      readingTime: "7 menit",
      author: "Jurnal Pendidikan Khusus UNY",
      coverImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
      published: true,
    },
    {
      id: "art_03",
      title: "Memahami Disgrafia: Mengapa Menulis Terasa Sangat Menyakitkan Bagi Sebagian Siswa?",
      slug: "memahami-disgrafia-hambatan-motorik-menulis",
      category: "DISGRAFIA",
      type: "MATERI",
      excerpt:
        "Disgrafia melibatkan koordinasi motorik halus, memori kerja ortografis, dan perencanaan spasial kertas. Temukan bagaimana membedakan tulisan kurang rapi biasa dengan disgrafia.",
      sourceUrl: "https://www.idai.or.id/artikel/seputar-kesehatan-anak/mengenal-kesulitan-belajar-spesifik-pada-anak",
      publishedDate: "2023",
      content: `### Apa Itu Disgrafia?
Disgrafia adalah kesulitan belajar spesifik yang mempengaruhi kemampuan menulis tulisan tangan, konsistensi ortografis, dan pengorganisasian ide tertulis.`,
      readingTime: "6 menit",
      author: "Ikatan Dokter Anak Indonesia (IDAI)",
      coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
      published: true,
    },
    {
      id: "art_04",
      title: "Panduan Penanganan Disgrafia: Penggunaan Pencil Grip, Posisi Postur, dan Lembar Kerja Bergaris Tiga",
      slug: "panduan-penanganan-disgrafia-alat-bantu-ergonomis",
      category: "DISGRAFIA",
      type: "PANDUAN_METODE",
      excerpt:
        "Koleksi strategi praktis guru di kelas mulai dari pemilihan alat tulis, latihan senam jemari, hingga penyesuaian asesmen tanpa mengurangi standar kurikulum.",
      sourceUrl: "https://kurikulum.kemdikbud.go.id/pemberdayaan-inklusif",
      publishedDate: "2024",
      content: `### Strategi Adaptasi Kelas untuk Disgrafia:
1. **Pemberian Pencil Grip Ergonomis**: Pasang bantalan silikon bentuk segitiga pada pensil siswa agar jari telunjuk, jempol, dan jari tengah berada pada posisi tripod dinamis yang nyaman tanpa tegang.`,
      readingTime: "6 menit",
      author: "Pusat Kurikulum & Pembelajaran Kemendikbud",
      coverImage: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800",
      published: true,
    },
    {
      id: "art_05",
      title: "Diskalkulia: Ketika Angka Kehilangan Makna Besaran Bagi Anak",
      slug: "diskalkulia-kesulitan-matematika-konseptual",
      category: "DISKALKULIA",
      type: "MATERI",
      excerpt:
        "Bukan karena anak 'bodoh matematika'. Kenali defisit 'Number Sense' dan perbedaan mendasar antara ketidaksiapan materi dengan diskalkulia.",
      sourceUrl: "https://journal.uny.ac.id/index.php/jpm",
      publishedDate: "2023",
      content: `### Apa Itu Diskalkulia?
Diskalkulia adalah gangguan belajar spesifik pada pemrosesan konsep kuantitas numerik, hubungan spasial angka, dan pemecahan hitungan dasar.`,
      readingTime: "5 menit",
      author: "Jurnal Riset Pendidikan Matematika",
      coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
      published: true,
    },
    {
      id: "art_06",
      title: "Metode CPA (Concrete-Pictorial-Abstract): Menjembatani Pemahaman Konsep Angka",
      slug: "metode-cpa-concrete-pictorial-abstract-diskalkulia",
      category: "DISKALKULIA",
      type: "PANDUAN_METODE",
      excerpt:
        "Panduan penerapan pedagogi konkret ke abstrak untuk membantu siswa diskalkulia membangun representasi mental angka yang kokoh.",
      sourceUrl: "https://qitepinmath.org/resources/cpa-guidelines",
      publishedDate: "2024",
      content: `### Tahapan Pendekatan CPA:
1. **Tahap 1: Concrete (Benda Nyata)**: Mulailah selalu dengan manipulatif nyata: balok satuan, kancing, potongan buah, atau stik es krim.`,
      readingTime: "8 menit",
      author: "SEAMEO QITEP in Mathematics",
      coverImage: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=800",
      published: true,
    },
    {
      id: "art_07",
      title: "Panduan Penyelenggaraan Pendidikan Inklusif di Sekolah Dasar",
      slug: "panduan-pendidikan-inklusif-sekolah-dasar",
      category: "UMUM",
      type: "ARTIKEL_MEDIA",
      excerpt:
        "Pedoman resmi bagi pendidik dalam merancang akomodasi yang layak dan kurikulum adaptif bagi peserta didik berkebutuhan khusus di sekolah reguler.",
      sourceUrl: "https://pmpk.kemdikbud.go.id/buku-pedoman-pendidikan-inklusif",
      publishedDate: "2023",
      content: `### Empati Guru adalah Kunci Transformasi Pendidikan Inklusif
Melalui rujukan terstandar, guru dapat memahami bahwa kesulitan belajar bukan disebabkan oleh kemalasan atau pembangkangan, melainkan variasi cara kerja otak dalam memproses informasi.`,
      readingTime: "4 menit",
      author: "Direktorat PMPK Kemdikbudristek RI",
      coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
      published: true,
    },
  ];

  for (const art of articles) {
    await prisma.educationArticle.create({ data: art });
  }
  console.log(`Created ${articles.length} education articles.`);

  // 5. Bookmark an article for teacher
  await prisma.bookmark.create({
    data: {
      userId: teacher.id,
      articleId: articles[0].id,
    },
  });

  // 6. Create Completed Screening for Student 1 (Kenzo Pratama - Disleksia)
  const answersKenzo = [
    { indicatorId: "dys_01", score: 4, note: "Sering sekali tertukar huruf b dan d saat membaca paragraf 1." },
    { indicatorId: "dys_02", score: 3, note: "Suku kata akhir kerap hilang saat mengeja cepat." },
    { indicatorId: "dys_03", score: 4, note: "Sangat kesulitan memecah bunyi kata baru tanpa bantuan gambar." },
    { indicatorId: "dys_04", score: 4, note: "Harus menggunakan telunjuk karena baris bacaan melompat." },
    { indicatorId: "dys_05", score: 3, note: "Membaca 'batu' menjadi 'tuba' pada kartu kata." },
    { indicatorId: "dys_06", score: 2, note: "Mampu menebak rima dengan petunjuk suara berulang." },
    { indicatorId: "dys_07", score: 4, note: "Kelelahan ekstrem setelah membaca 1 paragraf, tidak mampu mengingat inti cerita." },
    { indicatorId: "dys_08", score: 4, note: "Tampak cemas dan menunduk saat tiba giliran membaca nyaring." },
  ];

  const diagKenzo = calculateScreeningBySystem("DISLEKSIA", answersKenzo, student1.name);

  const screeningKenzo = await prisma.screening.create({
    data: {
      studentId: student1.id,
      teacherId: teacher.id,
      category: "DISLEKSIA",
      taskName: "Observasi Membaca Nyaring & Kesadaran Fonemik",
      taskProofNotes:
        "Siswa telah menyelesaikan tugas membaca 2 paragraf cerita pendek 'Petualangan Si Kancil' dan membaca 10 kartu kata berpola mirip di ruang bimbingan. Terlampir rekaman catatan durasi 18 menit dengan pengamatan gestur jari menunjuk dan ekspresi cemas.",
      taskProofUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600",
      behaviorAnswers: JSON.stringify(answersKenzo),
      dailyIndication:
        "Tampak adanya penurunan motivasi pada jam pelajaran Bahasa Indonesia. Kenzo lebih memilih diam atau izin ke toilet ketika sesi membaca dimulai.",
      dailyGeneralNote:
        "Kenzo memiliki daya imajinasi visual yang sangat baik saat menggambar ilustrasi cerita, kemampuan logikanya tinggi.",
      totalScore: diagKenzo.totalScore,
      maxPossibleScore: diagKenzo.maxScore,
      percentageScore: diagKenzo.percentageScore,
      riskLevel: diagKenzo.riskLevel,
      systemRecommendation: diagKenzo.systemRecommendation,
      actionPlan: diagKenzo.actionPlan,
      status: "COMPLETED",
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
  });

  // 7. Create Completed Screening for Student 2 (Siti Rahma - Disgrafia)
  const answersSiti = [
    { indicatorId: "dg_01", score: 4, note: "Pencil grip sangat kaku, kertas sering berlekuk parah." },
    { indicatorId: "dg_02", score: 4, note: "Ukuran huruf bercampur kapital dan kecil tidak konsisten." },
    { indicatorId: "dg_03", score: 3, note: "Tulisan melayang naik ke atas melewati garis buku." },
    { indicatorId: "dg_04", score: 4, note: "Spasi antarkata nyaris menempel rapat." },
    { indicatorId: "dg_05", score: 4, note: "Mengeluh nyeri pergelangan tangan setelah 5 menit menulis." },
    { indicatorId: "dg_06", score: 3, note: "Bercerita lisan sangat runtut, tapi hanya menulis 1 baris." },
    { indicatorId: "dg_07", score: 3, note: "Margin kiri dan kanan sering ditabrak." },
    { indicatorId: "dg_08", score: 4, note: "Kecepatan menyalin tertinggal jauh dari seisi kelas." },
  ];

  const diagSiti = calculateScreeningBySystem("DISGRAFIA", answersSiti, student2.name);

  await prisma.screening.create({
    data: {
      studentId: student2.id,
      teacherId: teacher.id,
      category: "DISGRAFIA",
      taskName: "Observasi Menulis Dikte & Pola Motorik Halus",
      taskProofNotes:
        "Lembar kerja menyalin teks 'Kucing Belang' dan menggambar pola spiral telah dikerjakan. Bukti fisik menunjukkan tekanan pensil sangat tebal dan pola spiral terputus-putus karena tangan lelah.",
      taskProofUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=600",
      behaviorAnswers: JSON.stringify(answersSiti),
      dailyIndication:
        "Siti menunjukkan keengganan menyalin catatan papan tulis dan sering meminta temannya untuk membacakan ulang catatannya.",
      dailyGeneralNote:
        "Perlu pengadaan pencil grip silikon segitiga untuk dipasang di meja belajarnya.",
      totalScore: diagSiti.totalScore,
      maxPossibleScore: diagSiti.maxScore,
      percentageScore: diagSiti.percentageScore,
      riskLevel: diagSiti.riskLevel,
      systemRecommendation: diagSiti.systemRecommendation,
      actionPlan: diagSiti.actionPlan,
      status: "COMPLETED",
      completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
  });

  // 8. Create Daily Notes for Students
  await prisma.dailyNote.createMany({
    data: [
      {
        studentId: student1.id,
        teacherId: teacher.id,
        date: new Date(),
        note: "Kenzo merespons positif saat dikenalkan dengan baki pasir warna untuk mengeja huruf b dan d. Tampak lebih percaya diri.",
        tag: "Membaca",
      },
      {
        studentId: student1.id,
        teacherId: teacher.id,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        note: "Hari ini berhasil membaca 1 paragraf dengan bantuan penggaris penutup baris tanpa kehilangan fokus.",
        tag: "Fokus",
      },
      {
        studentId: student2.id,
        teacherId: teacher.id,
        date: new Date(),
        note: "Siti mencoba pencil grip segitiga baru. Keluhan lelah jari berkurang dari 5 menit menjadi 12 menit.",
        tag: "Menulis",
      },
    ],
  });

  console.log("Seed finished successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
