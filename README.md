# Rona — Alat Bantu Diagnostik Deteksi Dini Kesulitan Belajar Siswa

**Rona** adalah aplikasi fullstack digital yang dirancang khusus bagi guru sekolah dasar untuk melakukan skrining deteksi dini kesulitan belajar spesifik pada siswa (**Disleksia**, **Disgrafia**, dan **Diskalkulia**).

Aplikasi ini dibangun menggunakan arsitektur **Next.js Fullstack (Backend & Frontend terpadu)**, bahasa **TypeScript**, **Prisma ORM**, dan komponen **shadcn/ui** dengan gaya visual modern *glassmorphism* terinspirasi tema diagnostik kesehatan anak.

---

## 🎨 Palet Warna Desain (Berdasarkan Referensi Proyek)
Aplikasi mengusung skema warna biru laut bertingkat (*ocean / sky / ice palette*):
- **Deep Navy** (`#001D39`): Teks utama, brand aksen gelap, header kontras tinggi.
- **Ocean Blue** (`#0A4174`): Warna identitas primer Rona, tombol utama, navbar brand.
- **Muted Steel Blue** (`#49769F`): Label sekunder, ikon pendukung, teks deskripsi.
- **Teal Blue** (`#4E8EA2`): Indikator modul Disgrafia, badge aktif, ring fokus.
- **Soft Slate Cyan** (`#6EA2B3`): Border kartu frosted glass, elemen netral sejuk.
- **Sky Blue** (`#7BBDE8`): Highlight tombol aktif, glowing backdrop, aksen interaktif.
- **Ice Soft Blue** (`#BDD8E9`): Latar panel, pembatas tabel, badge sekunder.

---

## 🚀 Fitur Utama (Sesuai Functional Requirements Document)

### 1. Fitur Guru & Modul Skrining Multi-Step (FR-SKR)
- **Wizard 5 Langkah Terstruktur (Stepper Form)**:
  1. **Profil Siswa**: Pemilihan siswa dari database atau pendaftaran siswa baru secara instan.
  2. **Panduan Tugas & Bukti Observasi**: Guru membaca panduan materi modul (tujuan, durasi, alat bahan, instruksi guru, langkah tugas siswa) dan memasukkan **bukti tugas yang sudah dikerjakan siswa**.
  3. **Observasi Perilaku Berdasarkan Indikator**: Penilaian skala 1-4 terhadap 8 indikator perilaku objektif spesifik per kesulitan belajar (Disleksia / Disgrafia / Diskalkulia).
  4. **Indikasi Harian & Catatan Kelas**: Catatan pengamatan rutin berkala dan potensi positif siswa.
  5. **Hasil Diagnostik & Rekomendasi Sistem**:
     > ⚠️ **Sesuai Aturan Sistem:** **Rekomendasi diatur otomatis oleh sistem bukan oleh guru**, menghasilkan tingkat indikasi (Rendah / Sedang / Tinggi), skor persentase, analisis kebutuhan khusus, dan rencana aksi tindak lanjut terstruktur.

### 2. Modul Data Siswa & Riwayat (FR-PRO)
- Melihat profil lengkap siswa (NISN, Usia, Gender, Kelas, Kontak Orang Tua).
- Riwayat seluruh skrining yang pernah dijalani siswa.
- **Riwayat Catatan Harian (Daily Notes)** dengan form penambahan catatan harian langsung di halaman siswa.
- **Cetak / Unduh Kartu Hasil PDF**: Format sertifikat resmi lengkap dengan kop sekolah, bukti tugas, skor indikator, rekomendasi sistem, dan kolom tanda tangan (otomatis responsif cetak `@media print`).

### 3. Modul Fakta & Edukasi (FR-EDU)
- Materi edukasi komprehensif mengenai **Disleksia, Disgrafia, dan Diskalkulia**.
- **Panduan Metode**: Praktik metode multisensori Orton-Gillingham (VAKT), adaptasi alat tulis ergonomis (pencil grip), dan metode CPA (*Concrete-Pictorial-Abstract*) matematika.
- **Artikel & Media**: Simulasi sudut pandang siswa dengan kesulitan belajar.
- **Fitur Bookmark**: Guru dapat menyimpan artikel favorit untuk dibaca kembali.

### 4. Modul Admin Dashboard (FR-ADM)
- Ringkasan statistik sistem: jumlah siswa terdata, total skrining selesai, proporsi kesulitan belajar, dan jumlah konten edukasi.
- **Kelola Pengguna**: Status akun guru terverifikasi.
- **Kelola Konten Edukasi**: Monitoring artikel dan panduan live.

---

## 🛠️ Teknologi yang Digunakan
- **Framework**: Next.js 16 (App Router, Server Components & Client Components)
- **Language**: TypeScript
- **Database & ORM**: Prisma ORM 7 + LibSQL SQLite (Zero-config, berkas `dev.db` lokal)
- **Styling**: Tailwind CSS v4, Glassmorphism Frosted Glass UI, Lucide Icons, Radix UI Primitives (shadcn/ui architecture)

---

## 📦 Cara Menjalankan Proyek Secara Lokal

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Konfigurasi Database & Seeding Data Awal
Database SQLite sudah disiapkan secara lokal (`dev.db`). Jika ingin men-generate ulang atau me-reset data:
```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```
*Script seed akan otomatis membuat akun guru contoh, data siswa, artikel edukasi lengkap, riwayat skrining, dan catatan harian.*

### 3. Jalankan Server Development
```bash
npm run dev
```
Buka browser di: **http://localhost:3000**

### 4. Akun Demo Bawaan
- **Guru**: `guru@rona.edu` / Password: `password123` (Ibu Cika Kirana, S.Pd. - SD Negeri Cempaka Putih 01)
- **Admin**: `admin@rona.edu` / Password: `adminpassword123` (Administrator Rona Pusat)

---

## 🖨️ Cara Cetak / Unduh Kartu Hasil PDF
1. Buka menu **Data Siswa & Riwayat** atau selesaikan proses skrining.
2. Klik tombol **"Cetak Kartu Hasil"** pada riwayat skrining yang diinginkan.
3. Klik tombol **"Cetak / Simpan PDF"** di pojok kanan atas.
4. Pada dialog print browser, pilih tujuan *"Save as PDF"* / *"Simpan sebagai PDF"*. Tampilan dokumen sudah dioptimasi khusus untuk cetak kertas formal rapi tanpa elemen navigasi website.
