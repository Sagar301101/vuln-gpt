export type DemoRequestPayload = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message?: string;
};

const DEFAULT_ENDPOINT = "https://sheetdb.io/api/v1/tatgcvt7a7u45";

/**
 * Sends a demo request to the SheetDB-backed Google Sheet. Endpoint is
 * overridable via VITE_DEMO_SHEET_ENDPOINT, but defaults to the shared
 * VulnShields demo-requests sheet.
 */
export async function submitDemoRequest(payload: DemoRequestPayload): Promise<void> {
  const endpoint = import.meta.env.VITE_DEMO_SHEET_ENDPOINT || DEFAULT_ENDPOINT;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        Name: payload.name,
        Email: payload.email,
        "Phone Number": payload.phone,
        "Company ": payload.company,
        "What you need": payload.message ?? "",
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Demo request failed with status ${res.status}`);
  }
}
