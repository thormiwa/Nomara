"use client";

import { useState } from "react";

// ─── Waitlist form ────────────────────────────────────────────────────────────

const PASSPORT_OPTIONS = [
  "Ghanaian", "Kenyan", "South African", "Zimbabwean", "Tanzanian",
  "Ethiopian", "Ugandan", "Cameroonian", "Rwandan", "Egyptian",
  "Senegalese", "Ivorian", "Other",
];

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [passport, setPassport] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // TODO: wire to Supabase waitlist table or email service
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="flex items-start gap-3 p-5 border border-accent/40 bg-accent-light">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
          <circle cx="9" cy="9" r="9" fill="#C09A6B" />
          <path d="M5 9l3 3 5-5" stroke="#F8F5F0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <p className="font-sans font-semibold text-sm text-ink">You&apos;re on the list.</p>
          <p className="font-sans text-sm text-stone mt-0.5">
            We&apos;ll email you the moment your passport is supported.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-stone/40 focus:border-ink transition-colors duration-150 font-sans text-sm text-ink placeholder:text-stone/50 px-4 py-3 bg-cream"
      />
      <select
        value={passport}
        onChange={(e) => setPassport(e.target.value)}
        className="border border-stone/40 focus:border-ink transition-colors duration-150 font-sans text-sm text-ink px-4 py-3 bg-cream appearance-none cursor-pointer"
      >
        <option value="">My passport is… (optional)</option>
        {PASSPORT_OPTIONS.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <button
        type="submit"
        disabled={loading || !email}
        className="font-sans font-semibold text-sm tracking-wide bg-ink text-cream px-6 py-3.5 transition-opacity duration-150 hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "Saving…" : "Notify me when it's ready"}
      </button>
    </form>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface LandingHeroProps {
  onStart: () => void;
}

export default function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <div className="fade-up">

      {/* ════════════════════════════════════════════════════════════
          1. HERO — full-width, two-column on desktop
      ════════════════════════════════════════════════════════════ */}
      <section className="min-h-[calc(100vh-60px)] grid grid-cols-1 lg:grid-cols-2">

        {/* Left — headline + CTA */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-20 py-16 lg:border-r border-parchment">

          {/* Passport badge */}
          <div className="inline-flex items-center gap-2 self-start mb-8 border border-parchment px-3 py-1.5">
            <span className="text-base leading-none" aria-hidden="true">🇳🇬</span>
            <span className="font-sans text-xs font-medium text-ink tracking-wide">Nigerian passport · Free</span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif font-black text-ink leading-[1.02] mb-5"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)" }}
          >
            Where can your<br />
            <span className="text-accent italic">passport</span> take you?
          </h1>

          <p className="font-sans text-base md:text-lg text-ink-muted leading-relaxed max-w-md mb-10">
            Visa requirements for Nigerian travelers — simplified.
            Know what you need, how to apply, and how long it takes.{" "}
            <strong className="text-ink font-semibold">Before you book a flight.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
            <button
              onClick={onStart}
              className="group flex items-center gap-3 bg-ink text-cream font-sans font-semibold text-sm tracking-wide px-8 py-4 transition-all duration-200 hover:bg-ink-muted active:scale-[0.98]"
            >
              Check visa requirements
              <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true">→</span>
            </button>
            <p className="font-sans text-xs text-stone">No account needed</p>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-x-6 gap-y-2.5">
            {[
              { icon: "⚡", text: "Instant results" },
              { icon: "📋", text: "Step-by-step guides" },
              { icon: "🔗", text: "Official source links" },
              { icon: "🔄", text: "Regularly verified" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <span className="text-sm" aria-hidden="true">{icon}</span>
                <span className="font-sans text-xs text-stone">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — destination grid (desktop only shows this visually) */}
        <div className="bg-parchment flex flex-col justify-center px-6 md:px-12 lg:px-14 xl:px-16 py-12 lg:py-16">
          <p className="font-sans text-xs font-medium tracking-[0.25em] uppercase text-stone mb-6">
            24 destinations covered
          </p>

          {/* Visa type breakdown */}
          <div className="space-y-0 border border-stone/20 mb-8">
            {[
              { label: "Visa-free",        count: 5,  examples: "Ghana · Seychelles · Senegal",     dot: "bg-accent" },
              { label: "Visa on arrival",  count: 5,  examples: "UAE · Maldives · Qatar",            dot: "bg-stone" },
              { label: "eVisa",            count: 4,  examples: "Kenya · Egypt · Vietnam",           dot: "bg-ink-muted" },
              { label: "Embassy visa",     count: 10, examples: "UK · Canada · USA · Japan",         dot: "bg-ink" },
            ].map(({ label, count, examples, dot }, i) => (
              <div
                key={label}
                className="flex items-center gap-4 px-5 py-4 border-b border-stone/10 last:border-0 hover:bg-cream/40 transition-colors duration-150 cursor-default"
              >
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dot}`} aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-semibold text-sm text-ink">{label}</p>
                  <p className="font-sans text-xs text-stone truncate mt-0.5">{examples}</p>
                </div>
                <span className="font-serif font-black text-2xl text-ink shrink-0">{count}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onStart}
            className="group flex items-center gap-2 font-sans text-sm text-stone hover:text-ink transition-colors duration-150"
          >
            <span>Browse all destinations</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          2. HOW IT WORKS — full-width, parchment background
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment border-t border-b border-stone/10 px-6 md:px-12 lg:px-16 xl:px-20 py-16">
        <p className="font-sans text-xs font-medium tracking-[0.25em] uppercase text-stone mb-10">
          How it works
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl">
          {[
            { n: "01", emoji: "🇳🇬", title: "Select your passport", body: "Nigerian passport is live now. More countries coming very soon." },
            { n: "02", emoji: "🔍", title: "Search a destination", body: "Type a country, city, or region. We cover 24 destinations across 5 continents." },
            { n: "03", emoji: "✅", title: "Get the full picture", body: "Visa type, documents needed, step-by-step application guide, and direct links to official sources." },
          ].map(({ n, emoji, title, body }) => (
            <div key={n} className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <span className="text-4xl leading-none">{emoji}</span>
                <span className="font-sans text-xs font-medium text-stone/40 tracking-widest2">{n}</span>
              </div>
              <p className="font-serif font-bold text-xl text-ink leading-tight">{title}</p>
              <p className="font-sans text-sm text-stone leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          3. WAITLIST — full-width, two-column on desktop
      ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-parchment grid grid-cols-1 lg:grid-cols-2">
        {/* Left — copy */}
        <div className="px-6 md:px-12 lg:px-16 xl:px-20 py-16 lg:border-r border-parchment">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="font-sans text-xs font-medium tracking-[0.25em] uppercase text-stone">
              Coming soon
            </span>
            <span className="h-px w-8 bg-parchment" />
          </div>
          <h2
            className="font-serif font-bold text-ink leading-tight mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            Travelling with a<br />different passport?
          </h2>
          <p className="font-sans text-base text-stone leading-relaxed max-w-sm">
            We&apos;re expanding to Ghana, Kenya, South Africa, and beyond.
            Be the first to know when your country goes live.
          </p>
        </div>

        {/* Right — form */}
        <div className="flex items-center px-6 md:px-12 lg:px-16 xl:px-20 py-16">
          <div className="w-full max-w-sm">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          4. FOOTER DISCLAIMER
      ════════════════════════════════════════════════════════════ */}
      <div className="px-6 md:px-12 lg:px-16 xl:px-20 py-6">
        <p className="font-sans text-xs text-stone italic leading-relaxed max-w-2xl">
          Visa information is advisory only. Always confirm requirements with official
          embassy sources before travelling.
        </p>
      </div>
    </div>
  );
}
