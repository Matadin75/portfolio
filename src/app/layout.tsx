import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { CursorGlow } from "@/components/CursorGlow";
import { SiteNav } from "@/components/SiteNav";
import { profile } from "@/data/profile";
import { themeColors, themeScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: { default: `${profile.name} · ${profile.title}`, template: `%s · ${profile.name}` },
  description: profile.message,
  openGraph: {
    title: `${profile.name} · ${profile.title}`,
    description: profile.message,
    type: "website",
  },
};

export const viewport: Viewport = {
  // The script in <head> keeps this in step with the toggle.
  themeColor: themeColors.dark,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The theme script sets data-theme before React loads, so the server's <html> won't match; that's expected.
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Without JS nothing would ever scroll in, so show it all; the theme toggle and menu can't work, so hide them. */}
        <noscript>
          <style>{`.reveal, .rise { opacity: 1 !important; transform: none !important; animation: none !important; } .theme-toggle, .menu-button { display: none !important; }`}</style>
        </noscript>
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="ambient" aria-hidden="true">
          <span className="light light-teal" />
          <span className="light light-violet" />
        </div>
        <CursorGlow />
        <SiteNav name={profile.name} />
        <main id="main">{children}</main>
        <footer className="footer">
          <div className="wrap footer-inner">
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
            <p className="footer-links">
              <a href={`mailto:${profile.email}`}>Email</a>
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
