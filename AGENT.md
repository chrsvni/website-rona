# Development Guidelines & Quality Checks

## Aturan Verifikasi Kode (Mandatory)
Setiap kali ada perubahan kode atau modifikasi file dalam proyek:
1. **Typecheck**: Jalankan typecheck menggunakan `npm run typecheck` (atau `npx tsc --noEmit`) untuk memastikan tidak ada error TypeScript.
2. **Build**: Jalankan build menggunakan `npm run build` untuk memverifikasi build aplikasi Next.js berhasil secara penuh.
3. Selalu pastikan kedua langkah verifikasi di atas berhasil tanpa error sebelum menyelesaikan pekerjaan.

## Larangan Menjalankan Ulang Seed Data Dummy (Strict Constraint)
- **JANGAN PERNAH** menjalankan ulang seed database (`npx prisma db seed`, mengeksekusi `prisma/seed.ts`, atau perintah reset database) kecuali diminta secara eksplisit oleh user.
- Seeding data dummy cukup dilakukan sekali di awal inisiasi proyek saja. User telah menghapus data dummy untuk menggunakan data asli secara langsung.
- Jaga keutuhan seluruh data yang ada di database saat ini, jangan pernah menimpa, mereset, atau mengisi ulang data dummy tanpa persetujuan eksplisit user.

Lihat juga aturan lengkap di [AGENTS.md](AGENTS.md).
