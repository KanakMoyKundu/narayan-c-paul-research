import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { profile } from "@/data/researcher";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name}, ${profile.credentials.join(", ")} - Research`,
  description: `${profile.title} at ${profile.institution}. Research across clinical microbiology, antibiotic resistance, bioinformatics and diagnostic test development, presented from a supplied publication dataset.`,
  keywords: [
    profile.name,
    "veterinary microbiology",
    "antimicrobial resistance",
    "Salmonella",
    "Staphylococcus pseudintermedius",
    "diagnostic test development",
    "bioinformatics",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} - Research`,
    description:
      "Interactive research profile: publications, citation analytics and collaboration network derived from a supplied Google Scholar dataset.",
    type: "profile",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

const themeScript = `
(function(){
  try {
    var stored = localStorage.getItem('ncp-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}