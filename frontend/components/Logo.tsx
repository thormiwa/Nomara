interface LogoProps {
  className?: string;
  /** "dark" = cream text for use on dark/ink backgrounds */
  variant?: "default" | "light";
}

export default function Logo({ className = "", variant = "default" }: LogoProps) {
  const textColor = variant === "light" ? "text-cream" : "text-ink";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden="true">
        <path d="M9 1L16 6.5L9 12L2 6.5Z" fill="#C09A6B" />
        <path d="M9 10L16 15.5L9 21L2 15.5Z" stroke="#C09A6B" strokeWidth="1" fill="none" />
      </svg>
      <span className={`font-sans font-medium text-sm tracking-[0.28em] uppercase select-none ${textColor}`}>
        Nomara
      </span>
    </div>
  );
}
