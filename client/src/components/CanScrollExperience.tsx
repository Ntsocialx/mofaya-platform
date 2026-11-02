"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CanImage from "./CanImage";
import { FLAVORS } from "@/lib/mofayaData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LAST = FLAVORS.length - 1;
// Hidden until the timeline reveals them; avoids a flash of stacked layers before hydration.
const hiddenUntilActive = (i: number) => (i === 0 ? undefined : { opacity: 0, visibility: "hidden" as const });

export default function CanScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState(0);

  // One scrubbed timeline: each flavour gets a 1-unit segment ending on label `f{i}`.
  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const cans = q("[data-can]");
      const bgs = q("[data-bg]");
      const panels = q("[data-panel]");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(cans.slice(1), { yPercent: 35, scale: 0.8, rotate: -14 });
      gsap.set(panels.slice(1), { y: 30 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${LAST * 100}%`,
          pin: true,
          scrub: reduceMotion ? true : 0.6,
          // inertia: false — otherwise a fast flick projects past several flavours and snaps to the end.
          snap: reduceMotion
            ? undefined
            : { snapTo: "labels", inertia: false, delay: 0.1, duration: { min: 0.2, max: 0.6 }, ease: "power1.inOut" },
          onUpdate: (self) => {
            const next = Math.round(self.progress * LAST);
            setActive((prev) => (prev === next ? prev : next));
          },
        },
      });

      tl.addLabel("f0");
      for (let i = 1; i <= LAST; i++) {
        tl.to(cans[i - 1], { yPercent: -35, scale: 0.8, rotate: 14, autoAlpha: 0 })
          .to(cans[i], { yPercent: 0, scale: 1, rotate: 0, autoAlpha: 1 }, "<")
          .to(bgs[i], { autoAlpha: 1 }, "<")
          .to(panels[i - 1], { y: -30, autoAlpha: 0, duration: 0.45 }, "<")
          .to(panels[i], { y: 0, autoAlpha: 1, duration: 0.45 }, "<0.55")
          .addLabel(`f${i}`);
      }
      tlRef.current = tl;
    },
    { scope: sectionRef },
  );

  function jumpTo(i: number) {
    const st = tlRef.current?.scrollTrigger;
    if (st) window.scrollTo({ top: st.labelToScroll(`f${i}`), behavior: "smooth" });
  }

  const flavor = FLAVORS[active];

  return (
    <section id="flavours" ref={sectionRef} aria-label="MoFaya flavour range" className="relative isolate h-[100svh] overflow-hidden">
      {/* Gradient layers — later flavours stack on top and fade in */}
      {FLAVORS.map((f, i) => (
        <div
          key={f.id}
          data-bg
          aria-hidden
          className="absolute inset-0 -z-20"
          style={{
            background: `radial-gradient(ellipse at 62% 50%, ${f.from}d9 0%, ${f.to}66 38%, #0A0A0C 78%)`,
            ...hiddenUntilActive(i),
          }}
        />
      ))}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />

      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 select-none whitespace-nowrap text-center font-display text-[18vw] font-black uppercase leading-none text-transparent opacity-25 [-webkit-text-stroke:2px_rgba(255,255,255,0.4)]"
      >
        {flavor.name}
      </p>

      <div className="mx-auto grid h-full max-w-7xl grid-rows-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-8 sm:px-8 lg:grid-cols-[1fr_1.1fr_auto] lg:grid-rows-1 lg:gap-10">
        {/* Detail panels, stacked in one grid cell */}
        <div className="order-2 grid lg:order-1">
          {FLAVORS.map((f, i) => (
            <article
              key={f.id}
              data-panel
              aria-hidden={i !== active}
              className="glass col-start-1 row-start-1 rounded-3xl p-6 sm:p-8"
              style={hiddenUntilActive(i)}
            >
              <p className="brush text-2xl" style={{ color: f.accent }}>
                {f.edition}
              </p>
              <h2 className="display-xl mt-3 text-[clamp(2.25rem,4.4vw,3.75rem)]">{f.name}</h2>
              <p className="mt-4 text-xl font-bold leading-snug text-white sm:text-2xl">{f.tagline}</p>
              <p className="mt-4 hidden max-w-[42ch] text-white/75 sm:block">{f.description}</p>
              <a
                href={f.page}
                target="_blank"
                rel="noreferrer"
                tabIndex={i === active ? 0 : -1}
                className="mt-6 inline-block text-sm font-semibold text-cream underline decoration-cream/30 underline-offset-4 transition hover:decoration-cream"
              >
                Read more on mofaya.co.za
              </a>
            </article>
          ))}
        </div>

        {/* Cans, stacked in one grid cell; float animation on the wrapper so GSAP owns the can transforms */}
        <div className="relative order-1 flex h-full min-h-0 items-center justify-center lg:order-2">
          <div
            aria-hidden
            className="absolute h-[60%] w-[60%] rounded-full blur-3xl transition-colors duration-700"
            style={{ backgroundColor: `${flavor.from}88` }}
          />
          <div className="grid h-full max-h-[70vh] min-h-0 animate-float place-items-center">
            {FLAVORS.map((f, i) => (
              <div key={f.id} data-can className="col-start-1 row-start-1 h-full min-h-0 will-change-transform" style={hiddenUntilActive(i)}>
                <CanImage flavor={f} priority={i < 2} className="h-full w-auto" />
              </div>
            ))}
          </div>
        </div>

        <nav aria-label="Choose a flavour" className="order-3 hidden flex-col gap-3 lg:flex">
          {FLAVORS.map((f, i) => (
            <button
              key={f.id}
              type="button"
              onClick={() => jumpTo(i)}
              aria-current={i === active ? "step" : undefined}
              aria-label={f.name}
              className="group flex items-center justify-end gap-3"
            >
              <span className={`text-xs uppercase tracking-widest transition ${i === active ? "text-white" : "text-transparent group-hover:text-white/60"}`}>
                {f.name}
              </span>
              <span
                className={`block h-3 rounded-full transition-all ${i === active ? "w-8" : "w-3 bg-white/30"}`}
                style={i === active ? { background: `linear-gradient(90deg, ${f.from}, ${f.to})` } : undefined}
              />
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
