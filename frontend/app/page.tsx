"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import LandingPage from "@/components/LandingPage";
import VisaResultCard from "@/components/VisaResultCard";
import type { VisaGuide } from "@/lib/types";

type Step = "landing" | "result";

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [result, setResult] = useState<VisaGuide | null>(null);

  function handleResult(guide: VisaGuide) {
    setResult(guide);
    setStep("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setResult(null);
    setStep("landing");
  }

  // ── Landing — owns its own full-page layout including nav
  if (step === "landing") {
    return <LandingPage onResult={handleResult} />;
  }

  // ── Result — light split-screen
  return (
    <div className="min-h-screen bg-cream">
      <nav className="w-full px-6 lg:px-12 h-[60px] flex items-center justify-between border-b border-stone/15">
        <button onClick={reset} className="transition-opacity duration-150 hover:opacity-60">
          <Logo variant="default" />
        </button>
        {result && (
          <div className="flex items-center gap-2 font-sans text-xs text-stone">
            <button onClick={reset} className="hover:text-ink transition-colors">Home</button>
            <span className="opacity-30">›</span>
            <span className="text-ink font-medium">{result.destination_name}</span>
          </div>
        )}
      </nav>

      <div className="flex min-h-[calc(100vh-60px)]">
        {/* Left context panel */}
        {result && (
          <aside className="hidden lg:flex lg:w-[38%] xl:w-[35%] bg-parchment flex-col justify-between p-12 border-r border-stone/15">
            <ResultContext result={result} onReset={reset} />
          </aside>
        )}

        {/* Right — result card */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-xl mx-auto px-6 lg:px-10 xl:px-14">
            {result && (
              <VisaResultCard
                guide={result}
                onBack={reset}
                onNewSearch={reset}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Left panel for result step ──────────────────────────────────────────────

const VISA_LABELS: Record<string, string> = {
  "visa-free": "Visa-Free",
  evisa: "eVisa Required",
  "visa-on-arrival": "Visa on Arrival",
  "embassy-visa": "Embassy Visa Required",
};

const VISA_BADGE: Record<string, string> = {
  "visa-free":       "bg-accent/10 text-accent border border-accent/25",
  evisa:             "border border-stone/25 text-stone",
  "visa-on-arrival": "border border-stone/25 text-stone",
  "embassy-visa":    "border border-stone/20 text-stone/60",
};

function ResultContext({ result, onReset }: { result: VisaGuide; onReset: () => void }) {
  const feeStr = !result.fee_usd ? "Free" : `$${result.fee_usd}`;
  const stayStr = result.allowed_stay_days ? `${result.allowed_stay_days} days` : "—";

  return (
    <>
      <div className="fade-up">
        <p className="font-sans text-xs font-medium tracking-[0.25em] uppercase text-stone mb-8">
          🇳🇬 Nigerian passport
        </p>
        <h2
          className="font-serif font-black text-ink leading-tight mb-5"
          style={{ fontSize: "clamp(2rem, 3vw, 3rem)" }}
        >
          {result.destination_name}
        </h2>
        <span className={`inline-block font-sans text-sm font-semibold px-4 py-2 mb-8 ${VISA_BADGE[result.requirement_type]}`}>
          {VISA_LABELS[result.requirement_type]}
        </span>
        <div className="space-y-3">
          {[
            { label: "Max stay", value: stayStr },
            { label: "Visa fee", value: feeStr },
            { label: "Processing", value: result.processing_time_days === null ? "On arrival" : `${result.processing_time_days} days` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-baseline border-b border-stone/10 pb-3">
              <span className="font-sans text-xs text-stone tracking-wide">{label}</span>
              <span className="font-serif font-bold text-ink text-lg">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="group flex items-center gap-2 font-sans text-sm text-stone hover:text-ink/70 transition-colors duration-150"
      >
        <span className="transition-transform duration-150 group-hover:-translate-x-1">←</span>
        Search another destination
      </button>
    </>
  );
}
