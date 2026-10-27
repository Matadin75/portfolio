import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { profile } from "@/data/profile";
import { themeColors, themeScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.title}`,
  description: profile.summary,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: themeColors.light },
    { media: "(prefers-color-scheme: dark)", color: themeColors.dark },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The theme script sets data-theme before React loads, so the server's <html> won't match; that's expected.
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Without JS nothing would ever scroll in, so show it all; the theme toggle can't work, so hide it. */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; } .theme-toggle { display: none !important; }`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
