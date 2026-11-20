import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Rona - Diagnostik Deteksi Dini Kesulitan Belajar Siswa",
  description:
    "Aplikasi bantu diagnostik digital bagi guru untuk skrining deteksi dini kesulitan belajar (Disleksia, Disgrafia, Diskalkulia) pada siswa sekolah dasar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased" suppressHydrationWarning>
      <body 
        className="min-h-full flex flex-col bg-gradient-to-br from-[#f4f8fb] via-[#ebf4fa] to-[#f2f7fc] text-[#001D39]"
        suppressHydrationWarning
      >
        <Suspense fallback={<div className="h-16" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
