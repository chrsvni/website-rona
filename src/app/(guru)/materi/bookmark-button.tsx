"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";

export function BookmarkButton({
  articleId,
  initialBookmarked,
}: {
  articleId: string;
  initialBookmarked: boolean;
}) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  async function handleToggle() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId }),
      });
      const data = await res.json();
      if (data.success) {
        setBookmarked(data.bookmarked);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      title={bookmarked ? "Hapus dari Bookmark" : "Simpan ke Bookmark"}
      className={`p-1.5 rounded-full transition-all ${
        bookmarked
          ? "bg-[#0A4174] text-white"
          : "bg-white/80 text-[#49769F] hover:bg-[#e8f3fa] hover:text-[#0A4174]"
      }`}
    >
      <Bookmark className="h-3.5 w-3.5 fill-current" />
    </button>
  );
}
