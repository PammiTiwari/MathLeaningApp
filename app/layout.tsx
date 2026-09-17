import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress";
import Chrome from "@/components/Chrome";

const display = Outfit({ subsets: ["latin"], variable: "--font-display", weight: ["600", "800"] });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "600", "700"] });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand", weight: ["600"], display: "swap" });

export const metadata: Metadata = {
  title: "Himmat Rakh - Class 12 Maths, Boards Ready",
  description:
    "CBSE Class 12 Maths ki poori taiyari - fun Hinglish lessons jo deep derivations tak jaate hain, Khan Academy videos, handwritten notes, asli board papers aur ek AI doubt solver.",
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
          <Chrome>{children}</Chrome>
        </ProgressProvider>
      </body>
    </html>
  );
}
