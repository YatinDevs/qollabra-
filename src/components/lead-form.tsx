"use client";

import { useActionState } from "react";
import { submitLead, type LeadState } from "@/app/actions/lead";

type Option = { value: string; label: string };

export function LeadForm({
  kind,
  source,
  interestLabel = "What are you interested in?",
  interests,
  organisationLabel = "Company",
  roleLabel,
  messageLabel = "What are you trying to achieve?",
  messageRequired = true,
  submitLabel = "Send",
  dark = false,
}: {
  kind: "contact" | "discovery" | "apply" | "seminar";
  source: string;
  interestLabel?: string;
  interests?: Option[];
  organisationLabel?: string;
  roleLabel?: string;
  messageLabel?: string;
  messageRequired?: boolean;
  submitLabel?: string;
  dark?: boolean;
}) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, null);

  const input = dark
    ? "w-full rounded-lg border border-q-line bg-q-bg px-3 py-2.5 text-q-text placeholder:text-q-muted focus:border-brand focus:outline-none"
    : "w-full rounded-lg border border-line bg-white px-3 py-2.5 placeholder:text-muted/70 focus:border-charcoal focus:outline-none";
  const label = `mb-1.5 block text-sm font-medium ${dark ? "text-q-text" : ""}`;

  if (state?.ok) {
    return (
      <p role="status" className={`rounded-xl p-6 ${dark ? "bg-q-panel text-q-text" : "bg-brand-soft"}`}>
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="source" value={source} />
      <div className="hidden" aria-hidden>
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className={label}>Name</label>
        <input id="name" name="name" required autoComplete="name" className={input} />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={input} />
      </div>
      <div>
        <label htmlFor="organisation" className={label}>{organisationLabel}</label>
        <input id="organisation" name="organisation" autoComplete="organization" className={input} />
      </div>
      {roleLabel ? (
        <div>
          <label htmlFor="role" className={label}>{roleLabel}</label>
          <input id="role" name="role" className={input} />
        </div>
      ) : (
        <div />
      )}
      {interests && (
        <div className="sm:col-span-2">
          <label htmlFor="interest" className={label}>{interestLabel}</label>
          <select id="interest" name="interest" className={input} defaultValue="">
            <option value="" disabled>Select one</option>
            {interests.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      )}
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>{messageLabel}</label>
        <textarea id="message" name="message" rows={5} required={messageRequired} className={input} />
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 ${
            dark ? "bg-brand font-mono text-q-bg hover:bg-white" : "bg-ink text-white hover:bg-charcoal"
          }`}
        >
          {pending ? "Sending…" : submitLabel}
        </button>
        {state && !state.ok && (
          <p role="alert" className="text-sm text-red-600">{state.message}</p>
        )}
      </div>
    </form>
  );
}
