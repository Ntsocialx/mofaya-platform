"use client";

import { useState, type MouseEvent } from "react";
import CanImage from "./CanImage";
import { BRAND, FLAVORS } from "@/lib/mofayaData";

// Smooth-scroll in JS rather than CSS `scroll-behavior`, which breaks ScrollTrigger snapping.
function smoothScrollTo(e: MouseEvent<HTMLAnchorElement>) {
  const target = document.querySelector(e.currentTarget.hash);
  if (!target) return;
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  history.replaceState(null, "", e.currentTarget.hash);
}

const NAV = [
  { href: "#flavours", label: "Flavours" },
  { href: "#about", label: "Our story" },
  { href: "#join", label: "Apply" },
];

export default function HeroSection() {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 sm:py-5">
          <a href={BRAND.site} target="_blank" rel="noreferrer" aria-label="MoFaya website">
            {logoFailed ? (
              <span className="font-display text-2xl font-black uppercase">MoFaya</span>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- official remote logo
              <img src={BRAND.logo} alt="MoFaya" className="h-8 w-auto sm:h-10" onError={() => setLogoFailed(true)} />
            )}
          </a>
          <nav className="flex items-center gap-5 text-xs font-extrabold uppercase tracking-[0.08em] sm:gap-10 sm:text-sm">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={smoothScrollTo}
                className={`transition hover:text-flame ${item.href === "#join" ? "" : "hidden sm:inline"}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        {/* Red glow under the bar, as on mofaya.co.za */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-full h-6 bg-gradient-to-b from-ember/50 to-transparent" />
      </header>

      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="brush-wallpaper absolute inset-0 -z-10" />
        <div aria-hidden className="absolute right-[10%] top-1/3 -z-20 h-[50vmin] w-[50vmin] rounded-full bg-ember/25 blur-[120px]" />

        <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-6 px-4 pb-14 pt-8 sm:px-8 sm:pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p className="brush text-[clamp(1.75rem,3.5vw,2.75rem)] text-white">Campus Marketers</p>
            <h1 className="display-xl mt-4 text-[clamp(2.5rem,5.6vw,5.25rem)]">
              Ignite your mind.
              <br />
              Fuel your <span className="brush text-[1.12em] text-flame">ambition.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[34rem] text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0">
              South Africa&apos;s homegrown energy drink is looking for students who can light up a campus.
              Taste the range, then apply to join the MoFaya Campus Marketer team.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              <a href="#flavours" onClick={smoothScrollTo} className="btn-outline">Explore Flavours</a>
              <a href="#join" onClick={smoothScrollTo} className="btn-flame">Become a Campus Marketer</a>
            </div>
          </div>

          <div className="pointer-events-none relative order-1 mx-auto h-[clamp(13rem,36svh,34rem)] sm:h-[clamp(18rem,50svh,34rem)] lg:order-2 lg:h-[clamp(24rem,68svh,42rem)]">
            <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[105%] -translate-x-1/2 -translate-y-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element -- official brand artwork */}
              <img src={BRAND.flame} alt="" className="h-full w-auto max-w-none animate-burn opacity-90" />
            </div>
            <div className="h-full animate-float">
              <CanImage flavor={FLAVORS[0]} priority className="h-full w-auto" />
            </div>
          </div>
        </div>
      </section>

      <div aria-hidden className="pattern-strip" />
    </>
  );
}
