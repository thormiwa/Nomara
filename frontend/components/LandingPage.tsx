"use client";

import { useState, useRef, useEffect } from "react";
import Logo from "@/components/Logo";
import { searchDestinations, type Destination } from "@/lib/destinations";
import { checkVisa } from "@/lib/api";
import type { VisaGuide } from "@/lib/types";

// ─── Search bar ───────────────────────────────────────────────────────────────
// Used on orange hero (dark styling) and cream footer (light styling)

function SearchBar({
  onResult, id, onOrange = false,
}: {
  onResult: (g: VisaGuide) => void;
  id: string;
  onOrange?: boolean;
}) {
  const [query, setQuery]       = useState("");
  const [results, setResults]   = useState<Destination[]>([]);
  const [selected, setSelected] = useState<Destination | null>(null);
  const [open, setOpen]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef     = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selected) return;
    const found = searchDestinations(query);
    setResults(found);
    setOpen(found.length > 0 && query.length > 0);
  }, [query, selected]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) { setError("Pick a destination first."); inputRef.current?.focus(); return; }
    setLoading(true); setError(null);
    try { onResult(await checkVisa("NG", selected.code)); }
    catch (err) { setError(err instanceof Error ? err.message : "Something went wrong."); }
    finally { setLoading(false); }
  }

  const wrap = onOrange
    ? "bg-cream shadow-xl shadow-black/10 border-0"
    : "bg-cream border border-surface shadow-sm";
  const dropBg = "bg-cream border border-surface";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex flex-col sm:flex-row focus-within:ring-2 focus-within:ring-accent/30 transition-all duration-200 ${wrap}`}>

        {/* Passport locked to NG */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b sm:border-b-0 sm:border-r border-surface shrink-0">
          <span className="text-xl leading-none">🇳🇬</span>
          <span className="font-sans text-sm font-semibold text-ink/70">Nigerian passport</span>
          <svg width="9" height="6" viewBox="0 0 9 6" fill="none" className="text-stone shrink-0">
            <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Destination input */}
        <div ref={containerRef} className="relative flex-1">
          <div className="flex items-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                 className="absolute left-4 text-stone pointer-events-none shrink-0">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input ref={inputRef} type="text" id={`${id}-dest`}
              placeholder="Where do you want to go?"
              value={query}
              onChange={(e) => { setSelected(null); setQuery(e.target.value); setError(null); }}
              onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
              onFocus={() => results.length > 0 && setOpen(true)}
              className="w-full bg-transparent pl-10 pr-4 py-3.5 font-sans text-sm text-ink placeholder:text-stone/60"
              autoComplete="off" spellCheck={false}
            />
            {query && (
              <button type="button" onClick={() => { setQuery(""); setSelected(null); setOpen(false); }}
                className="pr-3 text-stone hover:text-ink transition-colors shrink-0">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>

          {open && (
            <ul className={`absolute top-full left-0 right-0 z-50 border-t-0 ${dropBg} shadow-xl max-h-64 overflow-y-auto`}>
              {results.map((dest) => (
                <li key={dest.code} className="border-b border-surface last:border-0">
                  <button type="button"
                    onClick={() => { setSelected(dest); setQuery(dest.name); setOpen(false); setError(null); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-parchment transition-colors duration-100">
                    <span className="text-xl leading-none w-7 shrink-0">{dest.flag}</span>
                    <span className="flex-1 min-w-0">
                      <span className="font-sans font-semibold text-sm text-ink block">{dest.name}</span>
                      <span className="font-sans text-xs text-stone">{dest.region}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA */}
        <button type="submit" disabled={loading}
          className="flex items-center justify-center gap-2 bg-ink text-cream font-sans font-bold text-sm tracking-wide px-7 py-3.5 hover:bg-ink/80 disabled:opacity-40 transition-colors shrink-0">
          {loading
            ? <svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="10"/></svg>
            : <>Check <span aria-hidden="true">→</span></>}
        </button>
      </div>

      {error    && <p className="font-sans text-xs mt-2 text-accent font-semibold pl-1">{error}</p>}
      {selected && !error && <p className="font-sans text-xs mt-2 text-ink/50 pl-1">{selected.flag} {selected.name}</p>}
    </form>
  );
}

// ─── Hero illustration — cream on orange ─────────────────────────────────────

function TravelerIllustration() {
  return (
    <div className="relative w-full max-w-[400px] mx-auto select-none" aria-hidden="true">
      <svg viewBox="0 0 380 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">

        {/* Orbital compass ring */}
        <circle cx="190" cy="230" r="155"
                stroke="white" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 7"/>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return <line key={i}
            x1={190 + 147 * Math.cos(a)} y1={230 + 147 * Math.sin(a)}
            x2={190 + 162 * Math.cos(a)} y2={230 + 162 * Math.sin(a)}
            stroke="white" strokeWidth="1" strokeOpacity="0.25"/>;
        })}

        {/* ── Floating elements ──────────────────────────────── */}

        {/* Passport — top left */}
        <g transform="translate(42, 128) rotate(-8)" className="float-d2">
          <rect width="38" height="52" rx="4" fill="white" fillOpacity="0.9"/>
          <rect x="5" y="7" width="28" height="18" rx="2" fill="#FF4D00" fillOpacity="0.25"/>
          <line x1="5" y1="31" x2="33" y2="31" stroke="#FF4D00" strokeOpacity="0.4" strokeWidth="1"/>
          <line x1="5" y1="37" x2="27" y2="37" stroke="#FF4D00" strokeOpacity="0.3" strokeWidth="1"/>
          <line x1="5" y1="43" x2="30" y2="43" stroke="#FF4D00" strokeOpacity="0.25" strokeWidth="1"/>
          <text x="19" y="20" textAnchor="middle" fill="#FF4D00" fontSize="8"
                fontWeight="800" fontFamily="sans-serif">NG</text>
        </g>

        {/* Small plane — top right */}
        <g className="drift" transform="translate(288, 78)">
          <path d="M0 10 L30 0 L60 10 L30 8Z" fill="white" fillOpacity="0.35"/>
          <path d="M20 10 L13 20 L30 17 L47 20 L40 10Z" fill="white" fillOpacity="0.35"/>
          <path d="M28 17 L26 26 L30 24 L34 26 L32 17Z" fill="white" fillOpacity="0.35"/>
        </g>

        {/* Location pin — bottom right */}
        <g transform="translate(306, 318)" className="float-d1">
          <path d="M13 0C6 0 0 6 0 13C0 22.5 13 35 13 35S26 22.5 26 13C26 6 20 0 13 0Z"
                fill="white" fillOpacity="0.85"/>
          <circle cx="13" cy="13" r="5.5" fill="#FF4D00"/>
        </g>

        {/* Stars */}
        <circle cx="30" cy="72" r="3" fill="white" fillOpacity="0.7" className="pulse-dot"/>
        <circle cx="355" cy="160" r="2.5" fill="white" fillOpacity="0.6" className="pulse-dot-d"/>
        <circle cx="340" cy="398" r="2.5" fill="white" fillOpacity="0.5" className="pulse-dot"/>
        <circle cx="52" cy="370" r="2" fill="white" fillOpacity="0.65" className="pulse-dot-d"/>
        <path d="M354 80 L357 88 L365 91 L357 94 L354 102 L351 94 L343 91 L351 88Z"
              fill="white" fillOpacity="0.6" className="pulse-dot"/>

        {/* ── Suitcase ───────────────────────────────────────── */}
        <g className="float-slow">
          <rect x="62" y="260" width="106" height="126" rx="10" fill="white" fillOpacity="0.92"/>
          <rect x="62" y="260" width="106" height="126" rx="10" stroke="white" strokeWidth="1.5" fillOpacity="0"/>
          <line x1="64" y1="323" x2="166" y2="323" stroke="#FF4D00" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="5 3"/>
          <rect x="107" y="262" width="14" height="122" rx="3" fill="none" stroke="#FF4D00" strokeWidth="1.1" strokeOpacity="0.4"/>
          {/* NG sticker */}
          <rect x="75" y="272" width="24" height="16" rx="8" fill="#FF4D00"/>
          <text x="87" y="284" textAnchor="middle" fill="white" fontSize="7.5"
                fontWeight="800" fontFamily="sans-serif">NG</text>
          {/* LHR sticker */}
          <circle cx="148" cy="290" r="12" fill="#FF4D00" fillOpacity="0.12" stroke="#FF4D00" strokeOpacity="0.3" strokeWidth="1"/>
          <text x="148" y="294" textAnchor="middle" fill="#FF4D00" fontSize="7" fontWeight="700"
                fillOpacity="0.8" fontFamily="sans-serif">LHR</text>
          {/* Handle */}
          <rect x="94" y="192" width="8" height="70" rx="3" fill="none" stroke="white" strokeWidth="1.6" strokeOpacity="0.7"/>
          <rect x="136" y="192" width="8" height="70" rx="3" fill="none" stroke="white" strokeWidth="1.6" strokeOpacity="0.7"/>
          <path d="M92 192 Q119 176 146 192" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.85"/>
          {/* Wheels */}
          <circle cx="82" cy="390" r="8.5" fill="white" fillOpacity="0.9"/>
          <circle cx="82" cy="390" r="3.5" fill="#FF4D00"/>
          <circle cx="158" cy="390" r="8.5" fill="white" fillOpacity="0.9"/>
          <circle cx="158" cy="390" r="3.5" fill="#FF4D00"/>
        </g>

        {/* ── Person ─────────────────────────────────────────── */}
        <g className="float">
          {/* Afro */}
          <ellipse cx="236" cy="110" rx="54" ry="52" fill="#1A0E08"/>
          {/* Head */}
          <ellipse cx="236" cy="124" rx="38" ry="42" fill="#D4884A"/>
          {/* Eyes */}
          <ellipse cx="224" cy="118" rx="4.5" ry="5" fill="#1A0A04"/>
          <ellipse cx="248" cy="118" rx="4.5" ry="5" fill="#1A0A04"/>
          <circle cx="225.5" cy="116.5" r="1.5" fill="white" fillOpacity="0.6"/>
          <circle cx="249.5" cy="116.5" r="1.5" fill="white" fillOpacity="0.6"/>
          {/* Nose */}
          <path d="M233 133 Q236 139 239 133" stroke="#9A4820" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
          {/* Smile */}
          <path d="M226 149 Q236 158 246 149" stroke="#8A3C10" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Earrings — white on orange bg */}
          <circle cx="198" cy="127" r="5" fill="white" fillOpacity="0.9"/>
          <circle cx="274" cy="127" r="5" fill="white" fillOpacity="0.9"/>
          {/* Neck */}
          <rect x="227" y="162" width="18" height="20" fill="#D4884A"/>
          {/* Jacket — white on orange bg */}
          <path d="M196 182 Q210 169 228 166 L244 166 Q262 169 276 182 L282 280 Q260 292 236 292 Q212 292 190 280Z"
                fill="white" fillOpacity="0.95"/>
          {/* Collar */}
          <path d="M228 166 L224 186 L236 195 L248 186 L244 166" fill="#FF4D00" fillOpacity="0.8"/>
          {/* Jacket horizontal detail */}
          <line x1="198" y1="200" x2="280" y2="200" stroke="#FF4D00" strokeOpacity="0.2" strokeWidth="1"/>
          {/* Left arm */}
          <path d="M195 186 Q172 210 160 238 Q152 254 160 262 Q170 267 178 254 Q193 230 210 207Z" fill="#D4884A"/>
          <ellipse cx="162" cy="264" rx="11" ry="9" fill="#D4884A"/>
          {/* Right arm */}
          <path d="M277 186 Q296 210 302 246 Q305 260 297 263 Q288 266 284 252 Q279 226 268 206Z" fill="#D4884A"/>
          {/* Pants */}
          <path d="M208 286 L232 286 L230 378 Q229 390 220 390 Q211 390 209 378Z" fill="#1A2340"/>
          <path d="M264 286 L240 286 L242 378 Q243 390 252 390 Q261 390 263 378Z" fill="#1A2340"/>
          {/* Shoes */}
          <ellipse cx="215" cy="396" rx="20" ry="9" fill="#0F0D0A"/>
          <ellipse cx="257" cy="396" rx="20" ry="9" fill="#0F0D0A"/>
        </g>

        {/* Ground shadow */}
        <ellipse cx="200" cy="418" rx="125" ry="11" fill="#0F0D0A" fillOpacity="0.12"/>

      </svg>
    </div>
  );
}

// ─── Destination grid data ────────────────────────────────────────────────────

const VISA_BADGE: Record<string, string> = {
  "visa-free":       "bg-accent text-cream",
  evisa:             "bg-parchment text-ink-muted border border-surface",
  "visa-on-arrival": "bg-parchment text-ink-muted border border-surface",
  "embassy-visa":    "bg-ink text-cream",
};
const VISA_LABEL: Record<string, string> = {
  "visa-free": "Visa-free", evisa: "eVisa",
  "visa-on-arrival": "On arrival", "embassy-visa": "Embassy visa",
};
const DESTINATIONS_PREVIEW = [
  { flag: "🇬🇭", name: "Ghana",       type: "visa-free"       },
  { flag: "🇸🇨", name: "Seychelles",  type: "visa-free"       },
  { flag: "🇸🇳", name: "Senegal",     type: "visa-free"       },
  { flag: "🇨🇮", name: "Ivory Coast", type: "visa-free"       },
  { flag: "🇲🇻", name: "Maldives",    type: "visa-on-arrival" },
  { flag: "🇦🇪", name: "UAE",         type: "visa-on-arrival" },
  { flag: "🇶🇦", name: "Qatar",       type: "visa-on-arrival" },
  { flag: "🇲🇺", name: "Mauritius",   type: "visa-on-arrival" },
  { flag: "🇰🇪", name: "Kenya",       type: "evisa"           },
  { flag: "🇪🇬", name: "Egypt",       type: "evisa"           },
  { flag: "🇻🇳", name: "Vietnam",     type: "evisa"           },
  { flag: "🇬🇧", name: "UK",          type: "embassy-visa"    },
  { flag: "🇺🇸", name: "USA",         type: "embassy-visa"    },
  { flag: "🇨🇦", name: "Canada",      type: "embassy-visa"    },
  { flag: "🇯🇵", name: "Japan",       type: "embassy-visa"    },
  { flag: "🇪🇺", name: "Schengen",    type: "embassy-visa"    },
];

// ─── Landing page ─────────────────────────────────────────────────────────────

export default function LandingPage({ onResult }: { onResult: (g: VisaGuide) => void }) {
  return (
    <div className="bg-cream">

      {/* ══════════════════════════════════════════════════════════════════
          §1 — HERO (full bleed orange — bold, warm, alive)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-accent overflow-hidden" style={{ minHeight: "100svh" }}>

        {/* Subtle inner glow from top */}
        <div className="bg-glow-warm absolute inset-0 pointer-events-none" aria-hidden="true"/>

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 lg:px-16 h-[62px] border-b border-black/8">
          <Logo />
          <div className="flex items-center gap-5">
            <span className="font-sans text-xs text-ink/40 hidden sm:block font-medium tracking-wide">
              🇳🇬 Nigerian passport · preview
            </span>
            <a href="#waitlist"
               className="font-sans text-xs font-bold text-cream bg-ink px-4 py-1.5 hover:bg-ink/80 transition-colors duration-150">
              Other passports →
            </a>
          </div>
        </nav>

        {/* Hero body — 2-col split */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-16 py-16 min-h-[calc(100svh-62px)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 xl:gap-16 items-center max-w-6xl w-full">

            {/* Left: text */}
            <div className="max-w-2xl">
              <p className="reveal s1 font-sans text-xs font-bold tracking-[0.3em] uppercase text-ink/40 mb-8">
                For young Nigerian travelers
              </p>

              <h1 className="font-serif font-black text-ink leading-[0.92] mb-8"
                  style={{ fontSize: "clamp(3.4rem, 7vw, 6.5rem)" }}>
                <span className="block reveal s2">Young people</span>
                <span className="block reveal s3">can travel</span>
                <span className="block reveal s4">with{" "}
                  <em className="text-cream" style={{ fontStyle: "italic" }}>ease.</em>
                </span>
              </h1>

              <p className="reveal s5 font-sans text-base md:text-lg text-ink/55 leading-relaxed max-w-lg mb-10">
                Stop discovering visa requirements at the airport. Nomara tells you
                exactly what you need — before you ever book a flight.
              </p>

              <div className="reveal s6 max-w-2xl">
                <SearchBar onResult={onResult} id="hero-search" onOrange/>
                <p className="font-sans text-xs text-ink/35 mt-3 font-medium">
                  Free · No account needed · 24 destinations covered
                </p>
              </div>
            </div>

            {/* Right: illustration */}
            <div className="hidden lg:flex justify-center items-center lg:w-[420px] xl:w-[460px]">
              <TravelerIllustration/>
            </div>

          </div>
        </div>

        {/* Wave transition to cream */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 md:h-16 block">
            <path d="M0 60 C360 20 1080 20 1440 60 L1440 60 L0 60Z" fill="#FFFCF5"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §2 — PROBLEM (cream)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-cream px-6 md:px-10 lg:px-16 pt-8 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto">

          <div className="flex items-center gap-4 mb-10">
            <span className="w-8 h-[2px] bg-accent"/>
            <p className="font-sans text-xs font-bold tracking-[0.28em] uppercase text-accent">
              The reality
            </p>
          </div>

          <h2 className="font-serif font-black text-ink leading-tight mb-16"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}>
            Planning a trip shouldn&apos;t feel<br className="hidden md:block"/>
            like preparing for court.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t-2 border-surface">
            {[
              { n: "01", h: "Transit visa surprise at the gate.", b: "You booked the cheapest flight. Nobody told you the layover needs a UK transit visa you've never heard of." },
              { n: "02", h: "Weeks of preparation. One rejection.", b: "You spent three weeks gathering bank statements and forms. The embassy rejects you anyway, with zero explanation." },
              { n: "03", h: "Five websites. Five different answers.", b: "One says you need it, another says you don't. The rules changed. Nobody told you." },
              { n: "04", h: "You find out after you've already paid.", b: "Flight booked. Hotel reserved. Then you discover the visa costs more than you budgeted and takes three months to process." },
              { n: "05", h: "It's not about where you want to go.", b: "It's about not knowing if you can. That uncertainty kills the excitement before the trip even starts." },
              { n: "06", h: "Everyone else just seems to figure it out.", b: "Your friends with other passports just book and go. You're doing 2am research just to find out if you qualify." },
            ].map(({ n, h, b }) => (
              <div key={n} className="border-b border-r-0 md:odd:border-r-2 border-surface px-0 md:px-8 py-8 group">
                <div className="flex items-start gap-5">
                  <span className="font-sans text-xs font-bold text-accent/40 tracking-widest shrink-0 pt-1">{n}</span>
                  <div>
                    <p className="font-serif font-bold text-ink text-xl leading-tight mb-3 group-hover:text-accent transition-colors duration-200">
                      {h}
                    </p>
                    <p className="font-sans text-sm text-ink-muted leading-relaxed">{b}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §3 — HOW IT WORKS (warm parchment)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment px-6 md:px-10 lg:px-16 py-24 md:py-32 border-t border-surface">
        <div className="max-w-5xl mx-auto">

          <div className="flex items-center gap-4 mb-10">
            <span className="w-8 h-[2px] bg-accent"/>
            <p className="font-sans text-xs font-bold tracking-[0.28em] uppercase text-accent">
              How Nomara works
            </p>
          </div>

          <h2 className="font-serif font-black text-ink leading-tight mb-16"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}>
            Three steps. No surprises.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-surface">
            {[
              { step: "01", emoji: "🇳🇬", title: "Select your passport", body: "Start with Nigerian passport. Expanding to Ghana, Kenya, South Africa, and more very soon.", detail: "Currently NG · More coming" },
              { step: "02", emoji: "🔍", title: "Search destination", body: "Type any country, city, or region. We'll find it from 24 destinations across Africa, Europe, Asia, and the Americas.", detail: "24 countries · Any spelling" },
              { step: "03", emoji: "📋", title: "Know before you book", body: "Visa type, every document you need, a step-by-step guide, and direct links to official embassy pages.", detail: "Instant · Official sources" },
            ].map(({ step, emoji, title, body, detail }) => (
              <div key={step} className="bg-cream p-8 lg:p-10 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="text-4xl leading-none">{emoji}</span>
                  <span className="font-sans text-xs font-black text-accent tracking-widest">{step}</span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-ink text-2xl leading-tight mb-3">{title}</h3>
                  <p className="font-sans text-sm text-ink-muted leading-relaxed mb-4">{body}</p>
                  <p className="font-sans text-xs font-bold text-accent tracking-wide">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §4 — DESTINATIONS (cream)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-cream px-6 md:px-10 lg:px-16 py-24 md:py-32 border-t border-surface">
        <div className="max-w-5xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-8 h-[2px] bg-accent"/>
                <p className="font-sans text-xs font-bold tracking-[0.28em] uppercase text-accent">Covered</p>
              </div>
              <h2 className="font-serif font-black text-ink leading-tight"
                  style={{ fontSize: "clamp(1.7rem, 3vw, 2.8rem)" }}>
                24 countries. Every visa type.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {[
                ["Visa-free", "bg-accent text-cream"],
                ["On arrival", "bg-parchment text-ink-muted border border-surface"],
                ["eVisa", "bg-parchment text-ink-muted border border-surface"],
                ["Embassy", "bg-ink text-cream"],
              ].map(([label, cls]) => (
                <span key={label} className={`font-sans text-xs font-bold px-2.5 py-1 ${cls}`}>{label}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-surface">
            {DESTINATIONS_PREVIEW.map(({ flag, name, type }) => (
              <div key={name}
                   className="group bg-cream hover:bg-parchment transition-colors duration-150 p-4 flex flex-col items-center gap-3 cursor-default">
                <span className="text-3xl leading-none group-hover:scale-110 transition-transform duration-200">{flag}</span>
                <div className="text-center">
                  <p className="font-sans font-semibold text-sm text-ink mb-1.5">{name}</p>
                  <span className={`inline-block font-sans text-[11px] font-bold px-2 py-0.5 ${VISA_BADGE[type]}`}>
                    {VISA_LABEL[type]}
                  </span>
                </div>
              </div>
            ))}
            <div className="bg-parchment p-4 flex flex-col items-center justify-center gap-2 min-h-[120px]">
              <span className="font-serif font-black text-accent text-3xl">+8</span>
              <span className="font-sans text-xs text-stone text-center font-semibold">more</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §5 — FOOTER CTA (ink — one moment of darkness for contrast)
      ══════════════════════════════════════════════════════════════════ */}
      <section id="waitlist" className="bg-ink px-6 md:px-10 lg:px-16 py-24 md:py-32 border-t border-black/20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-[2px] bg-accent"/>
              <p className="font-sans text-xs font-bold tracking-[0.28em] uppercase text-accent">Ready to go</p>
            </div>
            <h2 className="font-serif font-black text-cream leading-tight mb-5"
                style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}>
              Where do you<br/>want to go?
            </h2>
            <p className="font-sans text-base text-cream/40 leading-relaxed mb-10 max-w-sm">
              Free, instant, no account needed.
            </p>
            <SearchBar onResult={onResult} id="footer-search"/>
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-white/10 pt-14 lg:pt-0 lg:pl-16 xl:pl-20">
            <p className="font-sans text-xs font-bold tracking-[0.28em] uppercase text-accent mb-8">
              Other passports
            </p>
            <h3 className="font-serif font-bold text-cream leading-tight mb-4"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
              Not Nigerian?<br/>We&apos;re building for you.
            </h3>
            <p className="font-sans text-sm text-cream/40 leading-relaxed mb-8">
              Ghana, Kenya, South Africa and more are coming.
              Leave your email — we&apos;ll notify you the moment your passport is supported.
            </p>
            <WaitlistForm/>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Logo variant="light" className="opacity-40"/>
          <p className="font-sans text-xs text-cream/20 italic leading-relaxed max-w-md">
            Visa information is advisory only. Always confirm with official embassy sources before travelling.
          </p>
        </div>
      </section>

    </div>
  );
}

// ─── Waitlist form ────────────────────────────────────────────────────────────

const PASSPORT_OPTIONS = [
  "Ghanaian","Kenyan","South African","Zimbabwean","Tanzanian",
  "Ethiopian","Ugandan","Cameroonian","Rwandan","Egyptian","Senegalese","Ivorian","Other",
];

function WaitlistForm() {
  const [email, setEmail]       = useState("");
  const [passport, setPassport] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700)); // TODO: wire to Supabase
    setSubmitted(true); setLoading(false);
  }

  if (submitted) return (
    <div className="flex items-start gap-3 p-4 border border-accent/30 bg-accent/10">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
        <circle cx="8" cy="8" r="8" fill="#FF4D00"/>
        <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#FFFCF5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div>
        <p className="font-sans font-bold text-sm text-cream">You&apos;re on the list.</p>
        <p className="font-sans text-sm text-cream/40 mt-0.5">We&apos;ll email you when your passport goes live.</p>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      <input type="email" required placeholder="your@email.com" value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-white/12 bg-white/6 font-sans text-sm text-cream placeholder:text-cream/30 px-4 py-3 focus:border-accent/40 transition-colors"/>
      <select value={passport} onChange={(e) => setPassport(e.target.value)}
        className="border border-white/12 bg-white/6 font-sans text-sm text-cream/50 px-4 py-3 appearance-none cursor-pointer focus:border-accent/40 transition-colors">
        <option value="">My passport is… (optional)</option>
        {PASSPORT_OPTIONS.map((p) => <option key={p} value={p} className="text-ink bg-cream">{p}</option>)}
      </select>
      <button type="submit" disabled={loading || !email}
        className="font-sans font-bold text-sm bg-accent text-ink px-6 py-3.5 transition-opacity hover:opacity-85 disabled:opacity-40">
        {loading ? "Saving…" : "Notify me when it's ready"}
      </button>
    </form>
  );
}
