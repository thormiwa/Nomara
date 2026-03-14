"use client";

import { useState, useRef, useEffect } from "react";
import { searchDestinations, type Destination } from "@/lib/destinations";
import { checkVisa } from "@/lib/api";
import type { VisaGuide } from "@/lib/types";

const REQUIREMENT_LABEL: Record<string, { label: string; dot: string }> = {
  "visa-free":      { label: "Visa-free",    dot: "bg-accent" },
  evisa:            { label: "eVisa",         dot: "bg-stone" },
  "visa-on-arrival":{ label: "On arrival",   dot: "bg-stone" },
  "embassy-visa":   { label: "Embassy visa", dot: "bg-cream/30" },
};

interface DestinationSearchProps {
  onResult: (guide: VisaGuide) => void;
  onBack: () => void;
}

export default function DestinationSearch({
  onResult,
  onBack,
}: DestinationSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Destination[]>([]);
  const [selected, setSelected] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selected) return;
    const found = searchDestinations(query);
    setResults(found);
    setOpen(found.length > 0 && query.length > 0);
  }, [query, selected]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(dest: Destination) {
    setSelected(dest);
    setQuery(dest.name);
    setOpen(false);
    setError(null);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelected(null);
    setQuery(e.target.value);
    setError(null);
  }

  async function handleCheck() {
    if (!selected) {
      setError("Please select a destination from the list.");
      inputRef.current?.focus();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const guide = await checkVisa("NG", selected.code);
      onResult(guide);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fade-up pt-12 pb-20">

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-5 h-px bg-stone/20" />
        <span className="font-sans text-xs font-medium text-stone/40 tracking-[0.2em] uppercase">
          Passport ✓
        </span>
        <div className="flex-1 h-px bg-stone/20" />
        <div className="w-5 h-px bg-accent" />
        <span className="font-sans text-xs font-medium tracking-[0.25em] uppercase text-stone">
          Step 2 of 2
        </span>
      </div>

      {/* Heading */}
      <h2
        className="font-serif font-bold text-ink leading-tight mb-2"
        style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
      >
        Where are you<br />headed?
      </h2>
      <p className="font-sans text-base text-ink-muted mb-10">
        Search by country, city, or region — 24 destinations available.
      </p>

      {/* Search */}
      <div ref={containerRef} className="relative max-w-md mb-8">

        {/* Input */}
        <div className={`flex items-center border ${selected ? "border-accent/40" : "border-stone/20 focus-within:border-accent/40"} bg-surface transition-colors duration-150`}>
          {/* Flag or search icon */}
          <div className="pl-4 pr-2 flex items-center shrink-0">
            {selected ? (
              <span className="text-xl leading-none">{selected.flag}</span>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-stone/40">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            placeholder="e.g. United Kingdom, Dubai, Tokyo…"
            value={query}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
            onFocus={() => results.length > 0 && setOpen(true)}
            className="flex-1 py-4 pr-4 font-sans text-base text-ink placeholder:text-stone/40 bg-transparent"
            autoComplete="off"
            spellCheck={false}
          />

          {/* Clear */}
          {query && (
            <button
              onClick={() => { setQuery(""); setSelected(null); setOpen(false); inputRef.current?.focus(); }}
              className="pr-4 text-stone/40 hover:text-stone transition-colors"
              aria-label="Clear"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Dropdown */}
        {open && (
          <ul className="absolute top-full left-0 right-0 z-10 bg-surface border border-t-0 border-stone/20 shadow-xl shadow-black/40">
            {results.map((dest) => {
              const req = REQUIREMENT_LABEL[dest.code] ?? null;
              return (
                <li key={dest.code} className="border-b border-stone/10 last:border-0">
                  <button
                    onClick={() => handleSelect(dest)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-parchment transition-colors duration-100"
                  >
                    <span className="text-2xl leading-none w-8 shrink-0">{dest.flag}</span>
                    <span className="flex-1 min-w-0">
                      <span className="font-sans font-medium text-sm text-ink block">{dest.name}</span>
                      <span className="font-sans text-xs text-stone">{dest.region}</span>
                    </span>
                    {req && (
                      <span className="flex items-center gap-1.5 shrink-0">
                        <span className={`w-1.5 h-1.5 rounded-full ${req.dot}`} />
                        <span className="font-sans text-xs text-stone">{req.label}</span>
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 mb-6 p-3 border border-accent/20 bg-accent-light max-w-md">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
            <circle cx="7" cy="7" r="6.5" stroke="#C09A6B" strokeWidth="1" />
            <path d="M7 4v4M7 10v.5" stroke="#C09A6B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="font-sans text-sm text-ink-muted">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button
          onClick={handleCheck}
          disabled={loading || !selected}
          className="group flex items-center gap-3 bg-accent text-ink font-sans font-semibold text-sm tracking-wide px-8 py-4 transition-opacity duration-200 hover:opacity-85 disabled:opacity-35 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="10" />
              </svg>
              Checking…
            </>
          ) : (
            <>
              Check visa
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
            </>
          )}
        </button>
        <button
          onClick={onBack}
          className="font-sans text-sm text-stone hover:text-ink transition-colors duration-150"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
