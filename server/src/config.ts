// Central place for environment variables. Works locally (.env), on Render (dashboard env vars)
// and with a Vercel-hosted client.

// Load server/.env when present (local dev). On Render there is no file; vars come from the dashboard.
// Done in code, not via `node --env-file`, so it works on any Node >= 20.12 and never fails if absent.
try {
  process.loadEnvFile();
} catch {
  // No .env file — expected in production.
}

const isProduction = process.env.NODE_ENV === "production";

function list(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((v) => v.trim().replace(/\/+$/, ""))
    .filter(Boolean);
}

// Frontend URL(s) allowed to call this API, e.g. your Vercel domain. Comma-separate several.
const publicUrls = list(process.env.NEXT_PUBLIC_URL);
const allowedOrigins = publicUrls.length ? publicUrls : ["http://localhost:3000"];

// Optional: also allow this project's Vercel preview deployments
// (https://<project>-<hash>-<team>.vercel.app). Scoped to the project name, not all of vercel.app.
const vercelProject = process.env.VERCEL_PROJECT_NAME?.trim();
const vercelPreview = vercelProject
  ? new RegExp(`^https://${vercelProject.replace(/[^a-z0-9-]/gi, "")}(-[a-z0-9-]+)?\\.vercel\\.app$`, "i")
  : null;

export const config = {
  isProduction,
  // Render injects PORT; 4000 for local development.
  port: Number(process.env.PORT ?? 4000),
  allowedOrigins,
  jwtSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
};

export function isAllowedOrigin(origin: string): boolean {
  return allowedOrigins.includes(origin) || Boolean(vercelPreview?.test(origin));
}

// Warn rather than crash, so the API still serves the form while secrets are being set up.
export function reportMissingConfig() {
  const missing: string[] = [];
  if (!publicUrls.length) missing.push("NEXT_PUBLIC_URL (defaulting to http://localhost:3000)");
  if (!config.jwtSecret) missing.push("JWT_SECRET");
  else if (config.jwtSecret.length < 32) missing.push("JWT_SECRET (should be at least 32 characters)");
  if (!config.databaseUrl) missing.push("DATABASE_URL");
  else if (!/sslmode=require/.test(config.databaseUrl)) missing.push("DATABASE_URL (Neon needs ?sslmode=require)");

  if (missing.length) {
    const log = isProduction ? console.error : console.warn;
    log(`[config] Missing or invalid env vars:\n  - ${missing.join("\n  - ")}`);
  }
}
