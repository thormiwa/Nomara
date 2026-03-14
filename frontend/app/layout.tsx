import type { Metadata } from "next";
import { Fraunces, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

// Fraunces: optical serif with warmth and character — stunning at display sizes
const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Bricolage Grotesque: expressive variable grotesque — distinct, not sterile
const sans = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nomara — Travel with Certainty",
  description:
    "Visa-first travel planning for African travelers. Know if you can go, what you need, and what it costs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
