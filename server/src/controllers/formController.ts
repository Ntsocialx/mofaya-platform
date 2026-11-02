import type { Request, Response } from "express";

type Application = {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  institution: string;
  faculty: string;
  studyYear: string;
  studentNumber: string;
  portfolioUrl: string;
};

// Application field -> env var holding its Google Form `entry.{FIELD_ID}` key.
const ENTRY_ENV: Record<keyof Application, string> = {
  firstName: "GOOGLE_FORM_ENTRY_FIRST_NAME",
  surname: "GOOGLE_FORM_ENTRY_SURNAME",
  email: "GOOGLE_FORM_ENTRY_EMAIL",
  phone: "GOOGLE_FORM_ENTRY_PHONE",
  institution: "GOOGLE_FORM_ENTRY_INSTITUTION",
  faculty: "GOOGLE_FORM_ENTRY_FACULTY",
  studyYear: "GOOGLE_FORM_ENTRY_STUDY_YEAR",
  studentNumber: "GOOGLE_FORM_ENTRY_STUDENT_NUMBER",
  portfolioUrl: "GOOGLE_FORM_ENTRY_PORTFOLIO_URL",
};

const FIELDS = Object.keys(ENTRY_ENV) as (keyof Application)[];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s-]{9,15}$/;
const STUDENT_NO_RE = /^[A-Za-z0-9-]{5,15}$/;

function clean(value: unknown, max = 300): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

export function validate(body: Record<string, unknown>) {
  const data = Object.fromEntries(FIELDS.map((k) => [k, clean(body[k])])) as Application;
  const errors: Partial<Record<keyof Application | "consent", string>> = {};

  for (const field of FIELDS) {
    if (!data[field]) errors[field] = "Required";
  }
  if (data.email && !EMAIL_RE.test(data.email)) errors.email = "Enter a valid email";
  if (data.phone && !PHONE_RE.test(data.phone)) errors.phone = "Enter a valid phone number";
  if (data.studentNumber && !STUDENT_NO_RE.test(data.studentNumber)) errors.studentNumber = "Enter a valid student number";
  if (data.portfolioUrl && !isHttpUrl(data.portfolioUrl)) errors.portfolioUrl = "Enter a full link starting with https://";
  if (body.consent !== true) errors.consent = "Consent is required";

  return { data, errors, valid: Object.keys(errors).length === 0 };
}

async function forwardToGoogleForm(data: Application): Promise<boolean> {
  const actionUrl = process.env.GOOGLE_FORM_ACTION_URL;
  if (!actionUrl) return false;

  const params = new URLSearchParams();
  for (const field of FIELDS) {
    const entryKey = process.env[ENTRY_ENV[field]];
    if (entryKey) params.append(entryKey, data[field]);
  }

  const res = await fetch(actionUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
    redirect: "manual",
    signal: AbortSignal.timeout(10_000),
  });
  // Google answers a good submission with 200 or a redirect to its confirmation page.
  if (res.status >= 400) throw new Error(`Google Form responded ${res.status}`);
  return true;
}

export async function submitApplication(req: Request, res: Response) {
  const { data, errors, valid } = validate(req.body ?? {});
  if (!valid) {
    res.status(422).json({ ok: false, errors });
    return;
  }

  try {
    const forwarded = await forwardToGoogleForm(data);
    if (!forwarded) console.log("[recruitment] Google Form not configured; application:", data);
    res.status(201).json({ ok: true, forwarded });
  } catch (err) {
    console.error("[recruitment] forward failed:", err);
    res.status(502).json({ ok: false, message: "Could not submit your application. Please try again." });
  }
}
