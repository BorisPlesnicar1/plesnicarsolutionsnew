"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { TRANSLATIONS, type Lang } from "@/app/translations";

type ContactFormProps = {
  lang: Lang;
};

export function ContactForm({ lang }: ContactFormProps) {
  const t = TRANSLATIONS[lang].kontaktForm;
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const hp = fd.get("company");
    if (hp) return;
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setErrorMessage(t.errorValidation);
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, lang }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string; errorCode?: string };
      if (!res.ok || !data.success) {
        if (data.errorCode === "NO_MAIL_CONFIG") setErrorMessage(t.errorConfig);
        else setErrorMessage(data.error ?? t.errorGeneric);
        setStatus("error");
        return;
      }
      router.push(lang === "en" ? "/kontakt/danke?lang=en" : "/kontakt/danke");
    } catch {
      setErrorMessage(t.errorGeneric);
      setStatus("error");
    }
  }

  return (
    <div className="p-5 md:p-6 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl border-[#ff1900]/20">
      <h3 className="text-white font-bold text-base mb-1">{t.title}</h3>
      <p className="text-white/45 text-sm mb-5 font-light">{t.hint}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="company" autoComplete="off" tabIndex={-1} className="sr-only" aria-hidden />
        <div>
          <label htmlFor="cf-name" className="block text-xs font-medium text-white/50 mb-1.5">
            {t.name}
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900] focus-visible:border-transparent"
            placeholder={t.namePh}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-xs font-medium text-white/50 mb-1.5">
            {t.email}
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900] focus-visible:border-transparent"
            placeholder={t.emailPh}
          />
        </div>
        <div>
          <label htmlFor="cf-message" className="block text-xs font-medium text-white/50 mb-1.5">
            {t.message}
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            className="w-full resize-y min-h-[120px] rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900] focus-visible:border-transparent"
            placeholder={t.messagePh}
          />
        </div>
        {status === "error" && errorMessage ? (
          <p className="text-sm text-[#ff6b6b] font-light" role="alert">
            {errorMessage}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl bg-gradient-to-r from-[#ff1900] to-[#ff2d00] text-white text-sm font-bold shadow-lg shadow-[#ff1900]/25 hover:from-[#e61700] hover:to-[#ff1900] disabled:opacity-60 disabled:pointer-events-none transition-opacity"
        >
          {status === "submitting" ? (
            t.sending
          ) : (
            <>
              {t.submit}
              <Send className="w-4 h-4" strokeWidth={2.5} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
