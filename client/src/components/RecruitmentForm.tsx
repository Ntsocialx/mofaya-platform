"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { STUDY_YEARS, UNIVERSITIES } from "@/lib/mofayaData";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Record<string, string>;

const PERKS = [
  { title: "Campus activations", text: "Run campus events, sampling drives and pop-ups." },
  { title: "Real experience", text: "Brand strategy, content and sales on your CV." },
  { title: "Build your network", text: "Work directly with the MoFaya brand team." },
];

type FieldProps = {
  name: string;
  label: string;
  errors: Errors;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Field({ name, label, errors, className = "", ...input }: FieldProps) {
  const error = errors[name];
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label} <span className="text-flame">*</span>
      </label>
      <input
        id={name}
        name={name}
        required
        className="field"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        {...input}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({ name, label, options, errors }: { name: string; label: string; options: string[]; errors: Errors }) {
  const error = errors[name];
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label} <span className="text-flame">*</span>
      </label>
      <select
        id={name}
        name={name}
        required
        defaultValue=""
        className="field"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-obsidian">
            {o}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default function RecruitmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, unknown> = Object.fromEntries(fd.entries());
    payload.consent = fd.get("consent") === "on";

    setStatus("submitting");
    setErrors({});
    try {
      const res = await fetch(`${API_URL}/api/recruitment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        form.reset();
        setStatus("success");
        return;
      }
      setErrors(body.errors ?? {});
      setMessage(body.message ?? "Please fix the highlighted fields.");
      setStatus("error");
    } catch {
      setMessage("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section id="join" className="relative isolate scroll-mt-16 overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div aria-hidden className="brush-wallpaper absolute inset-0 -z-10 scale-x-[-1]" />
      <div aria-hidden className="absolute bottom-0 left-1/2 -z-20 h-[60vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-ember/20 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="display-xl text-[clamp(2.5rem,5.5vw,4.5rem)]">
            Carry the <span className="brush text-[1.15em]">Faya</span>
            <br />
            on your campus
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/75">
            We&apos;re recruiting driven students to become MoFaya Campus Marketers. Bring the energy, we&apos;ll bring the fuel.
          </p>
          <ul className="mt-10 divide-y divide-white/15 border-y border-white/15">
            {PERKS.map((perk) => (
              <li key={perk.title} className="py-5">
                <p className="font-extrabold uppercase tracking-[0.04em]">{perk.title}</p>
                <p className="mt-1 text-white/65">{perk.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl border-orange-600/30 p-6 sm:p-10">
          {status === "success" ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status">
              <p className="text-5xl" aria-hidden>
                🔥
              </p>
              <h3 className="display-xl mt-4 text-4xl">You&apos;re in the running!</h3>
              <p className="mt-3 max-w-sm text-white/70">
                Thanks for applying. The MoFaya team will review your application and contact you by email.
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="btn-outline mt-8">
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label="Campus Marketer application" className="grid gap-5 sm:grid-cols-2">
              <Field name="firstName" label="Name" autoComplete="given-name" placeholder="Thandi" errors={errors} />
              <Field name="surname" label="Surname" autoComplete="family-name" placeholder="Mokoena" errors={errors} />
              <Field name="email" label="Email" type="email" autoComplete="email" placeholder="you@student.ac.za" errors={errors} />
              <Field name="phone" label="Phone number" type="tel" autoComplete="tel" placeholder="+27 82 123 4567" errors={errors} />
              <SelectField name="institution" label="University / Institution" options={UNIVERSITIES} errors={errors} />
              <Field name="faculty" label="Faculty" placeholder="Economic & Management Sciences" errors={errors} />
              <SelectField name="studyYear" label="Year of study" options={STUDY_YEARS} errors={errors} />
              <Field name="studentNumber" label="Student number" placeholder="220012345" errors={errors} />
              <Field
                name="portfolioUrl"
                label="CV / Portfolio link"
                type="url"
                inputMode="url"
                placeholder="https://drive.google.com/…"
                errors={errors}
                className="sm:col-span-2"
              />

              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm text-white/70">
                  <input
                    type="checkbox"
                    name="consent"
                    className="mt-0.5 h-4 w-4 shrink-0 accent-flame"
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? "consent-error" : undefined}
                  />
                  <span>
                    I consent to MoFaya processing my personal information for this recruitment programme, in line with POPIA.{" "}
                    <span className="text-flame">*</span>
                  </span>
                </label>
                {errors.consent && (
                  <p id="consent-error" className="mt-1.5 text-xs text-red-400">
                    {errors.consent}
                  </p>
                )}
              </div>

              {status === "error" && (
                <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300 sm:col-span-2">
                  {message}
                </p>
              )}

              <button type="submit" disabled={status === "submitting"} className="btn-flame disabled:cursor-wait disabled:opacity-60 sm:col-span-2">
                {status === "submitting" ? "Sending…" : "Submit application"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
