"use server";

export type LeadState = { ok: boolean; message: string } | null;

const MAX = 4000;

function field(data: FormData, key: string) {
  const v = data.get(key);
  return typeof v === "string" ? v.trim().slice(0, MAX) : "";
}

/**
 * Receives contact / discovery / Qohort application forms.
 * Pages stay statically generated — only this action runs on the server.
 * Set LEAD_WEBHOOK_URL to forward submissions (Slack, Google Apps Script, Make, n8n, ...).
 */
export async function submitLead(_prev: LeadState, data: FormData): Promise<LeadState> {
  // Honeypot: real users never fill this hidden field.
  if (field(data, "website")) return { ok: true, message: "Thanks — we'll be in touch." };

  const lead = {
    kind: field(data, "kind") || "contact",
    name: field(data, "name"),
    email: field(data, "email"),
    organisation: field(data, "organisation"),
    role: field(data, "role"),
    interest: field(data, "interest"),
    message: field(data, "message"),
    source: field(data, "source"),
    submittedAt: new Date().toISOString(),
  };

  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return { ok: false, message: "Please add your name and a valid email address." };
  }
  if (!lead.message && lead.kind !== "apply") {
    return { ok: false, message: "Please tell us a little about what you need." };
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.info("[lead] LEAD_WEBHOOK_URL not set; submission:", lead);
    return { ok: true, message: "Thanks — we'll get back to you within two working days." };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: `New ${lead.kind} lead from ${lead.name} <${lead.email}>`, ...lead }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[lead] forwarding failed", err);
    return {
      ok: false,
      message: "Something went wrong sending your message. Please email hello@qollabra.com instead.",
    };
  }

  return { ok: true, message: "Thanks — we'll get back to you within two working days." };
}
