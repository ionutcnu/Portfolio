"use client";

import { FormEvent, ReactNode, useEffect, useId, useRef, useState } from "react";
import Script from "next/script";
import { X } from "lucide-react";

interface Turnstile {
  render(container: HTMLElement, options: {
    sitekey: string; action: string; theme: "auto"; size: "flexible" | "compact";
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": () => void;
  }): string;
  remove(id: string): void;
  reset(id: string): void;
}

declare global { interface Window { turnstile?: Turnstile } }

const fieldClass = "w-full rounded-lg border border-border bg-secondary/30 px-3 py-2.5 text-base text-foreground placeholder:text-foreground/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dynamic";

/** Render a contact trigger and modal with runtime configuration and Turnstile verification. */
export default function ContactDialog({ children, className }: { children: ReactNode; className?: string }) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const challenge = useRef<HTMLDivElement>(null);
  const widget = useRef<string>();
  const inFlight = useRef(false);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [siteKey, setSiteKey] = useState("");
  const [configLoading, setConfigLoading] = useState(false);
  const [configError, setConfigError] = useState(false);
  const [compact, setCompact] = useState(false);
  const [token, setToken] = useState("");
  const [verificationError, setVerificationError] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const media = window.matchMedia("(max-width: 365px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const element = dialog.current!;
    const opener = trigger.current;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => controller.abort(), 10_000);
    /** Load the public widget key, ignoring results after the dialog closes. */
    async function loadConfig() {
      try {
        const response = await fetch("/api/contact", { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("Contact unavailable");
        const config: { siteKey?: unknown } = await response.json();
        if (typeof config.siteKey !== "string" || !config.siteKey) throw new Error("Contact unavailable");
        if (active) setSiteKey(config.siteKey);
      } catch {
        if (active) setConfigError(true);
      } finally {
        window.clearTimeout(timeout);
        if (active) setConfigLoading(false);
      }
    }
    void loadConfig();
    return () => { active = false; controller.abort(); window.clearTimeout(timeout); };
  }, [open]);

  useEffect(() => {
    if (!open || !ready || !siteKey || !challenge.current || !window.turnstile) return;
    setVerificationError(false);
    const api = window.turnstile;
    widget.current = api.render(challenge.current, {
      sitekey: siteKey, action: "contact", theme: "auto", size: compact ? "compact" : "flexible",
      callback: (value) => { setToken(value); setVerificationError(false); },
      "expired-callback": () => setToken(""),
      "error-callback": () => { setToken(""); setVerificationError(true); },
    });
    return () => {
      if (widget.current !== undefined) api.remove(widget.current);
      widget.current = undefined;
      setToken("");
    };
  }, [open, ready, compact, siteKey]);

  /** Send one verified submission at a time and reset the single-use challenge afterward. */
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || !token) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    inFlight.current = true;
    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fields.get("name"), email: fields.get("email"), message: fields.get("message"), token }),
      });
      if (!response.ok) throw new Error("Contact request failed");
      const result: { success?: boolean } = await response.json();
      if (result.success !== true) throw new Error("Contact request failed");
      form.reset();
      setStatus("Thanks! Your message has been sent.");
    } catch {
      setStatus("Your message could not be sent. Please try again later.");
    } finally {
      inFlight.current = false;
      setSending(false);
      setToken("");
      if (widget.current !== undefined) window.turnstile?.reset(widget.current);
    }
  }

  return <>
    <button ref={trigger} type="button" className={className} aria-haspopup="dialog" aria-controls={id}
      onClick={() => { setStatus(""); setSiteKey(""); setToken(""); setConfigError(false); setVerificationError(false); setConfigLoading(true); setOpen(true); }}>{children}</button>
    <dialog ref={dialog} id={id} aria-labelledby={id + "-title"} aria-describedby={id + "-description"}
      onClose={() => setOpen(false)}
      className="m-auto max-h-[calc(100dvh-24px)] w-[calc(100%-24px)] max-w-[580px] overscroll-contain overflow-y-auto rounded-2xl border border-border bg-background p-5 text-foreground shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm sm:max-h-[calc(100dvh-40px)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div><p className="mb-3 text-xs uppercase tracking-widest text-accent-dynamic">Get in touch</p>
          <h2 id={id + "-title"} className="text-2xl font-semibold">Let&apos;s connect.</h2></div>
        <button type="button" aria-label="Close contact form" onClick={() => dialog.current?.close()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-dynamic"><X size={20} /></button>
      </div>
      <p id={id + "-description"} className="mb-6 mt-3 text-sm leading-relaxed text-foreground/70">Have a project in mind, a role to discuss, or just want to say hello? Leave me a message.</p>
      <form onSubmit={submit} aria-busy={sending}>
        <fieldset disabled={sending} className="space-y-4 disabled:opacity-70">
          <legend className="sr-only">Your contact details and message</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label htmlFor={id + "-name"} className="mb-2 block text-sm">Name</label>
              <input id={id + "-name"} name="name" autoComplete="name" required maxLength={100} placeholder="Your name" className={fieldClass} /></div>
            <div><label htmlFor={id + "-email"} className="mb-2 block text-sm">Email</label>
              <input id={id + "-email"} name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className={fieldClass} /></div>
          </div>
          <div><label htmlFor={id + "-message"} className="mb-2 block text-sm">Message</label>
            <textarea id={id + "-message"} name="message" required maxLength={5000} rows={5} placeholder="Tell me a little about what you have in mind…" className={fieldClass + " min-h-36 resize-y"} /></div>
        </fieldset>
        {open && siteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={() => setReady(true)} onError={() => setVerificationError(true)} />}
        <div ref={challenge} className="my-4 min-w-0" />
        {configLoading && <p role="status" className="mb-4 text-sm text-foreground/80">Loading verification…</p>}
        {(configError || verificationError) && <p role="status" className="mb-4 text-sm text-foreground/80">Verification is unavailable. Please reload the page and try again later.</p>}
        <button type="submit" disabled={sending || !token} className="min-h-11 w-full rounded-lg bg-accent-dynamic px-4 py-3 text-sm font-semibold text-[#1e1e2e] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dynamic">{sending ? "Sending…" : "Send message ↗"}</button>
        <p className="mt-3 text-center text-xs text-foreground/65">Your email is only used to reply.</p>
        <p role="status" aria-live="polite" className="mt-3 text-sm text-accent-dynamic">{status}</p>
      </form>
    </dialog>
  </>;
}
