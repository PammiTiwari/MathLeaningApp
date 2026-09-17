import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress";
import Nav from "@/components/Nav";

const display = Outfit({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700", "800"] });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600", "700"] });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand", weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Himmat Rakh — Class 12 Maths, Boards Ready",
  description:
    "CBSE Class 12 Maths ki poori taiyari — fun Hinglish lessons, Khan Academy videos, handwritten notes, previous year papers aur AI-checked timed mock exams.",
};

export const viewport: Viewport = {
  themeColor: "#0B0A12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${hand.variable}`}>
      <body className="font-sans min-h-screen">
        <ProgressProvider>
          <Nav />
          <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-4 sm:px-6">{children}</main>
          <footer className="no-print border-t border-line/60 py-8 text-center text-xs text-white/35">
            <p className="font-hand text-lg text-saffron/70">&ldquo;Himmat rakh, ho jayega.&rdquo;</p>
            <p className="mt-2">
              Built for CBSE Class 12 Mathematics (041) · 2025–26 syllabus · Not affiliated with CBSE or Khan Academy
            </p>
          </footer>
        </ProgressProvider>
      </body>
    </html>
  );
}
