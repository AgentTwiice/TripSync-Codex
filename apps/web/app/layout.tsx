import "./globals.css";

import { getEnv } from "@tripsync/config";
import { AppShell } from "@tripsync/ui";
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Trip Sync",
  description: "Collaborative holiday planning for couples, friends, and groups."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  getEnv();

  return (
    <html className={`${manrope.variable} ${cormorant.variable}`} lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
