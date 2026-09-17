import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress";
import Nav from "@/components/Nav";

const display = Outfit({ subsets: ["latin"], variable: "--font-display", weight: ["600", "800"] });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "600", "700"] });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand", weight: ["600"], display: "swap" });

export const metadata: Metadata = {
  title: "Himmat Rakh — Class 12 Maths, Boards Ready",
  description:
    "CBSE Class 12 Maths ki poori taiyari — fun Hinglish lessons, Khan Academy videos, handwritten notes, previous year papers aur AI-checked timed mock exams.",
};

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${hand.variable}`}>
      <body className="font-sans min-h-screen">
        <ProgressProvider>
          <Nav />
          <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-1 sm:px-6">{children}</main>
          <footer className="no-print mt-8 border-t border-line bg-white/60">
            <div className="mx-auto max-w-6xl px-4 py-9 text-center sm:px-6">
              <p className="font-hand text-2xl text-saffron">&ldquo;Himmat rakh, ho jayega.&rdquo;</p>
              <p className="mx-auto mt-3 max-w-lg text-[12px] leading-relaxed text-faint">
                CBSE Class 12 Mathematics (041) · 2025–26 syllabus · An independent study tool,
                not affiliated with CBSE or Khan Academy
              </p>
            </div>
          </footer>
        </ProgressProvider>
      </body>
    </html>
  );
}
