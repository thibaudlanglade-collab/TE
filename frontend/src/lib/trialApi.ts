// Thin client for the TE-main backend's anonymous trial endpoint.
// `VITE_TRIAL_API_BASE` points at the app's backend (FastAPI). In dev the
// backend listens on localhost:8000; in prod, set it to https://app.synthese.fr
// (the app subdomain) so CORS and cookies line up with the activation flow.

const API_BASE =
  (import.meta.env.VITE_TRIAL_API_BASE as string | undefined)?.replace(/\/$/, "") ??
  "http://localhost:8000";

export interface StartAnonymousTrialResponse {
  token: string;
  /** Fully-qualified URL the browser must navigate to (`<app>/app/<token>`). */
  access_url: string;
}

export async function startAnonymousTrial(): Promise<StartAnonymousTrialResponse> {
  const res = await fetch(`${API_BASE}/api/auth/start-anonymous-trial`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Trial creation failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
