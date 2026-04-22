// Cookie-backed 14-day trial state. No backend, no email — the cookie IS the trial.
// If the visitor clears cookies or switches browser, the trial is lost (acceptable trade-off).

const COOKIE_NAME = "synthese_trial";
const TRIAL_DAYS = 14;
const DAY_MS = 86_400_000;

export interface TrialState {
  id: string;
  startedAt: number; // ms since epoch
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * DAY_MS).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getTrial(): TrialState | null {
  const raw = readCookie(COOKIE_NAME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as TrialState;
    if (!parsed?.id || typeof parsed.startedAt !== "number") return null;
    if (Date.now() - parsed.startedAt > TRIAL_DAYS * DAY_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function startTrial(): TrialState {
  const id =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
  const state: TrialState = { id, startedAt: Date.now() };
  writeCookie(COOKIE_NAME, JSON.stringify(state), TRIAL_DAYS);
  return state;
}

export function getOrStartTrial(): TrialState {
  return getTrial() ?? startTrial();
}

export function daysRemaining(trial: TrialState): number {
  const elapsed = Date.now() - trial.startedAt;
  return Math.max(0, Math.ceil((TRIAL_DAYS * DAY_MS - elapsed) / DAY_MS));
}
