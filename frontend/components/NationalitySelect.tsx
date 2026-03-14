"use client";

interface NationalitySelectProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function NationalitySelect({
  onContinue,
  onBack,
}: NationalitySelectProps) {
  return (
    <div className="fade-up pt-12 pb-20">

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-5 h-px bg-accent" />
        <span className="font-sans text-xs font-medium tracking-[0.25em] uppercase text-stone">
          Step 1 of 2
        </span>
        <div className="flex-1 h-px bg-parchment" />
        <span className="font-sans text-xs text-stone/60">Destination →</span>
      </div>

      {/* Heading */}
      <h2
        className="font-serif font-bold text-ink leading-tight mb-2"
        style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
      >
        Your passport
      </h2>
      <p className="font-sans text-base text-stone mb-10">
        Select your nationality to see visa requirements.
      </p>

      {/* Passport card — selected state */}
      <div className="max-w-sm mb-2">
        <div className="relative border-2 border-ink bg-cream p-5">
          {/* Selected badge */}
          <div className="absolute -top-2.5 left-4 bg-accent px-2 py-0.5">
            <span className="font-sans text-xs font-medium text-cream tracking-wide">
              Selected
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Flag */}
            <div className="w-14 h-14 flex items-center justify-center bg-parchment text-4xl leading-none shrink-0">
              🇳🇬
            </div>

            {/* Details */}
            <div>
              <p className="font-serif text-2xl text-ink leading-tight">Nigerian</p>
              <p className="font-sans text-xs text-stone mt-0.5 tracking-wide">
                Federal Republic of Nigeria
              </p>
            </div>

            {/* Check */}
            <div className="ml-auto">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="10" fill="#C09A6B" />
                <path
                  d="M6 10l3 3 5-5"
                  stroke="#F8F5F0"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <p className="font-sans text-xs text-stone mt-2 px-0.5">
          More passports coming soon — Ghana, Kenya, South Africa.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 mt-10">
        <button
          onClick={onContinue}
          className="group flex items-center gap-3 bg-ink text-cream font-sans font-medium text-sm tracking-wide px-8 py-4 transition-all duration-200 hover:bg-ink-muted"
        >
          Continue
          <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
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
