import { AdminNavbar } from "@/components/admin-navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-[#001D39]">
      <AdminNavbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p>Rona Administrative Console • Sistem Manajemen Terpusat Deteksi Dini Kesulitan Belajar</p>
      </footer>
    </div>
  );
}
