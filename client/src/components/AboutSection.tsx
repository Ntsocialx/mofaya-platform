"use client";

import { useState } from "react";
import { DJ_SBU } from "@/lib/mofayaData";

const PEOPLE = [
  {
    name: "Tyrone Marhungani",
    role: "Founder, Campus Marketer initiative",
    body: "Tyrone drives the vision behind this programme: opening real brand-marketing opportunities to students at universities across South Africa, with campus leaders at the centre of MoFaya's growth.",
  },
  {
    name: "Tiyani Nkuna",
    role: "Lead Systems Developer",
    body: "Tiyani architected and built this recruitment platform, from the flavour showcase to the application pipeline that delivers your details to the MoFaya team.",
  },
];

// Official photos already come cut into MoFaya's skewed rounded-card shape.
function Photo({ src, alt, width, height, className = "" }: { src: string; alt: string; width: number; height: number; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- official photo from mofaya.co.za
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={`h-auto drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)] ${className}`}
      onError={() => setFailed(true)}
    />
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-16 overflow-hidden bg-ash text-obsidian">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          {/* Collage: DJ set shot with the portrait overlapping its lower corner */}
          <div className="relative pb-[18%] sm:pb-[22%]">
            <Photo src={DJ_SBU.action} alt="DJ Sbu on the decks, holding up a MoFaya can" width={1920} height={1463} className="w-[88%]" />
            <Photo
              src={DJ_SBU.portrait}
              alt="Portrait of DJ Sbu, MoFaya co-founder"
              width={616}
              height={642}
              className="absolute bottom-0 right-0 w-[42%]"
            />
          </div>

          <div>
            <h2 className="display-xl text-[clamp(2.5rem,5vw,4.25rem)]">
              The original
              <br />
              <span className="brush text-[1.1em] text-ember">Faya Starter</span>
            </h2>
            <p className="mt-3 text-lg font-bold">Sbusiso Leope (DJ Sbu), co-founder and the face of MoFaya</p>

            <blockquote cite={DJ_SBU.source} className="mt-8 border-l-4 border-ember pl-6">
              <p className="text-[clamp(1.2rem,2vw,1.5rem)] font-semibold leading-snug">{DJ_SBU.pull}</p>
              <p className="mt-4 max-w-[60ch] text-obsidian/70">{DJ_SBU.bio}</p>
              <footer className="mt-4 text-sm text-obsidian/60">
                From{" "}
                <a href={DJ_SBU.source} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4 hover:text-ember">
                  mofaya.co.za/collabs
                </a>
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="mt-24">
          <h3 className="display-xl text-[clamp(2rem,4vw,3.25rem)]">
            The team behind <span className="brush text-[1.1em] text-ember">the programme</span>
          </h3>
          <div className="mt-10 grid gap-x-16 border-t-2 border-obsidian md:grid-cols-2">
            {PEOPLE.map((p) => (
              <article key={p.name} className="border-b border-obsidian/20 py-8 md:border-b-0">
                <h4 className="text-2xl font-black uppercase sm:text-3xl">{p.name}</h4>
                <p className="mt-1 font-bold text-[#A10000]">{p.role}</p>
                <p className="mt-4 max-w-[52ch] text-obsidian/75">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
