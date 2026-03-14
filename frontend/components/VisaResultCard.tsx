"use client";

import { useState } from "react";
import type { VisaGuide, RequirementType } from "@/lib/types";

// ---------------------------------------------------------------------------
// Visa type config — light design system
// Visual weight scales with entry difficulty
// ---------------------------------------------------------------------------
const VISA_CONFIG: Record<
  RequirementType,
  { label: string; sublabel: string; bg: string; text: string; border: string }
> = {
  "visa-free": {
    label: "Visa-Free",
    sublabel: "No visa required",
    bg: "bg-accent/10",
    text: "text-ink",
    border: "border border-accent/25",
  },
  evisa: {
    label: "eVisa",
    sublabel: "Apply online before travel",
    bg: "bg-parchment",
    text: "text-ink",
    border: "border border-stone/20",
  },
  "visa-on-arrival": {
    label: "Visa on Arrival",
    sublabel: "Obtain at port of entry",
    bg: "bg-parchment",
    text: "text-ink",
    border: "border border-stone/20",
  },
  "embassy-visa": {
    label: "Embassy Visa",
    sublabel: "Apply at Nigerian embassy/consulate",
    bg: "bg-surface",
    text: "text-ink",
    border: "border border-stone/20",
  },
};

// ---------------------------------------------------------------------------
// Safe inline markdown renderer
// Handles: ## headings, numbered lists, **bold**, > blockquotes
// ---------------------------------------------------------------------------
function BoldText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="font-semibold text-ink">{part}</strong> : part
      )}
    </>
  );
}

function StepGuide({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n");
  const nodes: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: number) => {
    if (!listBuffer.length) return;
    nodes.push(
      <ol key={`ol-${key}`} className="space-y-4 my-5">
        {listBuffer.map((item, i) => (
          <li key={i} className="flex gap-4">
            <span className="font-serif font-bold text-accent text-lg leading-tight shrink-0 w-5 pt-0.5">
              {i + 1}
            </span>
            <span className="font-sans text-sm text-ink-muted leading-relaxed">
              <BoldText text={item.replace(/^\d+\.\s*/, "")} />
            </span>
          </li>
        ))}
      </ol>
    );
    listBuffer = [];
  };

  lines.forEach((line, idx) => {
    if (/^\d+\.\s/.test(line)) {
      listBuffer.push(line);
    } else {
      flushList(idx);
      if (line.startsWith("## ")) {
        nodes.push(
          <p key={idx} className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-stone mt-6 mb-3">
            {line.slice(3)}
          </p>
        );
      } else if (line.startsWith("> ")) {
        nodes.push(
          <div key={idx} className="border-l-2 border-accent pl-4 my-4">
            <p className="font-sans text-sm text-stone italic leading-relaxed">
              <BoldText text={line.slice(2)} />
            </p>
          </div>
        );
      } else if (line.trim()) {
        nodes.push(
          <p key={idx} className="font-sans text-sm text-ink-muted leading-relaxed my-2">
            <BoldText text={line} />
          </p>
        );
      }
    }
  });
  flushList(lines.length);
  return <div>{nodes}</div>;
}

// ---------------------------------------------------------------------------
// Stat block
// ---------------------------------------------------------------------------
function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-sans text-xs font-medium tracking-[0.18em] uppercase text-stone">{label}</span>
      <span className="font-serif font-bold text-ink" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
        {value}
      </span>
      {sub && <span className="font-sans text-xs text-stone">{sub}</span>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
interface VisaResultCardProps {
  guide: VisaGuide;
  onBack: () => void;
  onNewSearch: () => void;
}

export default function VisaResultCard({ guide, onBack, onNewSearch }: VisaResultCardProps) {
  const [guideOpen, setGuideOpen] = useState(false);
  const cfg = VISA_CONFIG[guide.requirement_type];

  const feeValue = !guide.fee_usd ? "Free" : `$${guide.fee_usd.toLocaleString()}`;
  const feeSub = !guide.fee_usd ? "No visa fee" : "USD";
  const stayValue = guide.allowed_stay_days ? `${guide.allowed_stay_days}` : "—";
  const staySub = guide.allowed_stay_days ? "days maximum" : undefined;
  const processingValue = guide.processing_time_days === null ? "On arrival" : `${guide.processing_time_days}`;
  const processingSub = guide.processing_time_days !== null ? (guide.processing_time_days === 1 ? "business day" : "business days") : "no wait";

  const lastVerified = new Date(guide.last_verified_at).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="fade-up pt-10 pb-20">

      {/* Nav actions */}
      <div className="flex items-center gap-5 mb-10">
        <button onClick={onBack} className="font-sans text-sm text-stone hover:text-ink transition-colors duration-150">
          ← Back
        </button>
        <span className="text-stone/30">·</span>
        <button onClick={onNewSearch} className="font-sans text-sm text-stone hover:text-ink transition-colors duration-150">
          New search
        </button>
      </div>

      {/* ── Visa type hero banner ──────────────────────────── */}
      <div className={`${cfg.bg} ${cfg.border} px-6 py-6 mb-8`}>
        <p className={`font-sans text-xs font-medium tracking-[0.25em] uppercase mb-2 opacity-50 ${cfg.text}`}>
          Nigerian passport → {guide.destination_name}
        </p>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className={`font-serif font-black leading-tight ${cfg.text}`}
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              {cfg.label}
            </h2>
            <p className={`font-sans text-sm mt-1 opacity-60 ${cfg.text}`}>{cfg.sublabel}</p>
          </div>
          <span className="text-5xl leading-none" role="img" aria-label={guide.destination_name}>
            {destinationFlag(guide.destination_code)}
          </span>
        </div>
      </div>

      {/* Destination name */}
      <h3
        className="font-serif font-bold text-ink mb-8"
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
      >
        {guide.destination_name}
      </h3>

      {/* ── Key stats ─────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-0 border border-stone/15 mb-8">
        <div className="px-5 py-5 border-r border-stone/10">
          <Stat label="Max stay" value={stayValue} sub={staySub} />
        </div>
        <div className="px-5 py-5 border-r border-stone/10">
          <Stat label="Processing" value={processingValue} sub={processingSub} />
        </div>
        <div className="px-5 py-5">
          <Stat label="Visa fee" value={feeValue} sub={feeSub} />
        </div>
      </div>

      {/* Notes */}
      {guide.notes && (
        <div className="flex gap-3 p-4 bg-accent-light border-l-2 border-accent mb-8">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
            <circle cx="7" cy="7" r="6.5" stroke="#C09A6B" strokeWidth="1" />
            <path d="M7 6v4M7 4.5v.01" stroke="#C09A6B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="font-sans text-sm text-ink-muted leading-relaxed">{guide.notes}</p>
        </div>
      )}

      {/* ── Documents required ─────────────────────────────── */}
      <section className="mb-8">
        <h4 className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-stone mb-5 flex items-center gap-3">
          Documents required
          <span className="flex-1 h-px bg-stone/15" />
          <span className="font-sans text-xs text-stone/40 tracking-normal normal-case">
            {guide.documents_required.length} items
          </span>
        </h4>
        <ul className="space-y-3">
          {guide.documents_required.map((doc, i) => (
            <li key={i} className="flex items-start gap-3.5">
              <div className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
              <span className="font-sans text-sm text-ink-muted leading-relaxed">{doc}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Step-by-step guide — collapsible ──────────────── */}
      <section className="mb-8">
        <button
          onClick={() => setGuideOpen((v) => !v)}
          className="w-full flex items-center gap-3 py-4 border-y border-stone/15 group text-left"
          aria-expanded={guideOpen}
        >
          <span className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-stone group-hover:text-ink transition-colors duration-150 flex-1">
            Step-by-step guide
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className={`text-stone/40 transition-transform duration-200 ${guideOpen ? "rotate-180" : ""}`}
          >
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {guideOpen && (
          <div className="pt-2 pb-4 fade-up-delay">
            <StepGuide markdown={guide.step_by_step_guide} />
          </div>
        )}
      </section>

      {/* ── Official sources ───────────────────────────────── */}
      {guide.official_links.length > 0 && (
        <section className="mb-10">
          <h4 className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-stone mb-4 flex items-center gap-3">
            Official sources
            <span className="flex-1 h-px bg-stone/15" />
          </h4>
          <ul className="space-y-2.5">
            {guide.official_links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm text-ink-muted hover:text-ink underline underline-offset-3 decoration-stone/20 hover:decoration-stone/50 transition-colors duration-150"
                >
                  {link.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="shrink-0">
                    <path d="M1.5 8.5l7-7M8.5 1.5H4M8.5 1.5v4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Footer — always visible ────────────────────────── */}
      <div className="border-t border-stone/15 pt-5 space-y-2">
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="5.5" stroke="#5E5B58" strokeWidth="1" />
            <path d="M6 3.5v3l2 1" stroke="#5E5B58" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-sans text-xs text-stone">
            Last verified {lastVerified}
          </p>
        </div>
        <p className="font-sans text-xs text-stone/60 italic leading-relaxed">
          Visa information is advisory only. Always confirm requirements with official
          embassy sources before travelling.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper — map destination codes to flag emojis
// ---------------------------------------------------------------------------
const FLAGS: Record<string, string> = {
  GB: "🇬🇧", AE: "🇦🇪", RW: "🇷🇼", GH: "🇬🇭", MA: "🇲🇦", CA: "🇨🇦",
  ZA: "🇿🇦", SCHENGEN: "🇪🇺", KE: "🇰🇪", NA: "🇳🇦", CI: "🇨🇮", EG: "🇪🇬",
  SN: "🇸🇳", MU: "🇲🇺", UG: "🇺🇬", TH: "🇹🇭", VN: "🇻🇳", SC: "🇸🇨",
  PH: "🇵🇭", QA: "🇶🇦", MV: "🇲🇻", JP: "🇯🇵", SG: "🇸🇬", US: "🇺🇸",
};

function destinationFlag(code: string): string {
  return FLAGS[code] ?? "🌍";
}
