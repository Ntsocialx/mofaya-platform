"use client";

import { useEffect, useRef, useState } from "react";
import type { Flavor } from "@/lib/mofayaData";

type Props = {
  flavor: Flavor;
  className?: string;
  priority?: boolean;
};

// Renders the official can cutout. If the remote image can't load, draws a CSS can
// in the flavour's colours instead of showing a broken image.
export default function CanImage({ flavor, className = "", priority = false }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // Reset on source change. An image that errored before hydration (or a deferred one) reports
  // complete with no pixels; re-request it so onError fires for real failures instead of guessing.
  useEffect(() => {
    setFailed(false);
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) img.src = flavor.image;
  }, [flavor.image]);

  if (failed) {
    return (
      <div className={`relative aspect-[1/2.1] ${className}`} role="img" aria-label={`${flavor.name} can`}>
        <div
          className="absolute inset-x-[6%] inset-y-0 rounded-[18%/8%] shadow-2xl"
          style={{ background: `linear-gradient(160deg, ${flavor.from}, ${flavor.to})` }}
        >
          <div className="absolute inset-x-0 top-0 h-[5%] rounded-t-[40%] bg-gradient-to-b from-zinc-200 to-zinc-500" />
          <div className="absolute inset-x-0 bottom-0 h-[4%] rounded-b-[40%] bg-gradient-to-t from-zinc-300 to-zinc-500" />
          <div className="absolute inset-y-[5%] left-[12%] w-[14%] bg-white/25 blur-sm" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-2 text-center">
            <span className="font-display text-[clamp(1rem,3vw,2rem)] uppercase leading-none tracking-wider text-white drop-shadow">
              MoFaya
            </span>
            <span className="text-[clamp(0.55rem,1.2vw,0.8rem)] font-semibold uppercase tracking-widest text-white/85">
              {flavor.name}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote official asset, fallback handled above
    <img
      ref={imgRef}
      src={flavor.image}
      alt={`${flavor.name} — ${flavor.edition} can`}
      className={`object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)] ${className}`}
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setFailed(true)}
      draggable={false}
    />
  );
}
