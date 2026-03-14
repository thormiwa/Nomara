import type { VisaGuide, VisaCheckResponse } from "./types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function checkVisa(
  passport: string,
  destination: string
): Promise<VisaGuide> {
  const params = new URLSearchParams({ passport, destination });
  const res = await fetch(`${API_URL}/visa-check?${params}`);
  const json: VisaCheckResponse = await res.json();

  if (!res.ok || json.status === "error") {
    const detail = (json as { detail?: { message?: string } }).detail;
    throw new Error(
      detail?.message ?? json.message ?? "Unable to retrieve visa information."
    );
  }

  if (!json.data) throw new Error("No visa data returned.");
  return json.data;
}
