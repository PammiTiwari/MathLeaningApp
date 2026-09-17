"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";

/** The login page stands on its own, without the app shell around it. */
export default function Chrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === "/login") return <>{children}</>;

  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-6xl overflow-x-clip px-4 pb-20 pt-1 sm:px-6">{children}</main>
      <footer className="no-print mt-8 border-t border-line bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-9 text-center sm:px-6">
          <p className="font-hand text-2xl text-saffron">&ldquo;Himmat rakh, ho jayega.&rdquo;</p>
          <p className="mx-auto mt-3 max-w-lg text-[12px] leading-relaxed text-faint">
            CBSE Class 12 Mathematics (041) · 2025-26 syllabus · An independent study tool,
            not affiliated with CBSE or Khan Academy
          </p>
        </div>
      </footer>
    </>
  );
}
