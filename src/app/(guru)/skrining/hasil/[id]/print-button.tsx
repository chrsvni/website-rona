"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button
      size="sm"
      onClick={() => window.print()}
      className="bg-[#0A4174] hover:bg-[#001D39] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md"
    >
      <Printer className="h-3.5 w-3.5" />
      <span>Cetak / Simpan PDF</span>
    </Button>
  );
}
