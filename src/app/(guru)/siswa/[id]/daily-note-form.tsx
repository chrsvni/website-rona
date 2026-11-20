"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";

export function DailyNoteForm({ studentId }: { studentId: string }) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("Fokus");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/daily-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          note,
          tag,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setNote("");
        router.refresh();
      } else {
        alert(json.error || "Gagal menyimpan catatan.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-2xl bg-white/90 border border-[#BDD8E9] shadow-sm space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#001D39]">
          Tambah Catatan Perkembangan
        </span>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="text-xs h-7 px-2 rounded-lg border border-[#BDD8E9] bg-white text-[#001D39]"
        >
          <option value="Fokus">Tag: Fokus</option>
          <option value="Membaca">Tag: Membaca</option>
          <option value="Menulis">Tag: Menulis</option>
          <option value="Menghitung">Tag: Menghitung</option>
          <option value="Emosi">Tag: Emosi & Minat</option>
        </select>
      </div>

      <Textarea
        placeholder="Tuliskan pengamatan hari ini (contoh: 'Hari ini berhasil menyelesaikan 2 soal cerita matematika dengan bantuan kancing...')..."
        rows={3}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="text-xs"
      />

      <Button
        type="submit"
        disabled={isSubmitting || !note.trim()}
        size="sm"
        className="w-full bg-[#0A4174] hover:bg-[#001D39] text-white rounded-xl text-xs h-9 flex items-center justify-center gap-1.5"
      >
        <PlusCircle className="h-3.5 w-3.5" />
        <span>{isSubmitting ? "Menyimpan..." : "Simpan Catatan Harian"}</span>
      </Button>
    </form>
  );
}
