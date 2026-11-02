"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "mofaya-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function decide(choice: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Storage unavailable (private mode); just hide for this visit.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-orange-600/30 bg-obsidian/80 p-5 shadow-[0_0_50px_-10px_rgba(255,62,0,0.5)] backdrop-blur-md sm:flex-row sm:items-center sm:p-6">
        <div className="flex-1">
          <p className="text-lg font-semibold text-cream">We use cookies</p>
          <p className="mt-1 text-sm text-white/70">
            We use essential cookies to run this site and optional analytics to improve the campus programme.
            Your data is handled in line with POPIA.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold transition hover:border-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-full bg-gradient-to-r from-ember to-flame px-5 py-2.5 text-sm font-semibold shadow-[0_0_25px_-5px_rgba(255,62,0,0.9)] transition hover:brightness-110"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
