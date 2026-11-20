<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

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
