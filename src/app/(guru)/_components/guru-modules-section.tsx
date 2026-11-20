import Link from 'next/link'
import { Brain, PenTool, Calculator } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function GuruModulesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#4E8EA2]">
          Modul Spesifik Rona
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#001D39]">
          Tiga Dimensi Kesulitan Belajar
        </h2>
        <p className="text-sm text-[#49769F]">
          Setiap modul dilengkapi panduan tugas praktis dan indikator perilaku
          yang diamati langsung oleh guru di kelas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* DISLEKSIA */}
        <div className="glass-card glass-card-hover p-6 rounded-3xl flex flex-col justify-between border-t-4 border-t-[#0A4174]">
          <div className="space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-[#e8f3fa] border border-[#7BBDE8] flex items-center justify-center text-[#0A4174] shadow-sm">
              <Brain className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#001D39]">
                  Disleksia
                </h3>
                <Badge variant="disleksia">Membaca & Fonemik</Badge>
              </div>
              <p className="text-xs text-[#49769F] mt-2 leading-relaxed">
                Hambatan dalam memproses bahasa tulisan, pembalikan pola huruf
                cermin (b/d, p/q), kesulitan decoding bunyi kata, dan
                kehilangan baris membaca.
              </p>
            </div>

            <div className="bg-[#f0f7fc] p-3 rounded-xl border border-[#BDD8E9]/40 text-[11px] text-[#001D39] space-y-1">
              <span className="font-bold text-[#0A4174] block">
                Panduan Tugas Siswa:
              </span>
              <p>• Membaca nyaring teks narasi 2 paragraf</p>
              <p>• Membaca kartu kata berpola mirip</p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-[#BDD8E9]/40 flex items-center justify-between">
            <Link
              href="/materi?cat=DISLEKSIA"
              className="text-xs font-bold text-[#0A4174] hover:underline"
            >
              Pelajari Modul
            </Link>
            <Link href="/skrining?category=DISLEKSIA">
              <Button size="sm" className="rounded-full text-xs">
                Observasi
              </Button>
            </Link>
          </div>
        </div>

        {/* DISGRAFIA */}
        <div className="glass-card glass-card-hover p-6 rounded-3xl flex flex-col justify-between border-t-4 border-t-[#4E8EA2]">
          <div className="space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-[#e6f4f7] border border-[#6EA2B3] flex items-center justify-center text-[#4E8EA2] shadow-sm">
              <PenTool className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#001D39]">
                  Disgrafia
                </h3>
                <Badge variant="disgrafia">Menulis & Motorik</Badge>
              </div>
              <p className="text-xs text-[#49769F] mt-2 leading-relaxed">
                Hambatan koordinasi motorik halus saat memegang alat tulis,
                kelelahan otot cepat, bentuk huruf tidak beraturan, dan spasi
                kata yang tidak terkontrol.
              </p>
            </div>

            <div className="bg-[#f0f9fa] p-3 rounded-xl border border-[#BDD8E9]/40 text-[11px] text-[#001D39] space-y-1">
              <span className="font-bold text-[#4E8EA2] block">
                Panduan Tugas Siswa:
              </span>
              <p>• Menyalin kalimat dan menulis dikte</p>
              <p>• Menggambar pola spiral tanpa jeda</p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-[#BDD8E9]/40 flex items-center justify-between">
            <Link
              href="/materi?cat=DISGRAFIA"
              className="text-xs font-bold text-[#4E8EA2] hover:underline"
            >
              Pelajari Modul
            </Link>
            <Link href="/skrining?category=DISGRAFIA">
              <Button
                size="sm"
                className="rounded-full text-xs bg-[#4E8EA2] hover:bg-[#0A4174]"
              >
                Observasi
              </Button>
            </Link>
          </div>
        </div>

        {/* DISKALKULIA */}
        <div className="glass-card glass-card-hover p-6 rounded-3xl flex flex-col justify-between border-t-4 border-t-[#49769F]">
          <div className="space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-[#eef3f8] border border-[#49769F]/40 flex items-center justify-center text-[#49769F] shadow-sm">
              <Calculator className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#001D39]">
                  Diskalkulia
                </h3>
                <Badge variant="diskalkulia">Logika Kuantitas</Badge>
              </div>
              <p className="text-xs text-[#49769F] mt-2 leading-relaxed">
                Defisit dalam memahami magnitudo bilangan (number sense),
                kesulitan subitizing jumlah tanpa hitung jari, dan kebingungan
                nilai tempat puluhan-satuan.
              </p>
            </div>

            <div className="bg-[#f3f7fa] p-3 rounded-xl border border-[#BDD8E9]/40 text-[11px] text-[#001D39] space-y-1">
              <span className="font-bold text-[#49769F] block">
                Panduan Tugas Siswa:
              </span>
              <p>• Menentukan jumlah sekilas (subitizing)</p>
              <p>• Mengurutkan angka pada garis bilangan</p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-[#BDD8E9]/40 flex items-center justify-between">
            <Link
              href="/materi?cat=DISKALKULIA"
              className="text-xs font-bold text-[#49769F] hover:underline"
            >
              Pelajari Modul
            </Link>
            <Link href="/skrining?category=DISKALKULIA">
              <Button
                size="sm"
                className="rounded-full text-xs bg-[#49769F] hover:bg-[#0A4174]"
              >
                Observasi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
